import React, { useEffect, useMemo, useState } from 'react'
import { Theme, Text, Flex } from '@radix-ui/themes'
import useApi from '~hook/useApi'
import type { INote } from '~models'
import { usePopper } from 'react-popper'
import { Thread } from './Thread'

export const TabNote: React.FC = () => {
  const { api, status } = useApi()
  const [note, setNote] = useState<INote>()

  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search)
    const id = searchParams.get('id')

    api.notes.getNote(id).then(setNote)
  }, [api])

  const xPosition = useMemo(
    () => (note?.meta.position[0] / note?.meta.dimensions[0]) * 100,
    [note?.meta],
  )

  const yPosition = useMemo(
    () => (note?.meta.position[1] / note?.meta.dimensions[1]) * 100,
    [note?.meta],
  )

  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
    null,
  )
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null,
  )
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'right-start',
  })

  return (
    <Theme>
      <div className="container">
        <img src={note?.screenshot} className="image" />
        {note && (
          <span
            className="anchor"
            style={{ left: `${xPosition}%`, top: `${yPosition}%` }}
          >
            <span className="pointer" ref={setReferenceElement}>
              <Text size="2" weight="bold">
                {(note?.comments || 0) + 1}
              </Text>
            </span>
            <Thread
              ref={setPopperElement}
              note={note}
              style={styles.popper}
              {...attributes.popper}
            />
          </span>
        )}
      </div>
      <Flex p="5" justify="center">
        <Text>
          Powered by{' '}
          <a href="https://www.wenote.io/" target="_blank">
            Wenote
          </a>
        </Text>
      </Flex>
    </Theme>
  )
}
