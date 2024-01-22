import React, { useCallback, useRef, useState } from 'react'
import { useEffect } from 'react'
import { Composer } from '../Composer'
import type { NotesMeta } from '~services/Api/notes.service'

export const Canvas: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [meta, setMeta] = useState<NotesMeta>()

  const handleSend = useCallback(() => {}, [])

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
    <>
      <div ref={ref} className="blocker" />
      {meta && <Composer onSend={handleSend} meta={meta} />}
    </>
  )
}
