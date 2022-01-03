import React from 'react'
import ApplicationIndex from '../organisms/applicationIndex'
import BubbleTable from '../organisms/bubbleTable'
import Footer from '../organisms/footer'
import MetaHead from '../organisms/head'
import Header from '../organisms/header'
import Main from '../organisms/main'

export default function ApplicationIndexTemplate({ posts }: any) {
  return (
    <div>
      <MetaHead />

      <Header />

      <Main>
        <ApplicationIndex />
      </Main>

      <Footer />
    </div>
  )
}
