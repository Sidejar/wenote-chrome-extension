import React from 'react'
import type { PlasmoGetStyle } from 'plasmo'
import type { PlasmoGetOverlayAnchor } from 'plasmo'

import '~components/csui/styles.scss'
import '@radix-ui/themes/styles.css'

import styles from 'data-text:~components/csui/styles.scss'
import radixStyles from 'data-text:@radix-ui/themes/styles.css'
import { CSUI } from '~components/csui'

export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement('style')
  style.textContent = `${radixStyles} ${styles}`
  return style
}

export const getOverlayAnchor: PlasmoGetOverlayAnchor = () => document.body

const ContentUI = () => {
  return <CSUI />
}

export default ContentUI
