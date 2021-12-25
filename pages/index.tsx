import React, { useState, useEffect } from 'react'
import { listenAuthState } from '../src/auth/auth'
import DetailTable from './components/pages/detailTable'
import { BubbleApplicationContext } from './store/bubbleProjectContext'
import { BubbleTableSettingContext } from './store/bubbleTableSettingContext'
import {
  CurrentUserContext,
  CurrentUserContextType,
} from './store/currentUserContext'

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

  // Create a currentUser state
  const [currentUser, setCurrentUser] = useState<CurrentUserContextType>(null)

  // Listen to onAuthStateChanged
  useEffect(() => {
    listenAuthState(setCurrentUser)
  }, [])

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
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
