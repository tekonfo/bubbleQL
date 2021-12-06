import { useTable, Column } from 'react-table'
import BubbleTable from '../organisms/bubbleTable'
import Footer from '../organisms/footer'
import MetaHead from '../organisms/head'
import Header from '../organisms/header'
import Main from '../organisms/main'

const columns: Column<Data>[] = [
  {
    Header: '名前',
    accessor: 'name',
  },
  {
    Header: '年齢',
    accessor: 'age',
  },
]

interface Data {
  name: string
  age: number
}

const data: Data[] = [
  {
    name: 'John',
    age: 23,
  },
  {
    name: 'Jane',
    age: 26,
  },
]

export default function DetailTableTemplate() {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<Data>({ columns, data })

  return (
    <div>
      <MetaHead />

      <Header />

      <Main>
        <BubbleTable />
      </Main>

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
