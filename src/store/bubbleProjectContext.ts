import { createContext, useState } from 'react'
import { setBubbleApplication } from '../repository/model/bubbleApplication'
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
  setBubbleApplicationContext: (
    uid: string,
    appId: string,
    data: BubbleApplicationType,
  ) => void
}
// これの登録がない場合は、リダイレクトするとかしたい
export const BubbleApplicationContext = createContext(
  {} as BubbleApplicationContextType,
)

export const BuildBubbleApplicationContext =
  (): BubbleApplicationContextType => {
    const [bubbleApplicationContext, setBubbleApplicationContext] =
      useState<BubbleApplicationType>({
        apiToken: '',
        appName: '',
        workFlowApiUrl: '',
        dataApiUrl: '',
        isTestMode: true,
        enableDataTables: [],
      })
    const setBubbleApplicationContextWithFireStore = (
      uid: string,
      appId: string,
      value: BubbleApplicationType,
    ) => {
      setBubbleApplicationContext(value)
      setBubbleApplication(uid, appId, value)
    }
    return {
      bubbleApplicationContext,
      setBubbleApplicationContext: setBubbleApplicationContextWithFireStore,
    }
  }
