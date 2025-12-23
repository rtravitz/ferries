import React, { useState } from 'react';
import { FindLocationButton } from './FindLocationButton';
import { RecenterOnUserButton } from './RecenterOnUserButton';
import refresh from '../assets/refresh.svg';
import info from '../assets/information-outline.svg';
import cog from '../assets/cog.svg';
import type { UserLocation } from './Map/UserLocationIcon';
import { TerminalSearch } from './TerminalSearch';
import Vessel from '../models/Vessel';

interface FixedControlsProps {
  refreshVessels: () => void;
  setInfo: () => void;
  setSettings: () => void;
  setUserLocation: React.Dispatch<React.SetStateAction<UserLocation | null>>;
  userLocation: UserLocation | null;
  vessels: Array<Vessel>;
}

export default function FixedControls(props: FixedControlsProps) {
  const [spinning, setSpinning] = useState('');

  return (
    <div className="fixed top-4 right-2 flex flex-col z-max items-center">
      <button
        title="Refresh vessel data"
        onClick={() => {
          props.refreshVessels();
          setSpinning('animate-spin-once');
        }}
        onAnimationEnd={() => {
          setSpinning('');
        }}
        className="bg-green-brand active:bg-green-900 rounded-full h-16 w-16 p-2 shadow-lg select-none"
      >
        <img className={spinning} src={refresh} alt="refresh arrow" />
      </button>
      <button
        title="Toggle info pane"
        onClick={props.setInfo}
        className="bg-green-brand active:bg-green-900 rounded-full h-10 w-10 p-2 mt-4 shadow-lg select-none"
      >
        <img className="" src={info} alt="info icon" />
      </button>
      <button
        title="Toggle settings pane"
        onClick={props.setSettings}
        className="bg-green-brand active:bg-green-900 rounded-full h-10 w-10 p-2 mt-4 shadow-lg select-none"
      >
        <img className="" src={cog} alt="cog icon" />
      </button>
      <FindLocationButton userLocation={props.userLocation} setUserLocation={props.setUserLocation} />
      {props.userLocation && <RecenterOnUserButton userLocation={props.userLocation} />}
      <TerminalSearch vessels={props.vessels}/>
    </div>
  );
}
