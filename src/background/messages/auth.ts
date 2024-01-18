import type { PlasmoMessaging } from '@plasmohq/messaging'

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  res.send({
    user: 'tilal',
  })
}

export default handler