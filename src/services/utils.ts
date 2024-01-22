export const getCurrentTabUrl = (
  callback: (url: string | undefined) => void,
): void => {
  const queryInfo = { active: true, lastFocusedWindow: true }

  chrome.tabs &&
    chrome.tabs.query(queryInfo, (tabs) => {
      callback(tabs[0].url)
    })
}

export const getCurrentTabUId = (
  callback: (url: number | undefined) => void,
): void => {
  const queryInfo = { active: true, lastFocusedWindow: true }

  chrome.tabs &&
    chrome.tabs.query(queryInfo, (tabs) => {
      callback(tabs[0].id)
    })
}

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
