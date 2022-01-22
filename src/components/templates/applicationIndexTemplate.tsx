import AddIcon from '@mui/icons-material/Add'
import { Fab } from '@mui/material'
import React from 'react'
import AddApplicationButton from '../molecules/bubbleApplicationIndex/addApplicationButton'
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

      <AddApplicationButton />

      <Footer />
    </div>
  )
}
