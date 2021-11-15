// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Request from './request/request'

type Data = {
  name: string
  results: object
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.url === undefined) {
    res.status(400)
    return
  }

  const request = new Request(req.url)
  const r = await request.fetch()

  res.status(200).json({ name: r.count.toString(), results: r.results })
}
