import type { MotionProps } from 'framer-motion'
import type { INote } from '~models'

export interface Props extends MotionProps {
  note: INote
  onClose: () => void
}
