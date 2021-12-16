import React from 'react'
import BubbleTable from '../organisms/bubbleTable'
import Footer from '../organisms/footer'
import MetaHead from '../organisms/head'
import Header from '../organisms/header'
import Main from '../organisms/main'

export default function DetailTableTemplate({ posts }: any) {
  return (
    <div>
      <MetaHead />

      <Header />

      <Main>
        <BubbleTable></BubbleTable>
      </Main>

      <Footer />
    </div>
  )
}
