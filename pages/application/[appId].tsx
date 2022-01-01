import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { listenAuthState } from '../../src/auth/auth'
import DetailTable from '../../src/components/pages/detailTable'
import {
  getBubbleApplication,
  setBubbleApplication,
} from '../../src/repository/model/bubbleApplication'
import { getBubbleTableSettings } from '../../src/repository/model/bubbleTableSetting'
import {
  BubbleApplicationContext,
  BubbleApplicationType,
} from '../../src/store/bubbleProjectContext'
import {
  BubbleTableSettingContext,
  BubbleTableSettingContextType,
  BubbleTableSettingType,
} from '../../src/store/bubbleTableSettingContext'
import {
  CurrentUserContext,
  CurrentUserType,
} from '../../src/store/currentUserContext'

const Home = () => {
  const router = useRouter()
  const { appId } = router.query

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
    appId: string,
    value: BubbleApplicationType,
  ) => {
    setBubbleApplicationContext(value)
    setBubbleApplication(appId, value)
  }
  const bubbleApplicationContextValue = {
    bubbleApplicationContext,
    setBubbleApplicationContext: setBubbleApplicationContextWithFireStore,
  }

  const [bubbleTableSettingContextTypes, setBubbleTableSettingContextTypes] =
    useState<Array<BubbleTableSettingContextType>>([{ tableName: '' }])
  const bubbleTableSettingsContext: BubbleTableSettingType = {
    index: 0,
    bubbleTableSettingContextTypes,
    setBubbleTableSettingContextTypes,
  }

  const [currentUser, setCurrentUser] = useState<CurrentUserType>(null)
  const currentUserContextValue = {
    currentUser,
    setCurrentUser,
  }

  useEffect(() => {
    if (!router.isReady) return

    const f = async () => {
      // ログインしているかどうかを判定する
      listenAuthState(setCurrentUser)

      // bubbleApplicationContextのデータをフェッチ
      if (typeof appId !== 'string') {
        return
      }
      const bubbleApplication = await getBubbleApplication(appId)
      const data = bubbleApplication.data()
      if (data === undefined) {
        return
      }
      setBubbleApplicationContext(data)

      // table
      const bubbleTableSettings = await getBubbleTableSettings(appId)
      setBubbleTableSettingContextTypes(bubbleTableSettings)
    }
    f()
  }, [router.isReady])

  return (
    <>
      <CurrentUserContext.Provider value={currentUserContextValue}>
        <BubbleApplicationContext.Provider
          value={bubbleApplicationContextValue}
        >
          <BubbleTableSettingContext.Provider
            value={bubbleTableSettingsContext}
          >
            <DetailTable></DetailTable>
          </BubbleTableSettingContext.Provider>
        </BubbleApplicationContext.Provider>
      </CurrentUserContext.Provider>
    </>
  )
}

export default Home
