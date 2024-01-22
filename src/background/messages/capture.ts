import type { PlasmoMessaging } from '@plasmohq/messaging'

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const message = await chrome.tabs.captureVisibleTab(null, { format: 'png' })
  res.send({
    message,
  })
}

export default handler
