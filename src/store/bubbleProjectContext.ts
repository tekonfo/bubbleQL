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

export type SetBubbleApplicationInputType = {
  uid: string
  appId: string
  value: BubbleApplicationType
}

export type BubbleApplicationContextType = {
  bubbleApplicationContext: BubbleApplicationType
  setBubbleApplicationContext: (
    uid: string,
    data: BubbleApplicationType,
    appId?: string,
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
      value: BubbleApplicationType,
      appId?: string,
    ) => {
      setBubbleApplicationContext(value)
      setBubbleApplication(uid, value, appId)
    }

    return {
      bubbleApplicationContext,
      setBubbleApplicationContext: setBubbleApplicationContextWithFireStore,
    }
  }
