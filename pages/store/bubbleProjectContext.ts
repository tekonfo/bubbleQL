import { createContext } from 'react'
export type BubbleApplicationType = {
  apiToken: string
  appName: string
  workFlowApiUrl: string
  dataApiUrl: string
  enableDataTables: Array<string>
  isTestMode: boolean
}
export type BubbleApplicationContextType = {
  bubbleApplicationContext: BubbleApplicationType
  setBubbleApplicationContext: React.Dispatch<
    React.SetStateAction<BubbleApplicationType>
  >
}
// これの登録がない場合は、リダイレクトするとかしたい
export const BubbleApplicationContext = createContext(
  {} as BubbleApplicationContextType,
)
