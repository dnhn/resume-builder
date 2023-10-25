import axios from 'axios'
import { useAuthContext } from 'context/auth'
import { Button } from 'components/Button'
import { Card } from 'components/Card'
import { Divider } from 'components/Divider'
import { Heading } from 'components/Heading'
import { Layout } from 'components/Layout'
import { ResumeEducation } from 'components/ResumeEducation'
import { ResumeExperience } from 'components/ResumeExperience'
import {
  EducationForm,
  ExperienceForm,
  InfoForm,
  IntroForm,
  LanguagesForm,
  ProjectsForm,
  SkillsForm,
} from 'components/ResumeForm'
import { ResumeInfo } from 'components/ResumeInfo'
import { ResumeIntro } from 'components/ResumeIntro'
import { ResumeLanguages } from 'components/ResumeLanguages'
import { ResumeProjects } from 'components/ResumeProjects'
import { ResumeSkills } from 'components/ResumeSkills'
import { IconCheckCircleSolid } from 'components/icons/components/IconCheckCircleSolid'
import { IconPencilSolid } from 'components/icons/components/IconPencilSolid'
import { useCallback, useEffect, useState } from 'react'
import { API_ROUTES } from 'constants/routes'
import useSWR from 'swr'
import {
  IResume,
  IResumeEducation,
  IResumeExperience,
  IResumeInfo,
  IResumeLanguage,
  IResumeProject,
} from 'types/resume'
import { toast } from 'components/Toast'
import Head from 'next/head'

const initialData = {
  info: { name: '' },
  intro: '',
  experience: [],
  projects: [],
  education: [],
  skills: [],
  languages: [],
}

const fetcher = (url: string) =>
  axios.get(url).then((response) => response.data)

const BuildPage = () => {
  const { user } = useAuthContext()
  const { data: apiData, mutate } = useSWR<IResume>(
    API_ROUTES.GET_RESUME(user),
    fetcher,
  )
  const [data, setData] = useState<IResume>(initialData)
  const [edit, setEdit] = useState({
    info: false,
    skills: false,
    languages: false,
    intro: false,
    experience: false,
    projects: false,
    education: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (apiData) {
      setData(apiData)
    }
  }, [apiData])

  const setInfo = (info: IResumeInfo) => setData((data) => ({ ...data, info }))
  const setSkills = (skills: string[]) =>
    setData((data) => ({ ...data, skills }))
  const setLanguages = (languages: IResumeLanguage[]) =>
    setData((data) => ({ ...data, languages }))
  const setIntro = (intro: string) => setData((data) => ({ ...data, intro }))
  const setExperience = (experience: IResumeExperience[]) =>
    setData((data) => ({ ...data, experience }))
  const setProjects = (projects: IResumeProject[]) =>
    setData((data) => ({ ...data, projects }))
  const setEducation = (education: IResumeEducation[]) =>
    setData((data) => ({ ...data, education }))

  const isValid = data.info.name && data.intro && data.experience.length

  const handleSubmit = useCallback(async () => {
    if (isValid) {
      try {
        setIsSubmitting(true)
        await axios.post(API_ROUTES.UPDATE_RESUME(user), {
          info: data.info,
          skills: data.skills,
          languages: data.languages,
          intro: data.intro,
          experience: data.experience,
          projects: data.projects,
          education: data.education,
        })
        mutate()
        toast.success({
          title: 'Success!',
          message: 'Résumé has been saved.',
        })
      } catch (error) {
        toast.error({
          title: 'Error!',
          message: 'Failed to save résumé.',
        })
      } finally {
        setIsSubmitting(false)
      }
    }
  }, [data, isValid, mutate, user])

  return (
    <Layout>
      <Head>
        <title>Build your Résumé</title>
      </Head>
      <Heading as="h2" className="text-center">
        Build your Résumé
      </Heading>

      <div className="prose prose-sm max-w-none grid-cols-3 rounded-none bg-neutral-50 shadow-md prose-p:font-serif prose-a:font-sans prose-a:underline-offset-2 lg:grid">
        <div className="col-span-1 bg-slate-600 p-8 text-gray-100 prose-headings:text-white prose-a:text-white lg:p-12">
          {edit.info ? (
            <Card>
              <InfoForm
                data={data.info}
                handleSave={setInfo}
                onComplete={() => setEdit((edit) => ({ ...edit, info: false }))}
              />
            </Card>
          ) : (
            <div className="relative">
              <ResumeInfo info={data.info} />
              <span className="absolute top-0 right-0">
                <Button
                  size="sm"
                  type="button"
                  onClick={() =>
                    setEdit((edit) => ({ ...edit, info: !edit.info }))
                  }
                >
                  <IconPencilSolid />
                </Button>
              </span>
            </div>
          )}
          <Divider />
          {edit.skills ? (
            <Card>
              <SkillsForm
                data={data.skills}
                handleSave={setSkills}
                onComplete={() =>
                  setEdit((edit) => ({ ...edit, skills: false }))
                }
              />
            </Card>
          ) : (
            <div className="relative">
              <ResumeSkills skills={data.skills} />
              <span className="absolute top-0 right-0">
                <Button
                  size="sm"
                  type="button"
                  onClick={() =>
                    setEdit((edit) => ({ ...edit, skills: !edit.skills }))
                  }
                >
                  <IconPencilSolid />
                </Button>
              </span>
            </div>
          )}
          <Divider />
          {edit.languages ? (
            <Card>
              <LanguagesForm
                data={data.languages}
                handleSave={setLanguages}
                onComplete={() =>
                  setEdit((edit) => ({ ...edit, languages: false }))
                }
              />
            </Card>
          ) : (
            <div className="relative">
              <ResumeLanguages languages={data.languages} />
              <span className="absolute top-0 right-0">
                <Button
                  size="sm"
                  type="button"
                  onClick={() =>
                    setEdit((edit) => ({ ...edit, languages: !edit.languages }))
                  }
                >
                  <IconPencilSolid />
                </Button>
              </span>
            </div>
          )}
        </div>
        <div className="-order-1 col-span-2 p-8 lg:p-12">
          <div className="text-right">
            <Button
              Icon={IconCheckCircleSolid}
              appearance="primary"
              disabled={!isValid}
              loading={isSubmitting}
              size="lg"
              type="button"
              onClick={handleSubmit}
            >
              Save
            </Button>
          </div>
          <Divider />
          {edit.intro ? (
            <IntroForm
              data={data}
              handleSave={setIntro}
              onComplete={() => setEdit((edit) => ({ ...edit, intro: false }))}
            />
          ) : (
            <div className="relative">
              <ResumeIntro intro={data.intro} />
              <span className="absolute top-0 right-0">
                <Button
                  appearance="secondary"
                  size="sm"
                  type="button"
                  onClick={() =>
                    setEdit((edit) => ({ ...edit, intro: !edit.intro }))
                  }
                >
                  <IconPencilSolid />
                </Button>
              </span>
            </div>
          )}
          <Divider />
          {edit.experience ? (
            <ExperienceForm
              data={data.experience}
              handleSave={setExperience}
              onComplete={() =>
                setEdit((edit) => ({ ...edit, experience: false }))
              }
            />
          ) : (
            <div className="relative">
              <ResumeExperience experience={data.experience} />
              <span className="absolute top-0 right-0">
                <Button
                  appearance="secondary"
                  size="sm"
                  type="button"
                  onClick={() =>
                    setEdit((edit) => ({
                      ...edit,
                      experience: !edit.experience,
                    }))
                  }
                >
                  <IconPencilSolid />
                </Button>
              </span>
            </div>
          )}
          <Divider />
          {edit.projects ? (
            <ProjectsForm
              data={data.projects}
              handleSave={setProjects}
              onComplete={() =>
                setEdit((edit) => ({ ...edit, projects: false }))
              }
            />
          ) : (
            <div className="relative">
              <ResumeProjects projects={data.projects} />
              <span className="absolute top-0 right-0">
                <Button
                  appearance="secondary"
                  size="sm"
                  type="button"
                  onClick={() =>
                    setEdit((edit) => ({ ...edit, projects: !edit.projects }))
                  }
                >
                  <IconPencilSolid />
                </Button>
              </span>
            </div>
          )}
          <Divider />
          {edit.education ? (
            <EducationForm
              data={data.education}
              handleSave={setEducation}
              onComplete={() =>
                setEdit((edit) => ({ ...edit, education: false }))
              }
            />
          ) : (
            <div className="relative">
              <ResumeEducation education={data.education} />
              <span className="absolute top-0 right-0">
                <Button
                  appearance="secondary"
                  size="sm"
                  type="button"
                  onClick={() =>
                    setEdit((edit) => ({ ...edit, education: !edit.education }))
                  }
                >
                  <IconPencilSolid />
                </Button>
              </span>
            </div>
          )}
          <Divider />
          <div className="text-right">
            <Button
              Icon={IconCheckCircleSolid}
              appearance="primary"
              disabled={!isValid}
              loading={isSubmitting}
              size="lg"
              type="button"
              onClick={handleSubmit}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default BuildPage
