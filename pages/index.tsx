import React, { useState, useEffect } from 'react'
import { listenAuthState } from '../src/auth/auth'
import DetailTable from './components/pages/detailTable'
import { BubbleApplicationContext } from './store/bubbleProjectContext'
import { BubbleTableSettingContext } from './store/bubbleTableSettingContext'
import { CurrentUserContext, CurrentUserType } from './store/currentUserContext'

const Home = () => {
  // TODO: これは外部から設定できるようにする
  // TODO: これはlocalStorageから引っ張る形にする
  const bubbleApplicationContext = {
    apiToken: 'aaa',
    appName: 'try-plugin',
    workFlowApiUrl: 'ccc',
    dataApiUrl: 'bbb',
    isTestMode: true,
    enableDataTables: [],
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
        <BubbleApplicationContext.Provider value={bubbleApplicationContext}>
          <BubbleTableSettingContext.Provider value={bubbleTableSettingContext}>
            <DetailTable></DetailTable>
          </BubbleTableSettingContext.Provider>
        </BubbleApplicationContext.Provider>
      </CurrentUserContext.Provider>
    </>
  )
}

export default Home
