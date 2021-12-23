import got from 'got'
import type { NextApiRequest, NextApiResponse } from 'next'
import { BubbleBasicData } from '../model/bubbleBasicData'
import Bubble from './model/bubble/Bubble'
import BubbleResponse from './model/bubble/dataResponse'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BubbleBasicData>,
) {
  const { appName, apiToken, tableName, isTestMode } = req.query

  if (appName instanceof Array<string>){

  }
  const bubble = new Bubble(appName, apiToken, isTestMode)
  const studentUrl = bubble.getDataEndpoint(tableName)
  const r = await got.get<any>(studentUrl, {
    responseType: 'json',
  })
  const data = new BubbleResponse(r.body)

  res.status(200).json({ name: data.count.toString(), results: data.results })
}
