import AddIcon from '@mui/icons-material/Add'
import { Fab } from '@mui/material'
import React, { useContext } from 'react'
import { setBubbleApplication } from '../../../repository/model/bubbleApplication'
import { BubbleApplicationType } from '../../../store/bubbleProjectContext'
import { IsRefreshBubbleTableContext } from '../../../store/refreshBubbleTableContext'
import { BubbleApplicationDialog } from '../dialog/bubbleApplicationDialog'

export default function AddApplicationButton() {
  const [open, setOpen] = React.useState(false)
  const { setIsRefreshBubbleTableContextType } = useContext(
    IsRefreshBubbleTableContext,
  )

  const handleClose = (value: string) => {
    setOpen(false)
  }

  // TODO: モバイルでも正しく動くのか確認
  const style = {
    margin: 0,
    top: 'auto',
    right: 50,
    bottom: 50,
    left: 'auto',
    position: 'fixed',
  }

  const newApplication = {
    apiToken: '',
    appName: '',
    workFlowApiUrl: '',
    dataApiUrl: '',
    enableDataTables: [],
    isTestMode: false,
  }

  const setBubbleApplicationData = (
    uid: string,
    data: BubbleApplicationType,
    appId?: string,
  ) => {
    setBubbleApplication(uid, data, appId).then()
    handleClose('')
    setIsRefreshBubbleTableContextType({ isRefreshTable: true })
  }

  return (
    <Fab sx={style} color="primary">
      <AddIcon
        onClick={() => {
          setOpen(true)
        }}
      />
      <BubbleApplicationDialog
        onClose={handleClose}
        open={open}
        bubbleApplication={newApplication}
        setBubbleApplication={setBubbleApplicationData}
      />
    </Fab>
  )
}
