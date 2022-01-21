import { Typography } from '@mui/material'
import React, { useContext } from 'react'
import { BubbleApplicationContext } from '../../../store/bubbleProjectContext'
import { BubbleApplicationDialog } from '../dialog/bubbleApplicationDialog'

export default function BubbleTableHeaderTitle() {
  const [open, setOpen] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = (value: string) => {
    setOpen(false)
  }

  const { bubbleApplicationContext, setBubbleApplicationContext } = useContext(
    BubbleApplicationContext,
  )

  return (
    <>
      <div onClick={handleClickOpen}>
        <Typography variant="h6" color="inherit" component="div">
          {bubbleApplicationContext ? bubbleApplicationContext.appName : ''}
        </Typography>
      </div>
      <BubbleApplicationDialog
        open={open}
        onClose={handleClose}
        bubbleApplication={bubbleApplicationContext}
        setBubbleApplication={setBubbleApplicationContext}
      />
    </>
  )
}
