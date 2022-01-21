import { Dialog } from '@mui/material'
import React, { useContext } from 'react'
import { BubbleApplicationType } from '../../../store/bubbleProjectContext'
import BubbleTableHeaderTitleModal from '../../atoms/bubbleTableHeader/titleModal'

export interface BubbleApplicationDialogProps {
  open: boolean
  onClose: (value: string) => void
  bubbleApplication: BubbleApplicationType
  setBubbleApplication: (
    uid: string,
    data: BubbleApplicationType,
    appId?: string,
  ) => void
  appId?: string
}

export function BubbleApplicationDialog(props: BubbleApplicationDialogProps) {
  const handleClose = () => {
    props.onClose('')
  }
  return (
    <Dialog onClose={handleClose} open={props.open}>
      <BubbleTableHeaderTitleModal
        appId={props.appId}
        bubbleApplication={props.bubbleApplication}
        setBubbleApplication={props.setBubbleApplication}
      />
    </Dialog>
  )
}
