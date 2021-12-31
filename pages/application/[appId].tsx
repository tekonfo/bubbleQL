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
      apiToken: 'aaa',
      appName: 'try-plugin',
      workFlowApiUrl: 'ccc',
      dataApiUrl: 'bbb',
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

  const bubbleTableSettingContext = { tableName: 'student' }

  const [currentUser, setCurrentUser] = useState<CurrentUserType>(null)
  useEffect(() => {
    if (!router.isReady) return

    const f = async () => {
      listenAuthState(setCurrentUser)
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
  const currentUserContextValue = {
    currentUser,
    setCurrentUser,
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUserContextValue}>
        <BubbleApplicationContext.Provider
          value={bubbleApplicationContextValue}
        >
          <BubbleTableSettingContext.Provider value={bubbleTableSettingContext}>
            <DetailTable></DetailTable>
          </BubbleTableSettingContext.Provider>
        </BubbleApplicationContext.Provider>
      </CurrentUserContext.Provider>
    </>
  )
}

export default Home
