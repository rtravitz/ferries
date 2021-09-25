import React from 'react'
import useMeasure from 'react-use-measure'
import { useDrag } from '@use-gesture/react'
import { a, useSpring, config } from '@react-spring/web'

export default function BottomPane({ header, headerColor, toRender, setActivePane }) {
  const color = headerColor || 'bg-ferry-green'
  const [ref, { height }] = useMeasure()
  const [{ y }, api] = useSpring(() => ({ y: height }))

  const open = ({ canceled }) => {
    api.start({ y: 0, immediate: false, config: canceled ? config.wobbly : config.stiff })
  }
  const close = (velocity = 0) => {
    api.start({ y: height, immediate: false, config: { ...config.stiff, velocity } })
    setTimeout(() => {
      setActivePane(null)
    }, 100)
  }

  const bind = useDrag(({ last, down, velocity: [, vy], movement: [,my], cancel, canceled }) => { 
    if (my < -60) {
      cancel()
    }

    if (last) {
      const shouldClose = my > 0 && (my > height * 0.5 || vy > 0.6)
      shouldClose ? close(vy) : open({ canceled })
    } else {
      api.start({ y: down ? my : 0, immediate: down }) 
    }
  }, 
    { 
      axis: 'y',
      from: () => [0, y.get()],
      filterTaps: true,
      bounds: { top: 0 },
      rubberband: true,
    }
  )

  return (
    <a.section ref={ref} {...bind()} className="fixed -bottom-20 z-50 w-full" style={{y, 'touch-action': 'none'}}>
      <div
        className={`${color} bg-center bg-contain bg-no-repeat h-20 flex flew-row justify-center items-center`}
      >
        <h1 className="font-sans font-bold text-xl text-gray-200 mt-6 text-center">{header}</h1>
      </div>
      {toRender}
      <div className="h-20 bg-gray-transparent-200" />
    </a.section>
  )
}
