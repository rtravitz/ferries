import L from 'leaflet';
import delayed from './assets/ferry-token-delayed.svg';
import outOfService from './assets/ferry-token-out-of-service.svg';
import good from './assets/ferry-token-good.svg';
import dockIcon from './assets/dock.svg';
import { VesselStatus } from './models/Vessel';

export function makeVesselIcon(status: VesselStatus, selected: boolean) {
  let icon = good;
  let alt = 'good ferry icon';
  if (status === VesselStatus.OutOfService) {
    alt = 'out of service ferry icon';
    icon = outOfService;
  } else if (status === VesselStatus.Delayed) {
    alt = 'delayed ferry icon';
    icon = delayed;
  }

  const classes = selected
    ? 'bg-blue-secondary border-solid border border-gray-200 rounded-full shadow-md transition-height duration-500'
    : 'bg-transparent border-none shadow-none transition-height duration-500';
  const width = selected ? 40 : 30;
  const height = selected ? 40 : 30;

  return {
    alt,
    icon: new L.Icon({
      className: classes,
      iconUrl: icon,
      iconRetinaUrl: icon,
      iconSize: new L.Point(width, height),
    }),
  };
}

export function makeTerminalIcon(selected: boolean) {
  const classes = selected ? 'shadow-md transition-height duration-500' : 'shadow-none transition-height duration-500';
  const width = selected ? 35 : 25;
  const height = selected ? 35 : 25;

  return new L.Icon({
    className: classes,
    iconUrl: dockIcon,
    iconRetinaUrl: dockIcon,
    iconSize: new L.Point(width, height),
  });
}
