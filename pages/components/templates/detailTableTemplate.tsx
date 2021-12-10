import { useTable, Column } from 'react-table'
import useSWR from 'swr'
import { BubbleBasicData } from '../../api/bubble'
import { BubbleRouting } from '../../api/routing'
import BubbleService from '../../services/bubbleService'
import BubbleTable from '../organisms/bubbleTable'
import Footer from '../organisms/footer'
import MetaHead from '../organisms/head'
import Header from '../organisms/header'
import Main from '../organisms/main'

const columns: any = [
  {
    Header: '名前',
    accessor: 'name',
  },
  {
    Header: '年齢',
    accessor: 'age',
  },
]

const bbbb: any = [
  {
    name: 'John',
    age: 23,
  },
  {
    name: 'Jane',
    age: 26,
  },
]

export async function getServerSideProps(context: any) {
  const routing = new BubbleRouting()
  const res = await fetch('/api/bubble')
  console.log(res)
  // const data = await routing.fetcher(routing.route())
  // const bubbleBasicData = routing.returnBubbleBasicData(data)

  return {
    props: { res }, // will be passed to the page component as props
  }
}

export default function DetailTableTemplate(bubbleBasicData: BubbleBasicData) {
  const bubbleService = new BubbleService()
  const columns = bubbleService.getKeys(bubbleBasicData.results)
  const body = bubbleService.getBody(bubbleBasicData.results)

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: bbbb })

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
