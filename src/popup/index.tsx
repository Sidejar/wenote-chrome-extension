import { Theme, Button } from '@radix-ui/themes'
import React, { useCallback } from 'react'
// import csui from "url:~/content/widget"

import '~assets/style.css'

const Popup = () => {
  const handleAdd = useCallback(async () => {
    // const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
    // chrome.tabs.sendMessage(tabs[0]!.id!, 'launch')
    // chrome.scripting.executeScript( {
    //   target: {
    //     tabId: tabs[0]!.id! // the tab you want to inject into
    //   },
    //   world: 'ISOLATED',
    //   files: [csui.replace(/chrome-extension:\/\/[a-z]*\/([^?]*)\?.*/i, '$1')], // function to inject
    // },
    // () => {
    //   console.log("Background script got callback after injection")
    // })
  }, [])

  return (
    <div className="w-fit shadow-xl !rounded-2xl">
      <Theme className="!rounded-3xl">
        <Button size="3" variant="soft" onClick={handleAdd}>
          Add Comment
        </Button>
      </Theme>
    </div>
  )
}

export default Popup
