import React from 'react'
import { Theme } from '@radix-ui/themes'
import { Canvas } from './Canvas'

export const CSUI: React.FC = () => {
  return (
    <Theme className="wenote">
      <Canvas />
    </Theme>
  )
}
