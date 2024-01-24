import type { HTMLProps } from 'react'

export interface Props extends HTMLProps<HTMLDivElement> {
  onSend: (value: string) => void
}
