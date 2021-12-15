import type { NextPage } from 'next'
import React, { createContext, useState, Dispatch } from 'react'
import DetailTable from './components/pages/detailTable'

export const UserCount = createContext(
  {} as {
    count: number
    setCount: React.Dispatch<React.SetStateAction<number>>
  },
)

const Home: NextPage = () => {
  const [count, setCount] = useState(100)
  const value = { count, setCount }
  return (
    <>
      <UserCount.Provider value={value}>
        <DetailTable></DetailTable>
      </UserCount.Provider>
    </>
  )
}

export default Home
