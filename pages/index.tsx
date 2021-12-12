import type { NextPage } from 'next'
import useSWR from 'swr'
import DetailTable from './components/pages/detailTable'
import { BubbleRouting } from './routing/routing'

async function getData() {
  const routing = new BubbleRouting()
  const res = await routing.fetcher(routing.route())
}

const Home: NextPage = () => {
  const routing = new BubbleRouting()
  const { data, error } = useSWR(routing.route(), routing.fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <>
      {/* <DetailTable></DetailTable> */}
      <button onClick={getData}>test</button>
      <button onClick={getData}>{data.name}</button>
    </>
  )
}

export default Home
