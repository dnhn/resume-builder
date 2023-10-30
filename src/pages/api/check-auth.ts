import { deleteDbItem, getDbItem, putDbItem } from 'database'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const key = `session:${request.query.username}`

  if (request.method === 'PUT' && request.body.accessToken) {
    try {
      await putDbItem(key, request.body.accessToken)
      response.setHeader('Set-Cookie', [
        `accessToken=${request.body.accessToken}; Path=/; HttpOnly; Secure`,
        `user=${request.query.username}; Path=/; HttpOnly; Secure`,
      ])

      return response.status(200).json({})
    } catch {
      return response.status(500).json({})
    }
  }

  if (request.method === 'POST' && request.body.accessToken) {
    const token = await getDbItem(key)

    return token.Item?.data === request.body.accessToken
      ? response.status(200).json({})
      : response.status(400).json({})
  }

  if (request.method === 'DELETE') {
    try {
      await deleteDbItem(key)
      response.setHeader('Set-Cookie', [
        'accessToken=; Path=/; HttpOnly; Secure; Max-Age=0',
        'user=; Path=/; HttpOnly; Secure; Max-Age=0',
      ])

      return response.status(200).json({})
    } catch {
      return response.status(500).json({})
    }
  }
}
