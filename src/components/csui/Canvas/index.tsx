import { Box } from '@radix-ui/themes'
import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { Composer } from '../Composer'

export const Canvas: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [coordinates, setCoordinates] = useState<{
    position: number[]
    dimensions: number[]
    scroll: number[]
  }>()

  useEffect(() => {
    ref.current &&
      ref.current.addEventListener('click', (e: MouseEvent) => {
        setCoordinates({
          position: [e.clientX, e.clientY],
          scroll: [window.scrollX, window.scrollY],
          dimensions: [window.innerWidth, window.innerHeight],
        })
      })
  }, [])

  return (
    <>
      <div ref={ref} className="blocker" />
      {coordinates && (
        <Composer
          coordinates={{
            x: coordinates.position[0] + coordinates.scroll[0],
            y: coordinates.position[1] + coordinates.scroll[1],
          }}
        />
      )}
    </>
  )
}
