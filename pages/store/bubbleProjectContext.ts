import { createContext } from 'react'

export const BubbleTableContext = createContext(
  {} as {
    apiToken: string
    workFlowApiUrl: string
    dataApiUrl: string
    enableDataTables: Array<string>
  },
)
