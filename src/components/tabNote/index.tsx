import React, { useEffect, useMemo, useState } from 'react'
import { Theme, Text, Flex } from '@radix-ui/themes'
import useApi from '~hook/useApi'
import type { INote } from '~models'
import anchorIcon from 'data-base64:~assets/images/anchor-icon.png'

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

  return (
    <Theme>
      <div className="container">
        <img src={note?.screenshot} className="image" />
        <span
          className="anchor"
          style={{ left: `${xPosition}%`, top: `${yPosition}%` }}
        >
          <img src={anchorIcon} width={44} height={44} className="icon" />
        </span>
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
