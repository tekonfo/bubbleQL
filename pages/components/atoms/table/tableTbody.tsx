import React, { useContext } from 'react'
import { BubbleTableContext } from '../../../../src/store/bubbleTableContext'

export default function TableTbody({
  children,
}: {
  children?: React.ReactNode
}) {
  const { table, setTable } = useContext(BubbleTableContext)

  const { getTableBodyProps, rows, prepareRow } = table

  return (
    <Tbody {...getTableBodyProps()}>
      {rows.map((row, i) => {
        prepareRow(row)
        return (
          // eslint-disable-next-line react/jsx-key
          <tr {...row.getRowProps()}>
            {row.cells.map(cell => {
              // eslint-disable-next-line react/jsx-key
              return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
            })}
          </tr>
        )
      })}
    </Tbody>
  )
}

function Tbody({ children }: { children?: React.ReactNode }) {
  return <tbody>{children}</tbody>
}
