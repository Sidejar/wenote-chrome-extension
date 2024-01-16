import { Theme, Button } from "@radix-ui/themes"
import type { PlasmoGetOverlayAnchor } from "plasmo"
import React from "react"
import "@radix-ui/themes/styles.css"

import styleText from "data-text:@radix-ui/themes/styles.css"
import type { PlasmoGetStyle } from "plasmo"
import { BookmarkIcon } from "@radix-ui/react-icons"

export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style")
  style.textContent = styleText
  return style
}
 
export const getOverlayAnchor: PlasmoGetOverlayAnchor = () =>
  document.body

const CustomButton = () => {
    return <Theme className="!rounded-3xl">
      <Button>
  <BookmarkIcon width="16" height="16" /> Bookmark
</Button>
    </Theme>
  }

  export default CustomButton