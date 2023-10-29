import { kv } from '@vercel/kv'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const key = `session:${request.query.username}`

  if (request.method === 'PUT' && request.body.accessToken) {
    try {
      await kv.set(key, request.body.accessToken)

      return response.status(200).json({})
    } catch {
      return response.status(500).json({})
    }
  }

  if (request.method === 'POST' && request.body.accessToken) {
    const token = await kv.get(key)

    return token === request.body.accessToken
      ? response.status(200).json({})
      : response.status(400).json({})
  }

  if (request.method === 'DELETE') {
    try {
      await kv.del(key)

      return response.status(200).json({})
    } catch {
      return response.status(500).json({})
    }
  }
}
