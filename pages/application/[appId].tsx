import React, { useState, useEffect } from 'react'
import { listenAuthState } from '../../src/auth/auth'
import DetailTable from '../components/pages/detailTable'
import {
  BubbleApplicationContext,
  BubbleApplicationType,
} from '../store/bubbleProjectContext'
import { BubbleTableSettingContext } from '../store/bubbleTableSettingContext'
import {
  CurrentUserContext,
  CurrentUserType,
} from '../store/currentUserContext'

const Home = () => {
  // TODO: これは外部から設定できるようにする
  // TODO: これはlocalStorageから引っ張る形にする
  const [bubbleApplicationContext, setBubbleApplicationContext] =
    useState<BubbleApplicationType>({
      apiToken: 'aaa',
      appName: 'try-plugin',
      workFlowApiUrl: 'ccc',
      dataApiUrl: 'bbb',
      isTestMode: true,
      enableDataTables: [],
    })

  const bubbleApplicationContextValue = {
    bubbleApplicationContext,
    setBubbleApplicationContext,
  }

  const bubbleTableSettingContext = { tableName: 'student' }

  const [currentUser, setCurrentUser] = useState<CurrentUserType>(null)
  useEffect(() => {
    listenAuthState(setCurrentUser)
  }, [])
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
