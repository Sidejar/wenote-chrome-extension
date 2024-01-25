import type { HTMLProps } from 'react'

export interface Props extends HTMLProps<HTMLDivElement> {
  value: string
  onChange: (value: string) => void
}
