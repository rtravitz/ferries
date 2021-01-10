import React from 'react'
import { useSpring, animated, config } from 'react-spring'
import { useDrag } from 'react-use-gesture'

export default function BottomPane({ header, headerColor, toRender }) {
  const color = headerColor || 'bg-ferry-green'
  const height = 250
  const [{ y }, set] = useSpring(() => ({ y: 0 }))

  const bind = useDrag(({ last, down, cancel, canceled, vxvy: [, vy], movement: [, my] }) => {
    if (last) {
      console.log('my:', my, 'vy:', vy)
      my > height * 0.5 || vy > 0.5 ? console.log('would exit') : console.log('wouldnt exit')
    } else {
      set({ y: my, immediate: true })
    }
  }, { initial: () => [0, y.get()], filterTaps: true, bounds: { top: 0 }, rubberband: true })

  const props = y.to((py) => (py < height ? 'block' : 'none'))

  return (
    <animated.section 
      { ...bind() }
      style={{ props, y, height: 250 + 100}}
      className="fixed bottom-0 z-50 w-full">
      <div className={`${color} bg-center bg-contain bg-no-repeat h-20 flex flew-row justify-center items-center`}>
        <h1 className="font-sans font-bold text-xl text-gray-200 mt-6 text-center">{header}</h1>
      </div>
      { toRender }
    </animated.section>
  )
}
