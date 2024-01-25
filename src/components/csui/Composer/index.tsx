import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import type { Props } from './types'
import { usePopper } from 'react-popper'
import { AnimatePresence, motion } from 'framer-motion'
import anchorIcon from 'data-base64:~assets/images/anchor-icon.png'
import { sendToBackground } from '@plasmohq/messaging'
import useApi from '~hook/useApi'
import { dataURLtoFile } from '~services/utils'
import { Editor } from '~components/common/Editor'

export const Composer: React.FC<Props> = ({ meta, onSend }) => {
  const { api, status } = useApi()
  const [postedNote, setNote] = useState<string | undefined>()
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
    null,
  )
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null,
  )
  const { styles, attributes, update } = usePopper(
    referenceElement,
    popperElement,
    {
      placement: 'right-start',
    },
  )

  useLayoutEffect(() => {
    if (postedNote) {
      sendToBackground({
        name: 'capture',
        body: {},
      }).then(({ message: image }) => {
        setNote(undefined)

        const data = new FormData()
        data.append('image', dataURLtoFile(image))
        data.append('note', postedNote)
        data.append('url', window.location.href)
        data.append('meta', JSON.stringify(meta))

        api.notes.saveNote(data)
      })
    }
  }, [postedNote, api, meta])

  const handleSend = useCallback(async (value: string) => {
    setNote(value)
  }, [])

  useEffect(() => {
    update && update()
  }, [meta.position, update])

  if (postedNote) return null // we hide UI to take screenshot and than make it visible

  return (
    <AnimatePresence>
      <div
        className="anchor"
        style={{
          left: meta.position[0] + meta.scroll[0],
          top: meta.position[1] + meta.scroll[1],
        }}
      >
        <img
          ref={setReferenceElement}
          src={anchorIcon}
          width={44}
          height={44}
          className="icon"
        />
        <motion.div
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
          initial={{ opacity: 0, marginTop: -8 }}
          animate={{ opacity: 1, marginTop: 0 }}
          exit={{ opacity: 0, marginTop: 8 }}
          transition={{ ease: 'easeOut', duration: 0.2 }}
          className="popout"
        >
          <Editor onSend={handleSend} />
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
