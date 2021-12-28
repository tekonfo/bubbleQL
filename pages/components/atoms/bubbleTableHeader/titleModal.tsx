import {
  TextField,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material'
import React, { useContext, useState } from 'react'
import { BubbleApplicationContext } from '../../../store/bubbleProjectContext'

export default function BubbleTableHeaderTitleModal() {
  const { bubbleApplicationContext, setBubbleApplicationContext } = useContext(
    BubbleApplicationContext,
  )
  const [input, setInput] = useState(bubbleApplicationContext)
  const handleSubmit = () => {
    setBubbleApplicationContext({ ...input })
  }

  return (
    <>
      <Card>
        <CardContent>
          アプリケーション情報
          <TextField
            id="apiToken"
            label="apiToken"
            variant="standard"
            defaultValue={input.apiToken}
            onChange={evt => setInput({ ...input, apiToken: evt.target.value })}
          />
          <TextField
            id="appName"
            label="appName"
            variant="standard"
            defaultValue={input.appName}
            onChange={evt => setInput({ ...input, appName: evt.target.value })}
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
        </CardContent>

        <CardActions>
          <Button onClick={handleSubmit}>設定を保存する</Button>
        </CardActions>
      </Card>
    </>
  )
}
