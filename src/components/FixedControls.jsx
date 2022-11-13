import React, { useState } from 'react'
import refresh from '../assets/refresh.svg'
import info from '../assets/information-outline.svg'
import cog from '../assets/cog.svg'
import locationMarker from '../assets/location-marker.svg'
import { useMap } from 'react-leaflet/hooks'

export default function FixedControls({ refreshVessels, setInfo, setSettings, setUserLocation }) {
  const [spinning, setSpinning] = useState('')
  const map = useMap()

  const success = (pos) => {
    const crd = pos.coords;

    setUserLocation(crd)

    map.flyTo([crd.latitude, crd.longitude], 15)    
  }

  const error = (err) => {
    console.warn(`failed getting location: ${err.code}: ${err.message}`)
  }

  const findLocation = () => {
    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    })
  }

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
      {navigator.geolocation && 
        <button
          onClick={findLocation}
          className="bg-green-brand active:bg-green-900 rounded-full h-10 w-10 p-2 mt-4 shadow-lg select-none"
        >
          <img className="" src={locationMarker} alt="cog icon" />
        </button>
      }
    </div>
  )
}
