export interface Props {
  coordinates?: { x: number; y: number }
  onSend: (note: string) => Promise<void>
}
