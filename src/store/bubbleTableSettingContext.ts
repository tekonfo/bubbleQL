import { createContext } from 'react'
export type BubbleTableSettingContextType = {
  tableName: string
}
export type BubbleTableSettingType = {
  bubbleTableSettingContextTypes: Array<BubbleTableSettingContextType>
  index: number
  setBubbleTableSettingContextTypes: React.Dispatch<
    React.SetStateAction<BubbleTableSettingContextType[]>
  >
}
export const BubbleTableSettingContext = createContext(
  {} as BubbleTableSettingType,
)
