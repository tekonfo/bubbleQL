import {
  TextField,
  Card,
  CardContent,
  CardActions,
  Button,
  List,
  Box,
} from '@mui/material'
import { useRouter } from 'next/dist/client/router'
import React, { useContext, useState } from 'react'
import {
  BubbleApplicationContext,
  BubbleApplicationType,
} from '../../../store/bubbleProjectContext'
import { CurrentUserContext } from '../../../store/currentUserContext'

export default function BubbleTableHeaderTitleModal(props: {
  appId?: string
  bubbleApplication: BubbleApplicationType
  setBubbleApplication: (
    uid: string,
    value: BubbleApplicationType,
    appId?: string,
  ) => void
}) {
  const { appId, bubbleApplication, setBubbleApplication } = props
  const user = useContext(CurrentUserContext)
  const [input, setInput] = useState(bubbleApplication)

  const handleSubmit = () => {
    setBubbleApplication(
      user.currentUser?.uid ?? '',
      {
        ...input,
      },
      appId,
    )
  }

  return (
    <>
      <Card>
        <CardContent>
          アプリケーション情報
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              flexDirection: 'column',
              p: 1,
              m: 1,
            }}
          >
            <TextField
              id="apiToken"
              label="apiToken"
              variant="standard"
              defaultValue={input.apiToken}
              onChange={evt =>
                setInput({ ...input, apiToken: evt.target.value })
              }
            />
            <TextField
              id="appName"
              label="appName"
              variant="standard"
              defaultValue={input.appName}
              onChange={evt =>
                setInput({ ...input, appName: evt.target.value })
              }
            />
            <TextField
              id="dataApiUrl"
              label="dataApiUrl"
              variant="standard"
              defaultValue={input.dataApiUrl}
              onChange={evt =>
                setInput({ ...input, dataApiUrl: evt.target.value })
              }
            />
            <TextField
              id="workFlowApiUrl"
              label="workFlowApiUrl"
              variant="standard"
              defaultValue={input.workFlowApiUrl}
              onChange={evt =>
                setInput({ ...input, workFlowApiUrl: evt.target.value })
              }
            />
          </Box>
        </CardContent>

        <CardActions>
          <Button onClick={handleSubmit}>設定を保存する</Button>
        </CardActions>
      </Card>
    </>
  )
}
