import type { NextPage } from 'next'
import DetailTable from './components/pages/detailTable'

export async function getServerSideProps() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
  const posts = await res.json()
  console.log(posts)
  return { props: { posts } }
}

const Home: NextPage = () => {
  return <DetailTable></DetailTable>
}

export default Home
