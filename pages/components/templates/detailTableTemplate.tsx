import React, { useContext } from 'react'
import { BubbleTableContext } from '../../index'
import BubbleTable from '../organisms/bubbleTable'
import Footer from '../organisms/footer'
import MetaHead from '../organisms/head'
import Header from '../organisms/header'
import Main from '../organisms/main'

export default function DetailTableTemplate({ posts }: any) {
  const { table, setTable } = useContext(BubbleTableContext)

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    table

  return (
    <div>
      <MetaHead />

      <Header />

      <Main>
        <BubbleTable></BubbleTable>
      </Main>

      <Footer />
    </div>
  )
}
