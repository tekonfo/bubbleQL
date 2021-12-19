import { createContext } from 'react'

// これの登録がない場合は、リダイレクトするとかしたい
export const BubbleTableContext = createContext(
  {} as {
    apiToken: string
    workFlowApiUrl: string
    dataApiUrl: string
    enableDataTables: Array<string>
  },
)
