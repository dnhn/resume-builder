import { getDbItem, putDbItem } from 'database'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const key = `resume:${request.query.id}`

  if (request.method === 'POST') {
    try {
      await putDbItem(key, request.body)

      return response.status(200).json({ message: 'Résumé has been saved.' })
    } catch {
      return response.status(500).json({ message: 'Failed to save résumé.' })
    }
  }

  try {
    const resume = await getDbItem(key)

    return resume.Item?.data
      ? response.status(200).json(resume.Item.data)
      : response.status(400).json({ message: 'Résumé not found.' })
  } catch {
    return response.status(400).json({ message: 'Résumé not found.' })
  }
}
