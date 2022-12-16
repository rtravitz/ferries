import React from 'react';
import { Marker } from 'react-leaflet';
import locationDot from '../../assets/location-dot.svg';

export function UserLocationIcon({ userLocation }) {
  return <Marker
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
}

