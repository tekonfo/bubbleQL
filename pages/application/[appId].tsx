import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { listenAuthState } from '../../src/auth/auth'
import DetailTable from '../../src/components/pages/detailTable'
import {
  getBubbleApplication,
  setBubbleApplication,
} from '../../src/repository/firestore'
import {
  BubbleApplicationContext,
  BubbleApplicationType,
} from '../../src/store/bubbleProjectContext'
import { BubbleTableSettingContext } from '../../src/store/bubbleTableSettingContext'
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
    }
    f()
  }, [router.isReady])

  return (
    <>
      <CurrentUserContext.Provider value={currentUserContextValue}>
        <BubbleApplicationContext.Provider
          value={bubbleApplicationContextValue}
        >
          <BubbleTableSettingContext.Provider value={{ tableName: 'student' }}>
            <DetailTable></DetailTable>
          </BubbleTableSettingContext.Provider>
        </BubbleApplicationContext.Provider>
      </CurrentUserContext.Provider>
    </>
  )
}

export default Home
