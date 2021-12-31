import got from 'got'
import type { NextApiRequest, NextApiResponse } from 'next'
import { BubbleBasicData } from '../../src/model/bubbleBasicData'
import Bubble from './model/bubble/Bubble'
import BubbleResponse from './model/bubble/dataResponse'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BubbleBasicData>,
) {
  const { appName, apiToken, tableName, isTestMode } = req.query

  if (
    typeof appName !== 'string' ||
    typeof apiToken !== 'string' ||
    typeof Boolean(isTestMode) !== 'boolean' ||
    typeof tableName !== 'string'
  ) {
    res.status(400).json({ name: 'error', results: [] })
    return
  }

  if (appName === '' || apiToken === '' || tableName === '') {
    res.status(400).json({ name: 'パラメータが空文字です', results: [] })
    return
  }

  const bubble = new Bubble(appName, apiToken, Boolean(isTestMode))
  const studentUrl = bubble.getDataEndpoint(tableName)
  const r = await got.get<any>(studentUrl, {
    responseType: 'json',
  })
  const data = new BubbleResponse(r.body)

  res.status(200).json({ name: data.count.toString(), results: data.results })
}
