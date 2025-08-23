import React from 'react';
import ferry from '../assets/ferry-token-good.svg';

export function LoadingScreen({ firstLoadComplete }) {
  return (
    <div
      data-testid="loading-screen"
      className={`${
        firstLoadComplete ? 'scaleLoadingScreenOut' : ''
      } z-50 fixed top-0 left-0 bg-green-brand h-screen w-screen flex items-center justify-center flex-col`}
    >
      <div className="circle bg-gray-200 rounded-full inline-block h-60 w-60 flex items-center justify-center shadow-lg">
        <img className="h-40 w-40" src={ferry} alt="loading screen" />
      </div>
    </div>
  );
}
