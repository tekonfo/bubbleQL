import React, { useContext } from 'react'
import { BubbleTableContext } from '../../..'
import TableTbody from '../../atoms/table/tableTbody'
import TableThead from '../../atoms/table/tableThead'
import TableTr from '../../atoms/table/tableTr'

export default function Table({ children }: { children?: React.ReactNode }) {
  const { table } = useContext(BubbleTableContext)

  const { getTableProps } = table

  return (
    <table {...getTableProps()}>
      <TableThead>
        <TableTr></TableTr>
      </TableThead>
      <TableTbody></TableTbody>
    </table>
  )
}
