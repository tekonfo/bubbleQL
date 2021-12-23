import { createContext } from 'react'
export type BubbleApplicationContextType = {
  apiToken: string
  appName: string
  workFlowApiUrl: string
  dataApiUrl: string
  enableDataTables: Array<string>
  isTestMode: boolean
}
// これの登録がない場合は、リダイレクトするとかしたい
export const BubbleApplicationContext = createContext(
  {} as BubbleApplicationContextType,
)
