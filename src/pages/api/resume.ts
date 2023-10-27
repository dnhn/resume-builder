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
      ? response.status(200).json({ message: 'Résumé has been saved.' })
      : response.status(500).json({ message: 'Failed to save résumé.' })
  }
}
