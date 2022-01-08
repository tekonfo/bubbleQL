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
import {
  BuildIsRefreshBubbleTableContext,
  IsRefreshBubbleTableContext,
} from '../../src/store/refreshBubbleTableContext'

const Home = () => {
  const router = useRouter()
  const { appId } = router.query

  const isRefreshBubbleTableTypeContextValue =
    BuildIsRefreshBubbleTableContext()

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

      if (!currentUser) {
        return
      }

      const uid = currentUser.uid

      // bubbleApplicationContextのデータをフェッチ
      if (typeof appId !== 'string') {
        return
      }
      const bubbleApplication = await getBubbleApplication(uid, appId)
      const data = bubbleApplication.data()
      if (data === undefined) {
        return
      }
      setBubbleApplicationContext(data)

      // table
      setBubbleTableSettingContextTypes(
        await getBubbleTableSettings(uid, appId),
      )
    }
    f()
  }, [router.isReady, currentUser])

  return (
    <>
      <CurrentUserContext.Provider value={currentUserContextValue}>
        <BubbleApplicationContext.Provider
          value={bubbleApplicationContextValue}
        >
          <BubbleTableSettingContext.Provider
            value={bubbleTableSettingsContext}
          >
            <IsRefreshBubbleTableContext.Provider
              value={isRefreshBubbleTableTypeContextValue}
            >
              <DetailTable></DetailTable>
            </IsRefreshBubbleTableContext.Provider>
          </BubbleTableSettingContext.Provider>
        </BubbleApplicationContext.Provider>
      </CurrentUserContext.Provider>
    </>
  )
}

export default Home
