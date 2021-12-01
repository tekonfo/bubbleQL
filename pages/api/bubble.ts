import got from 'got'
import type { NextApiRequest, NextApiResponse } from 'next'
import Bubble from './model/bubble/Bubble'
import BubbleResponse from './model/bubble/dataResponse'
export interface BubbleBasicData {
  name: string
  results: Array<Map<string, string>>
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BubbleBasicData>,
) {
  const bubble = new Bubble('try-plugin', '', true)
  const studentUrl = bubble.getDataEndpoint('student')
  const r = await got.get<any>(studentUrl, {
    responseType: 'json',
  })
  const data = new BubbleResponse(r.body)

  res.status(200).json({ name: data.count.toString(), results: data.results })
}
