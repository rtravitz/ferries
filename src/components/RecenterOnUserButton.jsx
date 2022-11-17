import React, { useState } from 'react'
import { useMap } from 'react-leaflet/hooks'
import { useMapEvent } from 'react-leaflet/hooks'

export function RecenterOnUserButton({ userLocation }) {
  const [centered, setCentered] = useState(true)

  const map = useMap()

  useMapEvent('movestart', () => {
    setCentered(false)
  })

  const recenterOnUser = () => {
    map.flyTo([userLocation.latitude, userLocation.longitude], 15)
    setCentered(true)
  }

  if (centered) {
    return null
  }

  return (
    <button 
      title="Center screen on your location"
      onClick={recenterOnUser}
      className="border-2 border-blue-secondary bg-gray-200 shadow rounded flex justify-center items-center h-10 w-10 mt-4">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 106 119">
      <path fill="#44A5DE" fillRule="evenodd" d="M99.753 50.672 61.33 65.89l-7.724 37.604-41.426-80.151 87.572 27.33Z"/>
    </svg>
    </button>
  )
}

