import { env } from '~env'

export const dataURLtoFile = (dataurl) => {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n) {
    u8arr[n - 1] = bstr.charCodeAt(n - 1)
    n -= 1 // to make eslint happy
  }
  return new File([u8arr], 'blob.png', { type: mime })
}

export const generateShareUrl = (noteId: string) => {
  return `chrome-extension://${env.crxId}/tabs/note.html?id=${noteId}`
}

export const copyShareUrl = (noteId: string) => {
  return window.navigator.clipboard.writeText(generateShareUrl(noteId))
}
