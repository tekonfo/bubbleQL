import React, { useContext } from 'react'
import { BubbleTableContext } from '../../../index'

export default function TableRow({ children }: { children?: React.ReactNode }) {
  const { table } = useContext(BubbleTableContext)
  const { rows, prepareRow } = table

  return (
    <td>
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
    </td>
  )
}
