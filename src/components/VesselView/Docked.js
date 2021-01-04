import React from 'react'

export default function Docked({ vessel }) {
  let nextDeparture = null
  if (vessel.hasNextDeparture()) {
    nextDeparture = <p className="font-semibold">Scheduled departure at {vessel.nextDeparture}</p>
  }

  return (
    <>
      <p className="text-xl font-light">Docked at {vessel.lastDock}</p>
      { nextDeparture }
      { 
        vessel.nextDock !== "" && (
          <>
            <div className="arrow-down my-2"></div>
            <p className="text-xl font-light">{vessel.nextDock}</p>
          </>
        )
      }
    </>
  )
}
