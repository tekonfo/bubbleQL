import { createContext } from 'react'
export type BubbleTableSettingEntity = {
  tableName: string
}
export type BubbleTableSettingContextType = {
  id: string
  data: BubbleTableSettingEntity
}
export type BubbleTableSettingType = {
  bubbleTableSettingContextTypes: Array<BubbleTableSettingContextType>
  index: number
  setIndex: React.Dispatch<React.SetStateAction<number>>
  setBubbleTableSettingContextTypes: React.Dispatch<
    React.SetStateAction<BubbleTableSettingContextType[]>
  >
}
export const BubbleTableSettingContext = createContext(
  {} as BubbleTableSettingType,
)
