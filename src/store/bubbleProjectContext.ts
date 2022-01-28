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
  appId: string
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
    const [appId, setAppId] = useState('')
    const [bubbleApplicationContext, setBubbleApplicationContext] =
      useState<BubbleApplicationType>({
        apiToken: '',
        appName: '',
        workFlowApiUrl: '',
        dataApiUrl: '',
        isTestMode: true,
        enableDataTables: [],
      })

    const setBubbleApplicationContextWithFireStore = async (
      uid: string,
      value: BubbleApplicationType,
      appId?: string,
    ) => {
      setBubbleApplicationContext(value)
      const id = await setBubbleApplication(uid, value, appId)
      setAppId(id)
    }

    return {
      bubbleApplicationContext,
      appId,
      setBubbleApplicationContext: setBubbleApplicationContextWithFireStore,
    }
  }
