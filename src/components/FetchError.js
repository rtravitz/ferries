import React from 'react'
import { useTransition, animated } from 'react-spring'
import exclamation from '../assets/exclamation-outline.svg'

export default function FetchError({ active }) {
  const transitions = useTransition(active, {}, {
    from: { opacity: 0, scale: 0.9 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0.9 },
  })

  return (
    transitions.map(({ item, key, props }) => (
      item && <animated.div style={props} key={key} className="flex flex-col fixed top-4 left-4 z-50 bg-gray-200 rounded-lg justify-center items-center w-1/2 shadow-lg">
        <div className="w-full rounded-t-lg py-1 flex items-end bg-red-700">
          <img className="h-6 mx-2" src={exclamation} alt="exclamation mark in a circle" />
          <h3 className="text-gray-200 text-xl font-bold leading-none">Uh oh...</h3>
        </div>
        <p className="text-red-700 p-2">
          There was an error fetching updated vessel information.
      </p>
      </animated.div>
    ))
  )
}
