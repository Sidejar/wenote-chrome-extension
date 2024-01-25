import React from 'react'
import type { Props } from './types'
import { Flex, Separator } from '@radix-ui/themes'

export const Editor: React.FC<Props> = ({
  value,
  onChange,
  children,
  ...rest
}) => {
  return (
    <div className="editor" {...rest}>
      <textarea
        rows={value.length > 0 ? 4 : 1}
        placeholder="Write a comment"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value.length > 0 && (
        <>
          <Flex p="2" justify="end">
            {children}
          </Flex>
        </>
      )}
    </div>
  )
}
