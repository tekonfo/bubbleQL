import type { InferGetServerSidePropsType } from 'next'
import React, { createContext, useState, useMemo } from 'react'
import { TableInstance, useTable } from 'react-table'
import DetailTable from './components/pages/detailTable'
import { BubbleRouting } from './routing/routing'
import BubbleService from './services/bubbleService'

export const BubbleTableContext = createContext(
  {} as {
    table: TableInstance<object>
    setTable: React.Dispatch<React.SetStateAction<TableInstance<object>>>
  },
)

export async function getServerSideProps(context: any) {
  const routing = new BubbleRouting()
  const data = await routing.fetcher(routing.route())
  return {
    props: { data }, // will be passed to the page component as props
  }
}

const Home = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const bubbleService = new BubbleService()
  const columnsData = bubbleService.getKeys(data?.results)
  const bodyData = bubbleService.getBody(data?.results)

  const columns = useMemo(() => columnsData, [])
  const resData = useMemo(() => bodyData, [])

  const tableIns: TableInstance<object> = useTable({
    columns,
    data: resData,
  })

  const [table, setTable] = useState(tableIns)
  const value = { table, setTable }
  return (
    <>
      <BubbleTableContext.Provider value={value}>
        <DetailTable></DetailTable>
      </BubbleTableContext.Provider>
    </>
  )
}

export default Home
