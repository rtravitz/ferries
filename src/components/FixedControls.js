import React, { useState } from 'react'
import refresh from '../assets/refresh.svg'
import info from '../assets/information-outline.svg'

export default function FixedControls({ refreshVessels, setInfo, fetching }) {
  const [spinning, setSpinning] = useState('')

  return (
    <div className="fixed top-4 right-2 flex flex-col z-50 items-center">
      <button
        onClick={() => {
          refreshVessels()
          setSpinning('animate-spin-once')
        }}
        onAnimationEnd={() => {
          setSpinning('')
        }}
        className="bg-green-700 active:bg-green-900 rounded-full h-16 w-16 p-2 shadow-lg select-none"
      >
        <img className={spinning} src={refresh} alt="refresh arrow" />
      </button>
      <button
        onClick={setInfo}
        className="bg-green-700 active:bg-green-900 rounded-full h-10 w-10 p-2 mt-4 shadow-lg select-none"
      >
        <img className="" src={info} alt="info icon" />
      </button>
    </div>
  )
}
