import React, { useState, useEffect } from 'react'
import { useMap } from 'react-leaflet/hooks'

export function FindLocationButton({ userLocation, setUserLocation }) {
  const [watchId, setWatchId] = useState(null)

  const map = useMap()

  // Remove the watch when the component unmounts if one exists
  useEffect(() => {
    return () => { if (watchId) { navigator.geolocation.clearWatch(watchId) } }
  })

  const success = (pos) => {
    const crd = pos.coords;

    const firstTime = userLocation === null

    setUserLocation(crd)

    if (firstTime) {
      map.flyTo([crd.latitude, crd.longitude], 15)    
    }
  }

  const error = (err) => {
    console.warn(`failed getting location: ${err.code}: ${err.message}`)
  }

  const startLocationWatch = () => {
    const id = navigator.geolocation.watchPosition(success, error, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    })

    setWatchId(id)
  }

  const endLocationWatch = () => {
    navigator.geolocation.clearWatch(watchId)
    setWatchId(null)
    setUserLocation(null)
  }

  const handleClick = () => {
    if (watchId) {
      endLocationWatch()
    } else {
      startLocationWatch()
    }
  }

  if (!navigator.geolocation) {
    return null
  }

  let title = 'Enable GPS tracking of your device'
  let bgColors = 'bg-green-brand active:bg-green-900' 
  let strokeColor = '#E5E7EB'
  let strokeWidth = 2

  if (watchId) {
    title = 'Disable GPS tracking of your device'
    bgColors = 'bg-gray-200 active:bg-gray-100 border-2 border-blue-secondary'
    strokeColor = '#44A5DE'
    strokeWidth = 3
  }

  return (
    <button
      title={title}
      onClick={handleClick}
      className={`
        ${bgColors} rounded-full h-10 w-10 p-2 mt-4 shadow-lg select-none
        flex justify-center items-center 
      `}>
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke={strokeColor} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    </button>
  )
}
