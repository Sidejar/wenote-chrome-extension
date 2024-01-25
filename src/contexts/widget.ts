import { createContext, useContext } from 'react'

export interface WidgetContextInterface {
  isWidgetVisible: boolean
  setWidgetVisible: (flag: boolean) => void
}

export const WidgetContext = createContext<WidgetContextInterface>(
  {} as WidgetContextInterface,
)

export const useWidgetContext = (): WidgetContextInterface => {
  return useContext(WidgetContext)
}
