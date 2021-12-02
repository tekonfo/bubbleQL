import got from 'got'
import type { NextApiRequest, NextApiResponse } from 'next'
import Bubble from './model/bubble/Bubble'
import BubbleResponse from './model/bubble/dataResponse'
export class BubbleBasicData {
  name: string
  results: Array<Map<any, any>>
  constructor(obj: any) {
    this.name = obj.name
    // TODO: これリファクタしないとなぁ
    const objectToMap = (
      object: { [s: string]: unknown } | ArrayLike<unknown>,
    ) => Object.entries(object).reduce((l, [k, v]) => l.set(k, v), new Map())
    this.results = obj.results.map(
      (x: ArrayLike<unknown> | { [s: string]: unknown }) => objectToMap(x),
    )
  }
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
