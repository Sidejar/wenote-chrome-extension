import React, { useEffect } from 'react'
import { Theme } from '@radix-ui/themes'
import { Canvas } from './Canvas'
import { sendToBackground } from '@plasmohq/messaging'
import { useFirebase } from '~hook/useFirebase'

export const CSUI: React.FC = () => {

  // useEffect(() => {
  //   sendToBackground({
  //     name: 'auth',
  //     body: {
  //       id: 123,
  //     },
  //   }).then(console.log)
  // }, [])

  return (
    <Theme>
      <Canvas />
    </Theme>
  )
}
