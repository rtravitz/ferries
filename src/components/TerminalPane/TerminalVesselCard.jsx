import { useContext } from 'react';
import { ActivePaneContext } from '../ActivePaneContext';
import { INCOMING, OUTGOING } from './TerminalPane';


export function TerminalVesselCard({ direction, vessel }) {
  const { setVessel, map } = useContext(ActivePaneContext);
  const isIncoming = direction === INCOMING;
  const isOutgoing = direction === OUTGOING;

  /*
    INCOMING
    - has departed and has an ETA
        show name of departing dock with time and then a message 'estimated arrival' with a time
    - has a scheduled departure but no ETA
        show name of departing dock and the scheduled departure

    OUTGOING
    - has a scheduled departure but no ETA
        show message 'Scheduled Departure' and a time pointing toward the name of the destination dock
    - has departed and has an ETA
        show message saying 'Departed' and a time pointing toward the name of the destination dock with a time
      
    DOCKED (no destination)
    - show a message that says it's docked
  */

  let departureSide = null;
  let arrivalSide = null;

  const dockFont = 'text-sm font-light';

  if (vessel.hasNextDeparture()) {
    departureSide = <>
      {isIncoming && <h4 className={dockFont}>Currently at {vessel.lastDock}</h4>}
      <div className="flex justify-center items-center flex-col">
        <p className="text-sm font-light">Scheduled Departure</p>
        <p className="text-lg font-semibold">{vessel.nextDeparture}</p>
      </div>
    </>
  } else if (vessel.hasDeparted()) {
    departureSide = <>
      {isOutgoing && <p className="text-sm font-light">Departed</p> }
      {isIncoming && <h4 className={dockFont}>{vessel.lastDock}</h4>}
      <h3 className="text-lg font-semibold">{vessel.leftDock}</h3>
    </>
  }

  if (vessel.hasEta()) {
    arrivalSide = <div className="flex flex-col justify-center items-center">
      {isOutgoing && <h4 className={dockFont}>{vessel.nextDock}</h4>}
      {isIncoming && <p className="text-sm font-light">Estimated Arrival</p> }
      {vessel.hasEta() && <h3 className="text-lg font-semibold">{vessel.eta}</h3>}
    </div>
  } else if (vessel.hasNextDock() && isOutgoing) {
    arrivalSide = <h4 className={dockFont}>{vessel.nextDock}</h4>;
  }

  const hasBothSides = departureSide !== null && arrivalSide !== null;

  let directionTagColor;
  if (isIncoming) {
    directionTagColor = 'bg-green-100';
  } else if (isOutgoing) {
    directionTagColor = 'bg-blue-100';
  }

  const onClick = () => { 
    setVessel(vessel)();
    const iconAlreadyVisible = map.getBounds().contains([vessel.lat, vessel.lon]);
    console.log('already visible', iconAlreadyVisible);
    if (!iconAlreadyVisible) {
      map.flyTo([vessel.lat, vessel.lon], 12);
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-slate-100 rounded-lg shadow cursor-pointer">
      <div className="bg-slate-600 rounded-t-lg flex justify-between items-center py-1 px-2">
        <h3 className="font-bold text-gray-200 text-lg">{vessel.name}</h3>
        <div className={`${directionTagColor} rounded-lg py-0.5 px-1`}>
          <h5 className="text-slate-800 text-sm">{direction}</h5>
        </div>
      </div>
      <div className="mb-4 px-2 py-2 flex items-center justify-center">
        <div className="flex flex-col justify-center items-center">
          { departureSide }
        </div>
        { hasBothSides && <div className="arrow-right mx-4" /> }
        <div className="flex flex-col justify-center items-center">
          { arrivalSide }
        </div>
      </div>
    </div>
  );
}
