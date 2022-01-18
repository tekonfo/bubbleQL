import { Dialog, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { BubbleApplicationContext } from '../../../store/bubbleProjectContext'
import BubbleTableHeaderTitleModal from '../../atoms/bubbleTableHeader/titleModal'

export default function BubbleTableHeaderTitle() {
  const [open, setOpen] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = (value: string) => {
    setOpen(false)
  }

  const { bubbleApplicationContext } = useContext(BubbleApplicationContext)

  return (
    <>
      <div onClick={handleClickOpen}>
        <Typography variant="h6" color="inherit" component="div">
          {bubbleApplicationContext ? bubbleApplicationContext.appName : ''}
        </Typography>
      </div>
      <SimpleDialog open={open} onClose={handleClose} />
    </>
  )
}

export interface SimpleDialogProps {
  open: boolean
  onClose: (value: string) => void
}

function SimpleDialog(props: SimpleDialogProps) {
  const handleClose = () => {
    props.onClose('')
  }
  return (
    <Dialog onClose={handleClose} open={props.open}>
      <BubbleTableHeaderTitleModal />
    </Dialog>
  )
}
