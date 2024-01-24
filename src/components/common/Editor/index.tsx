import React, { useCallback, useState } from 'react'
import type { Props } from './types'
import { Flex, IconButton, Separator } from '@radix-ui/themes'
import { PaperPlaneIcon } from '@radix-ui/react-icons'

export const Editor: React.FC<Props> = ({ onSend, ...rest }) => {
  const [value, setValue] = useState('')

  const handleSend = useCallback(() => {
    onSend(value)
  }, [onSend, value])

  return (
    <div className="editor" {...rest}>
      <textarea
        rows={value.length > 0 ? 4 : 1}
        placeholder="Write a comment"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value.length > 0 && (
        <>
          <Separator size="4" />
          <Flex p="2" justify="end">
            <IconButton onClick={handleSend}>
              <PaperPlaneIcon />
            </IconButton>
          </Flex>
        </>
      )}
    </div>
  )
}
