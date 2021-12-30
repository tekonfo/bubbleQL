import Head from 'next/head'

export default function MetaHead() {
  return (
    <Head>
      <title>BubbleQL</title>
      <meta
        name="description"
        content="This is a db client of Bubble like Airtable"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}
