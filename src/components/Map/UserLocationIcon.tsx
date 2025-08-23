import L from 'leaflet';
import { Marker } from 'react-leaflet';
import locationDot from '../../assets/location-dot.svg';

export interface UserLocation {
  latitude: number;
  longitude: number;
}

interface UserLocationIconProps {
  userLocation: UserLocation;
}

export function UserLocationIcon({ userLocation }: UserLocationIconProps) {
  return (
    <Marker
      alt="user location"
      key="user location"
      icon={
        new L.Icon({
          iconUrl: locationDot,
          iconRetinaUrl: locationDot,
          iconSize: new L.Point(15, 15),
        })
      }
      position={[userLocation.latitude, userLocation.longitude]}
    />
  );
}
