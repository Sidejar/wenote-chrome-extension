import type { NotesMeta } from '~models'

export interface Props {
  meta: NotesMeta
  onSend: () => void
}
