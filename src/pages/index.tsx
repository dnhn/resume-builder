import { Card } from 'components/Card'
import { Divider } from 'components/Divider'
import { Heading } from 'components/Heading'
import { Layout } from 'components/Layout'
import { IconSpinner } from 'components/icons/components/IconSpinner'
import { ROUTES } from 'constants/routes'
import { useAuthContext } from 'context/auth'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import { completeQuote } from 'utils/completeChat'

const DashboardPage = () => {
  const { user } = useAuthContext()
  const [quote, setQuote] = useState('')
  const getQuote = useCallback(async () => {
    try {
      const { choices } = await completeQuote()

      setQuote(choices[0].message.content)
    } catch {
      setQuote(' ')
    }
  }, [])

  useEffect(() => {
    getQuote()
  }, [getQuote])

  return (
    <Layout>
      <div className="text-center">
        <Heading as="h3">Hallo, {user}!</Heading>
      </div>

      <Card
        className="mx-auto w-[40rem] max-w-full space-y-8 p-16 text-center shadow-lg"
        spacing={false}
      >
        <div className="space-x-4">
          <Link
            className="inline-block rounded-md border border-transparent bg-gray-500 py-4 px-8 text-white shadow-sm hover:bg-gray-600 focus:ring-gray-400"
            href={ROUTES.BUILD}
          >
            Build your Résumé
          </Link>
          <Link
            className="inline-block rounded-md border border-transparent bg-pink-600 py-4 px-8 text-white shadow-sm hover:bg-pink-700 focus:ring-pink-500"
            href={ROUTES.RESUME}
          >
            View your Résumé
          </Link>
        </div>
        <Divider>Or browse our sample résumés</Divider>
        <div className="space-x-4">
          <Link href={ROUTES.RESUME_BY_ID('dnhn')}>@dnhn</Link>
          <Link href={ROUTES.RESUME_BY_ID('nhan')}>@nhan</Link>
          <Link href={ROUTES.RESUME_BY_ID('nhnd')}>@nhnd</Link>
        </div>
      </Card>
      {quote ? (
        <div className="prose mx-auto w-[24rem] max-w-full text-center font-serif italic">
          <Markdown>{quote}</Markdown>
        </div>
      ) : (
        <div className="flex justify-center">
          <IconSpinner />
        </div>
      )}
    </Layout>
  )
}

export default DashboardPage
