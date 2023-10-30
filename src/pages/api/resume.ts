import { getDbItem, putDbItem } from 'database'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const key = `resume:${request.query.id}`

  if (request.method === 'POST') {
    const result = await putDbItem(key, request.body)

    return result.$metadata.httpStatusCode === 200
      ? response.status(200).json({ message: 'Résumé has been saved.' })
      : response.status(500).json({ message: 'Failed to save résumé.' })
  }

  const resume = await getDbItem(key)

  return resume.Item?.data
    ? response.status(200).json(resume.Item.data)
    : response.status(400).json({ message: 'Résumé not found.' })
}
