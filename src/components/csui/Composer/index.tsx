import React, { useCallback, useEffect, useState } from 'react'
import { Box, Flex, IconButton, Separator } from '@radix-ui/themes'
import type { Props } from './types'
import { usePopper } from 'react-popper'
import { AnimatePresence, motion } from 'framer-motion'
import anchorIcon from 'data-base64:~assets/images/anchor-icon.png'
import { PaperPlaneIcon } from '@radix-ui/react-icons'
import { sendToBackground } from '@plasmohq/messaging'

export const Composer: React.FC<Props> = ({ coordinates, onSend }) => {
  const [isFocused, setFocused] = useState(false)
  const [comment, setComment] = useState('')
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

  const handleSend = useCallback(async () => {
    const { message: image } = await sendToBackground({
      name: 'capture',
      body: {},
    })
  }, [])

  useEffect(() => {
    update && update()
  }, [coordinates, update])

  return (
    <AnimatePresence>
      <div
        className="anchor"
        style={{ left: coordinates.x, top: coordinates.y }}
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
          <textarea
            rows={isFocused ? 4 : 1}
            placeholder="Write a comment"
            onFocus={() => setFocused(true)}
            onBlur={() => comment.length === 0 && setFocused(false)}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          {isFocused && (
            <>
              <Separator size="4" />
              <Flex p="2" justify="end">
                <IconButton
                  disabled={comment.length === 0}
                  onClick={handleSend}
                >
                  <PaperPlaneIcon />
                </IconButton>
              </Flex>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
