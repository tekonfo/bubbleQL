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
import { BubbleApplicationContext } from '../../../store/bubbleProjectContext'
import { CurrentUserContext } from '../../../store/currentUserContext'

export default function BubbleTableHeaderTitleModal() {
  const router = useRouter()
  const { appId } = router.query
  const { bubbleApplicationContext, setBubbleApplicationContext } = useContext(
    BubbleApplicationContext,
  )
  const user = useContext(CurrentUserContext)
  const [input, setInput] = useState(bubbleApplicationContext)
  const handleSubmit = () => {
    if (typeof appId != 'string') {
      return
    }
    console.log(appId, input)
    setBubbleApplicationContext(user.currentUser?.uid ?? '', appId, {
      ...input,
    })
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
              defaultValue={bubbleApplicationContext.dataApiUrl}
              onChange={evt =>
                setInput({ ...input, dataApiUrl: evt.target.value })
              }
            />
            <TextField
              id="workFlowApiUrl"
              label="workFlowApiUrl"
              variant="standard"
              defaultValue={bubbleApplicationContext.workFlowApiUrl}
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
