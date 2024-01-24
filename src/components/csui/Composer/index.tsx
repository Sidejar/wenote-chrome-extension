import React, { useCallback, useEffect, useState } from 'react'
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

  const handleSend = useCallback(
    async (value: string) => {
      const { message: image } = await sendToBackground({
        name: 'capture',
        body: {},
      })

      const data = new FormData()
      data.append('image', dataURLtoFile(image))
      data.append('note', value)
      data.append('url', window.location.href)
      data.append('meta', JSON.stringify(meta))

      api.notes.saveNote(data)
    },
    [meta, api],
  )

  useEffect(() => {
    update && update()
  }, [meta.position, update])

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
