import { Card } from 'components/Card'
import { Divider } from 'components/Divider'
import { Layout } from 'components/Layout'
import { ResumeEducation } from 'components/ResumeEducation'
import { ResumeExperience } from 'components/ResumeExperience'
import { ResumeInfo } from 'components/ResumeInfo'
import { ResumeIntro } from 'components/ResumeIntro'
import { ResumeLanguages } from 'components/ResumeLanguages'
import { ResumeProjects } from 'components/ResumeProjects'
import { ResumeSkills } from 'components/ResumeSkills'
import { ROUTES } from 'constants/routes'
import { useAuthContext } from 'context/auth'
import { getDbItem } from 'database'
import { NextApiRequest } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { IResume } from 'types/resume'

export default function ResumePage({ resume }: { resume: IResume }) {
  const { query } = useRouter()
  const { isLogin, user } = useAuthContext()

  return (
    <Layout>
      <Head>
        <title>
          {resume && resume.info.name
            ? `${resume.info.name} | Résumé Builder`
            : 'Résumé Builder'}
        </title>
      </Head>
      <div className="prose prose-sm max-w-none grid-cols-3 rounded-none bg-neutral-50 shadow-md prose-p:font-serif prose-a:font-sans prose-a:underline-offset-2 lg:grid">
        {resume ? (
          <>
            <div className="col-span-1 bg-slate-600 p-6 text-gray-100 prose-headings:text-white prose-a:text-white sm:p-8 lg:p-12">
              <ResumeInfo info={resume.info} />
              {!!resume.skills.length && (
                <>
                  <Divider />
                  <ResumeSkills skills={resume.skills} />
                </>
              )}
              {!!resume.languages.length && (
                <>
                  <Divider />
                  <ResumeLanguages languages={resume.languages} />
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
            <div className="-order-1 col-span-2 p-6 sm:p-8 lg:p-12">
              {resume.intro && (
                <>
                  <ResumeIntro intro={resume.intro} />
                  <Divider />
                </>
              )}
              <ResumeExperience experience={resume.experience} />
              {!!resume.projects.length && (
                <>
                  <Divider />
                  <ResumeProjects projects={resume.projects} />
                </>
              )}
              {!!resume.education.length && (
                <>
                  <Divider />
                  <ResumeEducation education={resume.education} />
                </>
              )}
            </div>
          </>
        ) : (
          <div className="col-span-3 p-12">
            <div className="mx-auto max-w-xl text-center text-3xl font-medium leading-normal">
              {query.id === user
                ? 'Nothing’s here… please add more content to your résumé.'
                : 'Résumé not found.'}
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export const getServerSideProps = async (request: NextApiRequest) => {
  const key = `resume:${request.query.id}`
  const resume = await getDbItem(key)

  return { props: { resume: resume.Item?.data } }
}
