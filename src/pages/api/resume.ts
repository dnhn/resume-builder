import { kv } from '@vercel/kv'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const key = `resume:${request.query.id}`

  if (request.method === 'POST') {
    const result = await kv.set(key, request.body)

    return result === 'OK'
      ? response.status(200).json({ message: 'Résumé has been saved.' })
      : response.status(500).json({ message: 'Failed to save résumé.' })
  }

  const resume = await kv.get(key)

  return resume
    ? response.status(200).json(resume)
    : response.status(400).json({ message: 'Résumé not found.' })
}
