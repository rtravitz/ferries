import { useContext } from 'react';
import { ActivePaneContext } from '../ActivePaneContext';
import { TerminalVesselDirection } from './TerminalPane';
import type Vessel from '../../models/Vessel';

interface TerminalVesselCardProps {
  direction: TerminalVesselDirection;
  vessel: Vessel;
}

export function TerminalVesselCard({ direction, vessel }: TerminalVesselCardProps) {
  const { setVessel, map } = useContext(ActivePaneContext);
  const isIncoming = direction === TerminalVesselDirection.Incoming;
  const isOutgoing = direction === TerminalVesselDirection.Outgoing;
  const dockFont = 'text-sm font-light';

  let departureSide = null;
  let arrivalSide = null;
  let directionTag = null;

  const outOfService = !vessel.isInService();
  if (outOfService) {
    departureSide = (
      <div className="flex justify-center items-center flex-col">
        <p className="text-sm font-light">Docked and out of service</p>
      </div>
    );
  } else {
    if (vessel.hasDeparted()) {
      departureSide = (
        <>
          <h4 className={dockFont}>{vessel.lastDock}</h4>
          <h3 className="text-lg font-semibold">{vessel.leftDock}</h3>
        </>
      );
    } else if (vessel.hasNextDeparture()) {
      departureSide = (
        <>
          {isIncoming && <h4 className={dockFont}>Currently at {vessel.lastDock}</h4>}
          <div className="flex justify-center items-center flex-col">
            <p className="text-sm font-light">Scheduled Departure</p>
            <p className="text-lg font-semibold">{vessel.nextDeparture}</p>
          </div>
        </>
      );
    } else if (!vessel.hasNextDock()) {
      departureSide = <p className="text-sm font-light">Docked</p>;
    }

    if (vessel.hasEta()) {
      arrivalSide = (
        <div className="flex flex-col justify-center items-center">
          <h4 className={dockFont}>{vessel.nextDock}</h4>
          {vessel.hasEta() && <h3 className="text-lg font-semibold">{vessel.eta}</h3>}
        </div>
      );
    } else if (vessel.hasNextDock() && isOutgoing) {
      arrivalSide = <h4 className={dockFont}>{vessel.nextDock}</h4>;
    }

    let directionTagColor;
    if (isIncoming) {
      directionTagColor = 'bg-green-100';
    } else if (isOutgoing) {
      directionTagColor = 'bg-blue-100';
    }

    directionTag = (
      <div className={`${directionTagColor} rounded-lg py-0.5 px-1`}>
        <h5 className="text-slate-800 text-sm">{direction}</h5>
      </div>
    );
  }

  const hasBothSides = departureSide !== null && arrivalSide !== null;

  const onClick = () => {
    setVessel(vessel);
    if (map) {
      const iconAlreadyVisible = map.getBounds().contains([vessel.lat, vessel.lon]);
      if (!iconAlreadyVisible) {
        map.flyTo([vessel.lat, vessel.lon], 12);
      }
    }
  };

  const headerColor = outOfService ? 'bg-red-700' : 'bg-slate-600';

  return (
    <div onClick={onClick} className="bg-slate-100 rounded-lg shadow cursor-pointer">
      <div className={`${headerColor} rounded-t-lg flex justify-between items-center py-1 px-2`}>
        <h3 className="font-bold text-gray-200 text-lg">{vessel.name}</h3>
        {vessel.isInService() && vessel.hasNextDock() && directionTag}
      </div>
      <div className="mb-4 px-2 py-2 flex items-center justify-center">
        <div className="flex flex-col justify-center items-center text-center">{departureSide}</div>
        {hasBothSides && <div className="arrow-right mx-4" />}
        <div className="flex flex-col justify-center items-center text-center">{arrivalSide}</div>
      </div>
    </div>
  );
}
