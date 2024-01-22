import type { NotesMeta } from '~services/Api/notes.service'

export interface Props {
  meta: NotesMeta
  onSend: () => void
}
