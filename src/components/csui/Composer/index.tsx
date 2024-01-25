import React, { useCallback, useEffect, useState } from 'react'
import type { Props } from './types'
import { usePopper } from 'react-popper'
import { AnimatePresence, motion } from 'framer-motion'
import { sendToBackground } from '@plasmohq/messaging'
import useApi from '~hook/useApi'
import { copyShareUrl, dataURLtoFile } from '~services/utils'
import { Editor } from '~components/common/Editor'
import { IconButton } from '@radix-ui/themes'
import { PaperPlaneIcon } from '@radix-ui/react-icons'

export const Composer: React.FC<Props> = ({ meta }) => {
  const { api, status } = useApi()
  const [isCapturing, setIsCapturing] = useState(false)
  const [note, setNote] = useState<string>('')
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

  useEffect(() => {
    if (isCapturing) {
      sendToBackground({
        name: 'capture',
        body: {},
      }).then(({ message: image }) => {
        setIsCapturing(false)

        const data = new FormData()
        data.append('image', dataURLtoFile(image))
        data.append('note', note)
        data.append('url', window.location.href)
        data.append('meta', JSON.stringify(meta))

        api.notes.saveNote(data).then((note) => {
          setNote('')
          copyShareUrl(note.id)
        })
      })
    }
  }, [note, api, meta, isCapturing])

  const handleSend = useCallback(() => {
    setIsCapturing(true)
  }, [])

  useEffect(() => {
    update && update()
  }, [meta.position, update])

  if (isCapturing) return null // we hide UI to take screenshot and than make it visible

  return (
    <AnimatePresence>
      <div
        className="anchor"
        style={{
          left: meta.position[0] + meta.scroll[0],
          top: meta.position[1] + meta.scroll[1],
        }}
      >
        <span ref={setReferenceElement} className="pointer icon" />
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
          <Editor value={note} onChange={setNote}>
            <IconButton disabled={status === 'posting'} onClick={handleSend}>
              <PaperPlaneIcon />
            </IconButton>
          </Editor>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
