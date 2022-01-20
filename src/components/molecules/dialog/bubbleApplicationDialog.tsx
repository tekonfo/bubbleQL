import { Dialog } from '@mui/material'
import React, { useContext } from 'react'
import BubbleTableHeaderTitleModal from '../../atoms/bubbleTableHeader/titleModal'

export interface BubbleApplicationDialogProps {
  open: boolean
  onClose: (value: string) => void
}

export function BubbleApplicationDialog(props: BubbleApplicationDialogProps) {
  const handleClose = () => {
    props.onClose('')
  }
  return (
    <Dialog onClose={handleClose} open={props.open}>
      <BubbleTableHeaderTitleModal />
    </Dialog>
  )
}
