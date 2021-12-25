import React from 'react'
import DetailTable from './components/pages/detailTable'
import { BubbleApplicationContext } from './store/bubbleProjectContext'
import { BubbleTableSettingContext } from './store/bubbleTableSettingContext'

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

  return (
    <>
      <BubbleApplicationContext.Provider value={bubbleApplicationContext}>
        <BubbleTableSettingContext.Provider value={bubbleTableSettingContext}>
          <DetailTable></DetailTable>
        </BubbleTableSettingContext.Provider>
      </BubbleApplicationContext.Provider>
    </>
  )
}

export default Home
