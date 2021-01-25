import React from 'react'
import Underway from './Underway'
import OutOfService from './OutOfService'
import Docked from './Docked'

import compass from '../../assets/compass.svg'
import speedometer from '../../assets/speedometer.svg'

export default function VesselView({ vessel }) {
  let leftBlock
  if (vessel.isInService()) {
    if (vessel.isStopped()) {
      leftBlock = <Docked vessel={vessel} />
    } else {
      leftBlock = <Underway vessel={vessel} />
    }
  } else {
    leftBlock = <OutOfService vessel={vessel} />
  }

  const wsdotPage = `https://wsdot.wa.gov/ferries/vesselwatch/VesselDetail.aspx?vessel_id=${vessel.id}`

  return (
    <div className="flex">
      <div className="w-1/2 p-2 pb-8 flex flex-col items-center text-center bg-gray-transparent-200">
        {leftBlock}
      </div>
      <div className="w-1/2 p-2 pb-8 flex flex-col items-center justify-between bg-gray-transparent-300">
        <div>
          <div className="flex items-end mb-2">
            <img className="w-10 mr-1" src={speedometer} alt="speedometer" />
            <h3 className="font-semibold text-2xl">
              {vessel.speed}
              <span className="font-light text-sm ml-1">MPH</span>
            </h3>
          </div>
          <div className="flex items-end">
            <img className="w-10 mr-1" src={compass} alt="compass" />
            <h3 className="font-semibold text-2xl">{vessel.headingText}</h3>
          </div>
        </div>
        <a
          href={wsdotPage}
          className="bg-green-700 py-2 px-4 mt-4 mb-2 font-semibold shadow rounded-lg text-gray-200"
        >
          Boat Notes
        </a>
      </div>
    </div>
  )
}
