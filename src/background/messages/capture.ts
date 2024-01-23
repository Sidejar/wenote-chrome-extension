import { type PlasmoMessaging } from '@plasmohq/messaging'

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const message = await chrome.tabs.captureVisibleTab({ format: 'png' })
  res.send({ message })

  // res.send({
  // })
}

export default handler