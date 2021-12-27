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
  const bubbleApplicationContext = useContext(BubbleApplicationContext)
  const [input, setInput] = useState(bubbleApplicationContext)
  const handleInput = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newValue = evt.target.value
    const id = evt.target.id
    console.log(newValue, id)
    //TODO: これが更新されない
    setInput({ ...input, [id]: newValue })
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
            onChange={evt => handleInput(evt)}
          />
          <TextField
            id="appName"
            label="appName"
            variant="standard"
            defaultValue={input.appName}
          />
          <TextField
            id="dataApiUrl"
            label="dataApiUrl"
            variant="standard"
            defaultValue={bubbleApplicationContext.dataApiUrl}
          />
          <TextField
            id="isTestMode"
            label="isTestMode"
            variant="standard"
            defaultValue={bubbleApplicationContext.isTestMode}
          />
          <TextField
            id="workFlowApiUrl"
            label="workFlowApiUrl"
            variant="standard"
            defaultValue={bubbleApplicationContext.workFlowApiUrl}
          />
          <TextField
            id="enableDataTables"
            label="enableDataTables"
            variant="standard"
          />
        </CardContent>

        <CardActions>
          <Button>設定を保存する</Button>
        </CardActions>
      </Card>
    </>
  )
}
