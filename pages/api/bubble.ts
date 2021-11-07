// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const repoUrl = "https://api.github.com/repos/deatiger/next-tutorial-torasemi/contents/posts"
  const response = await fetch(repoUrl)
  const data: any = await response.json()
  const animeNames = data.message

  res.status(200).json({name: animeNames})
}
