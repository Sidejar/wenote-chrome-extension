import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { Composer } from '../Composer'
import type { NotesMeta } from '~models'
import { Text } from '@radix-ui/themes'
import { AnimatePresence } from 'framer-motion'

export const Canvas: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [meta, setMeta] = useState<NotesMeta>()

  useEffect(() => {
    ref.current &&
      ref.current.addEventListener('click', (e: MouseEvent) => {
        setMeta({
          position: [e.clientX, e.clientY],
          scroll: [window.scrollX, window.scrollY],
          dimensions: [window.innerWidth, window.innerHeight],
        })
      })
  }, [])

  return (
    <AnimatePresence>
      <div ref={ref} className="blocker">
        <Text>{meta ? '' : 'Click anywhere to add note'}</Text>
      </div>
      {meta && <Composer meta={meta} />}
    </AnimatePresence>
  )
}
