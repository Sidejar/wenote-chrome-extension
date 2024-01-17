import { Box, Button } from '@radix-ui/themes'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Composer } from '../Composer'

export const Canvas: React.FC = () => {
  const [coordinates, setCoordinates] = useState<{
    x: number
    y: number
  }>()

  useEffect(() => {
    document.body.addEventListener('click', (e: MouseEvent) => {
      //e.preventDefault()
      //e.stopPropagation()
      console.log(e.clientX, e.clientY)
      setCoordinates({ x: e.clientX, y: e.clientY })
    })
  }, [])

  return (
    <Box width="100%" height="100%">
      {coordinates && <Composer coordinates={coordinates} />}
    </Box>
  )
}
