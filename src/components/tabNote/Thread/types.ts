import type { MotionProps } from 'framer-motion'
import type { HTMLProps } from 'react'
import type { INote } from '~models'

export interface Props extends MotionProps {
  note: INote
}
