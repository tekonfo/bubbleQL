// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import BubbleResponse from '../model/bubble/dataResponse'

type Data = {
  name: string
  results: object
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const repoUrl =
    'https://try-plugin.bubbleapps.io/version-test/api/1.1/obj/student'
  const response = await fetch(repoUrl)
  const data: any = await response.json()
  const r = new BubbleResponse(data)

  res.status(200).json({ name: r.count.toString(), results: r.results })
}
