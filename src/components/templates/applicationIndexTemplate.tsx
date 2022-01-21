import AddIcon from '@mui/icons-material/Add'
import { Fab } from '@mui/material'
import React from 'react'
import ApplicationIndex from '../organisms/applicationIndex'
import BubbleTable from '../organisms/bubbleTable'
import Footer from '../organisms/footer'
import MetaHead from '../organisms/head'
import Header from '../organisms/header'
import Main from '../organisms/main'

export default function ApplicationIndexTemplate({ posts }: any) {
  // TODO: モバイルでも正しく動くのか確認
  const style = {
    margin: 0,
    top: 'auto',
    right: 50,
    bottom: 50,
    left: 'auto',
    position: 'fixed',
  }
  return (
    <div>
      <MetaHead />

      <Header />

      <Main>
        <ApplicationIndex />
      </Main>

      <Fab sx={style} color="primary">
        <AddIcon />
      </Fab>

      <Footer />
    </div>
  )
}
