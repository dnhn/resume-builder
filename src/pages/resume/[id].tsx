import axios from 'axios'
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
import { API_ROUTES } from 'constants/routes'
import { useAuthContext } from 'context/auth'
import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { IResume } from 'types/resume'

const fetcher = (url: string) =>
  axios.get(url).then((response) => response.data)

export default function ResumePage() {
  const { query } = useRouter()
  const { user } = useAuthContext()
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
          <div className="col-span-10 p-12">
            <Heading as="h3" className="m-0 text-center">
              Loading résumé…
            </Heading>
          </div>
        )}
        {data && (
          <>
            <div className="col-span-1 bg-slate-600 p-8 text-gray-100 prose-headings:text-white prose-a:text-white lg:p-12">
              <ResumeInfo info={data.info} />
              {data.skills.length ? (
                <>
                  <Divider />
                  <ResumeSkills skills={data.skills} />
                </>
              ) : null}
              {data.languages.length ? (
                <>
                  <Divider />
                  <ResumeLanguages languages={data.languages} />
                </>
              ) : null}
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
          <div className="col-span-10 p-12">
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
