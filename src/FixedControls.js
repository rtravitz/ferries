import React from 'react'
import refresh from './assets/refresh.svg'
import info from './assets/information-outline.svg'

function FixedControls({ refreshVessels, setInfo }) {
  return (
    <div className="fixed top-4 right-2 flex flex-col z-50 items-center">
      <button onClick={refreshVessels} className="bg-green-700 rounded-full h-16 w-16 p-2 shadow-md">
        <img className="" src={refresh} alt="refresh arrow" />
      </button>
      <button onClick={setInfo} className="bg-green-700 rounded-full h-10 w-10 p-2 mt-4 shadow-md">
        <img className="" src={info} alt="info icon" />
      </button>
    </div>
  )
}

export default FixedControls
