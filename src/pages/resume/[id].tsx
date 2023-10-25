import axios from 'axios'
import { Card } from 'components/Card'
import { Divider } from 'components/Divider'
import { Heading } from 'components/Heading'
import { Layout } from 'components/Layout'
import { ResumeEducation } from 'components/ResumeEducation'
import { ResumeExperience } from 'components/ResumeExperience'
import { ResumeInfo } from 'components/ResumeInfo'
import { ResumeIntro } from 'components/ResumeIntro'
import { ResumeLanguages } from 'components/ResumeLanguages'
import { ResumeProjects } from 'components/ResumeProjects'
import { ResumeSkills } from 'components/ResumeSkills'
import { API_ROUTES, ROUTES } from 'constants/routes'
import { useAuthContext } from 'context/auth'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { IResume } from 'types/resume'

const fetcher = (url: string) =>
  axios.get(url).then((response) => response.data)

export default function ResumePage() {
  const { query } = useRouter()
  const { isLogin, user } = useAuthContext()
  const { data, error, isLoading } = useSWR<IResume>(
    API_ROUTES.GET_RESUME(query.id as string),
    fetcher,
  )

  return (
    <Layout>
      <Head>
        <title>
          {data?.info.name
            ? `${data.info.name} | Résumé Builder`
            : 'Résumé Builder'}
        </title>
      </Head>
      <div className="prose prose-sm max-w-none grid-cols-3 rounded-none bg-neutral-50 shadow-md prose-p:font-serif prose-a:font-sans prose-a:underline-offset-2 lg:grid">
        {isLoading && (
          <div className="col-span-3 p-12">
            <Heading as="h3" className="m-0 text-center">
              Loading résumé…
            </Heading>
          </div>
        )}
        {data && (
          <>
            <div className="col-span-1 bg-slate-600 p-8 text-gray-100 prose-headings:text-white prose-a:text-white lg:p-12">
              <ResumeInfo info={data.info} />
              {!(data.skills.length === 1 && data.skills.includes('')) && (
                <>
                  <Divider />
                  <ResumeSkills skills={data.skills} />
                </>
              )}
              {!!data.languages.length && (
                <>
                  <Divider />
                  <ResumeLanguages languages={data.languages} />
                </>
              )}
              {!isLogin && (
                <Card className="mt-8 font-semibold text-gray-900 sm:text-base">
                  <Link
                    className="mr-2 inline-block rounded-md border border-transparent bg-pink-600 py-2 px-4 text-xs font-semibold text-white no-underline shadow-sm hover:bg-pink-700 focus:ring-pink-500 sm:py-3 sm:px-5 sm:text-sm"
                    href={ROUTES.LOGIN}
                  >
                    Login
                  </Link>
                  to build your résumé!
                </Card>
              )}
            </div>
            <div className="-order-1 col-span-2 p-8 lg:p-12">
              {data.intro && (
                <>
                  <ResumeIntro intro={data.intro} />
                  <Divider />
                </>
              )}
              <ResumeExperience experience={data.experience} />
              {!!data.projects.length && (
                <>
                  <Divider />
                  <ResumeProjects projects={data.projects} />
                </>
              )}
              {!!data.education.length && (
                <>
                  <Divider />
                  <ResumeEducation education={data.education} />
                </>
              )}
            </div>
          </>
        )}
        {!isLoading && error && (
          <div className="col-span-3 p-12">
            <Heading as="h3" className="m-0 text-center">
              {query.id === user
                ? 'Your résumé is currently empty, please add more content to view this page.'
                : 'Résumé not found.'}
            </Heading>
          </div>
        )}
      </div>
    </Layout>
  )
}
