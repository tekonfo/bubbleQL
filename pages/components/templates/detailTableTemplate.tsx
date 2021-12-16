import React, { useContext } from 'react'
import { BubbleTable } from '../../index'
import Footer from '../organisms/footer'
import MetaHead from '../organisms/head'
import Header from '../organisms/header'
import Main from '../organisms/main'

export default function DetailTableTemplate({ posts }: any) {
  const { table, setTable } = useContext(BubbleTable)

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    table

  return (
    <div>
      <MetaHead />

      <Header />

      <Main></Main>

      <Footer />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            // eslint-disable-next-line react/jsx-key
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                // eslint-disable-next-line react/jsx-key
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
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
        </tbody>
      </table>
    </div>
  )
}
