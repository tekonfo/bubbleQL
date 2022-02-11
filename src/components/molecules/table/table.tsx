import React, { useContext } from 'react'
import { BubbleTableContext } from '../../../store/bubbleTableContext'
import TableTbody from '../../atoms/table/tableTbody'
import TableThead from '../../atoms/table/tableThead'

export default function Table({ children }: { children?: React.ReactNode }) {
  const { table } = useContext(BubbleTableContext)
  // ちょっとよくわからなくなってきた
  const { isFetchError } = useContext(IsFetchErrorContext)

  const { getTableProps } = table

  return (
    <table {...getTableProps()}>
      <TableThead />
      <TableTbody />
    </table>
  )
}
