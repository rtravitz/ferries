import React from 'react'

export default function BottomPane({ headerText, headerBackground, toRender }) {
  const background = headerBackground || 'bg-ferry-green'

  return (
    <section className="fixed bottom-0 z-50 w-full">
      <div
        className={`${background} bg-center bg-contain bg-no-repeat h-20 flex flew-row justify-center items-center`}
      >
        <h1 className="font-sans font-bold text-xl text-gray-200 mt-6 text-center">{headerText}</h1>
      </div>
      {toRender}
    </section>
  )
}
