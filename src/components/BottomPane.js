import React from 'react'

export default function BottomPane({ header, headerColor, toRender }) {
  const color = headerColor || 'bg-ferry-green'

  return (
    <section className="fixed bottom-0 z-50 w-full">
      <div className={`${color} bg-center bg-contain bg-no-repeat h-20 flex flew-row justify-center items-center`}>
        <h1 className="font-sans font-bold text-xl text-gray-200 mt-6 text-center">{header}</h1>
      </div>
      { toRender }
    </section>
  )
}
