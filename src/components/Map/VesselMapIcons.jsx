import { useContext } from 'react';
import { makeVesselIcon } from '../../mapIcon';
import { ActivePaneContext } from '../ActivePaneContext';
import { Marker } from 'react-leaflet';

export function VesselMapIcons({ vessels }) {
  const { activePane, setVessel, showOutOfService } = useContext(ActivePaneContext);

  return (
    <>
      {vessels
        .filter((v) => {
          if (!showOutOfService && !v.isInService()) {
            return false;
          }

          return true;
        })
        .map((v) => {
          const isSelected = activePane && activePane.vesselID === v.id;
          const { icon, alt } = makeVesselIcon(v.status(), isSelected);

          return (
            <Marker
              alt={alt}
              key={v.id}
              icon={icon}
              position={[v.lat, v.lon]}
              zIndexOffset={isSelected ? 1000 : 1}
              eventHandlers={{ mousedown: setVessel(v) }}
            />
          );
        })}
    </>
  );
}
