import { useRouter } from 'next/router'
import React, { useState, useEffect, useContext } from 'react'
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
import { CurrentUserContext } from '../../src/store/currentUserContext'
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
    value: BubbleApplicationType,
    appId?: string,
  ) => {
    setBubbleApplicationContext(value)
    setBubbleApplication(uid, value, appId)
  }

  const id = typeof appId == 'string' ? appId : ''

  const bubbleApplicationContextValue = {
    bubbleApplicationContext,
    appId: id,
    setBubbleApplicationContext: setBubbleApplicationContextWithFireStore,
  }

  const [bubbleTableSettingContextTypes, setBubbleTableSettingContextTypes] =
    useState<Array<BubbleTableSettingContextType>>([
      { id: '', data: { tableName: '' } },
    ])

  const [index, setIndex] = useState(0)
  const bubbleTableSettingsContext: BubbleTableSettingType = {
    index,
    setIndex,
    bubbleTableSettingContextTypes,
    setBubbleTableSettingContextTypes,
  }

  const currentUserContextValue = useContext(CurrentUserContext)

  useEffect(() => {
    if (!router.isReady) return

    const f = async () => {
      // ログインしているかどうかを判定する
      listenAuthState(currentUserContextValue.setCurrentUser)

      if (!currentUserContextValue.currentUser) {
        return
      }

      const uid = currentUserContextValue.currentUser.uid

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
  }, [router.isReady, currentUserContextValue.currentUser])

  return (
    <>
      <BubbleApplicationContext.Provider value={bubbleApplicationContextValue}>
        <BubbleTableSettingContext.Provider value={bubbleTableSettingsContext}>
          <IsRefreshBubbleTableContext.Provider
            value={isRefreshBubbleTableTypeContextValue}
          >
            <DetailTable></DetailTable>
          </IsRefreshBubbleTableContext.Provider>
        </BubbleTableSettingContext.Provider>
      </BubbleApplicationContext.Provider>
    </>
  )
}

export default Home
