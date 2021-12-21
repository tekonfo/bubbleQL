import React, { useContext } from 'react'
import { BubbleTableContext } from '../../..'

export default function TableTr({ children }: { children?: React.ReactNode }) {
  const { table } = useContext(BubbleTableContext)

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    table

  return <Tr></Tr>
}

function Tr({ children }: { children?: React.ReactNode }) {
  return <tr>{children}</tr>
}
