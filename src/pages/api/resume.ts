import { kv } from '@vercel/kv'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === 'POST') {
    const result = await kv.set(
      `resume:${request.query.id as string}`,
      request.body,
    )

    return result === 'OK'
      ? response.status(200).json({ message: 'Résumé is updated.' })
      : response.status(500).json({ message: 'Failed to update résumé.' })
  }

  const resume = await kv.get(`resume:${request.query.id as string}`)

  return resume
    ? response.status(200).json(resume)
    : response.status(400).json({ message: 'Résumé not found.' })
}
