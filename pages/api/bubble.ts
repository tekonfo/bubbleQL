import type { NextApiRequest, NextApiResponse } from 'next'
import Bubble from './model/bubble/Bubble'
import BubbleResponse from './model/bubble/dataResponse'

type Data = {
  name: string
  results: object
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const bubble = new Bubble('try-plugin', '', true)
  const studentUrl = bubble.getDataEndpoint('student')
  const response = await fetch(studentUrl)
  const data: any = await response.json()
  const r = new BubbleResponse(data)

  res.status(200).json({ name: r.count.toString(), results: r.results })
}
