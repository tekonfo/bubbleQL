import React, { createContext } from 'react'
import { TableInstance } from 'react-table'
import DetailTable from './components/pages/detailTable'
import { BubbleApplicationContext } from './store/bubbleProjectContext'

export const BubbleTableContext = createContext(
  {} as {
    table: TableInstance<object>
    setTable: React.Dispatch<React.SetStateAction<TableInstance<object>>>
  },
)

const Home = () => {
  const bubbleApplicationContext = {
    apiToken: 'aaa',
    appName: 'try-plugin',
    workFlowApiUrl: 'ccc',
    dataApiUrl: 'bbb',
    isTestMode: true,
    enableDataTables: [],
  }

  return (
    <>
      <BubbleApplicationContext.Provider value={bubbleApplicationContext}>
        <DetailTable></DetailTable>
      </BubbleApplicationContext.Provider>
    </>
  )
}

export default Home
