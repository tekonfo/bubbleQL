import type { NextPage } from 'next'
import useSWR from 'swr'
import DetailTable from './components/pages/detailTable'
import { BubbleRouting } from './routing/routing'

const Home: NextPage = () => {
  return (
    <>
      <DetailTable></DetailTable>
      {/* <button onClick={getData}>test</button>
      <button onClick={getData}>{data.name}</button> */}
    </>
  )
}

export default Home
