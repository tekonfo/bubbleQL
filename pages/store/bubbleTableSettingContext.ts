import { createContext } from 'react'
export type BubbleTableSettingContextType = {
  tableName: string
}
export const BubbleTableSettingContext = createContext(
  {} as BubbleTableSettingContextType,
)
