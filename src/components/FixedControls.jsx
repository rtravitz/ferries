import React, { useState } from 'react'
import { FindLocationButton } from './FindLocationButton'
import refresh from '../assets/refresh.svg'
import info from '../assets/information-outline.svg'
import cog from '../assets/cog.svg'

export default function FixedControls({ 
  refreshVessels,
  setInfo,
  setSettings,
  setUserLocation,
  userLocation,
}) {
  const [spinning, setSpinning] = useState('')

  return (
    <div className="fixed top-4 right-2 flex flex-col z-max items-center">
      <button
        onClick={() => {
          refreshVessels()
          setSpinning('animate-spin-once')
        }}
        onAnimationEnd={() => {
          setSpinning('')
        }}
        className="bg-green-brand active:bg-green-900 rounded-full h-16 w-16 p-2 shadow-lg select-none"
      >
        <img className={spinning} src={refresh} alt="refresh arrow" />
      </button>
      <button
        onClick={setInfo}
        className="bg-green-brand active:bg-green-900 rounded-full h-10 w-10 p-2 mt-4 shadow-lg select-none"
      >
        <img className="" src={info} alt="info icon" />
      </button>
      <button
        onClick={setSettings}
        className="bg-green-brand active:bg-green-900 rounded-full h-10 w-10 p-2 mt-4 shadow-lg select-none"
      >
        <img className="" src={cog} alt="cog icon" />
      </button>
      <FindLocationButton
        userLocation={userLocation}
        setUserLocation={setUserLocation} />
    </div>
  )
}
