import { useState, useEffect, useContext } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import Vessel, { type ApiVessel } from '../../models/Vessel';
import FixedControls from '../FixedControls';
import FetchError from '../FetchError';
import SlidingBottomPane from '../SlidingBottomPane';
import { useDelayUnmount } from '../../hooks';
import { LoadingScreen } from '../LoadingScreen';
import terminals from '../../data/terminals.json';
import { ActivePaneContext } from '../ActivePaneContext';
import { VesselMapIcons } from './VesselMapIcons';
import { TerminalMapIcons } from './TerminalMapIcons';
import { UserLocationIcon } from './UserLocationIcon';
import type { UserLocation } from './UserLocationIcon';
import type { Map as LeafletMap } from 'leaflet';

const BACKEND = import.meta.env.VITE_BACKEND;
const LOADING_SCREEN_DURATION = parseInt(import.meta.env.VITE_LOADING_SCREEN_DURATION, 10);

interface MapProps {
  setMap: (instance: LeafletMap | null) => void;
}

export function Map({ setMap }: MapProps) {
  const [vessels, setVessels] = useState([]);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [firstLoadComplete, setFirstLoadComplete] = useState(false);
  const shouldRenderLoadingScreen = useDelayUnmount(!firstLoadComplete, LOADING_SCREEN_DURATION);
  const [fetchErr, setFetchErr] = useState(false);

  const { activePane, setInfo, setSettings, setActivePane } = useContext(ActivePaneContext);

  const refreshVessels = () => {
    let isSubscribed = true;
    fetch(BACKEND)
      .then((res) => res.json())
      .then((res) => {
        const vessels = res.vessellist.map((v: ApiVessel) => new Vessel(v));
        if (isSubscribed) {
          setVessels(vessels);
          setFetchErr(false);
        }
      })
      .catch(() => {
        if (isSubscribed) {
          setFetchErr(true);
        }
      })
      .finally(() => {
        if (!firstLoadComplete) {
          setFirstLoadComplete(true);
        }
      });

    return () => { isSubscribed = false };
  };

  useEffect(refreshVessels, []);

  return (
    <section>
      {shouldRenderLoadingScreen && <LoadingScreen firstLoadComplete={firstLoadComplete} />}
      <FetchError active={fetchErr} />
      {/* 
        Mobile Safari was spawning multiple click events with Leaflet, making it difficult to
        select a marker. Setting tap={false} solves, this: https://github.com/Leaflet/Leaflet/issues/7255
       */}
      <MapContainer ref={setMap} zoomControl={false} center={[47.96533, -122.659685]} zoom={9}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <VesselMapIcons vessels={vessels} />
        <TerminalMapIcons terminals={terminals} vessels={vessels} />
        {userLocation && <UserLocationIcon userLocation={userLocation} />}
        <FixedControls
          refreshVessels={refreshVessels}
          setInfo={setInfo}
          setUserLocation={setUserLocation}
          userLocation={userLocation}
          setSettings={setSettings}
          vessels={vessels}
        />
      </MapContainer>
      <SlidingBottomPane activePane={activePane} setActivePane={setActivePane} />
    </section>
  );
}
