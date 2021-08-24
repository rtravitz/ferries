import React, { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import exclamation from '../assets/exclamation-outline.svg'

export default function FetchError({ active }) {
  const nodeRef = useRef(null)

  return (
    <CSSTransition
      // nodeRef explanation: https://github.com/reactjs/react-transition-group/issues/668#issuecomment-695162879
      nodeRef={nodeRef}
      in={active}
      timeout={1000}
      classNames="alert"
      unmountOnExit
    >
      <div
        ref={nodeRef}
        className="fixed inset-x-0 inset-y-1/2 w-3/4 mx-auto z-50 flex flex-col justify-center items-center rounded-lg shadow-lg"
      >
        <div className="w-full rounded-t-lg py-1 flex items-end bg-red-700">
          <img className="h-6 mx-2" src={exclamation} alt="exclamation mark in a circle" />
          <h3 className="text-gray-200 text-xl font-bold leading-none">Uh oh...</h3>
        </div>
        <p className="text-red-700 bg-gray-200 rounded-b-lg p-2">There was an error fetching updated vessel information. You can refresh or try again later.</p>
      </div>
    </CSSTransition>
  )
}
