import { Button } from 'components/Button'
import { Card } from 'components/Card'
import { Divider } from 'components/Divider'
import { Heading } from 'components/Heading'
import { Layout } from 'components/Layout'
import { ResumeExperience } from 'components/ResumeExperience'
import {
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
import { IconPencilSolid } from 'components/icons/components/IconPencilSolid'
import { useState } from 'react'
import {
  IResumeExperience,
  IResumeInfo,
  IResumeLanguage,
  IResumeProject,
} from 'types/resume'

const FormsPage = () => {
  const [info, setInfo] = useState<IResumeInfo>({ name: '' })
  const [skills, setSkills] = useState<string[]>([])
  const [languages, setLanguages] = useState<IResumeLanguage[]>([])
  const [intro, setIntro] = useState('')
  const [experience, setExperience] = useState<IResumeExperience[]>([])
  const [projects, setProjects] = useState<IResumeProject[]>([])

  const [infoEdit, setInfoEdit] = useState(true)
  const [skillsEdit, setSkillsEdit] = useState(true)
  const [languagesEdit, setLanguagesEdit] = useState(true)
  const [introEdit, setIntroEdit] = useState(true)
  const [experienceEdit, setExperienceEdit] = useState(true)
  const [projectsEdit, setProjectsEdit] = useState(true)

  return (
    <Layout>
      <Heading as="h2" className="text-center uppercase">
        Edit your résumé
      </Heading>

      <div className="prose prose-sm grid max-w-none grid-cols-10 rounded-none bg-neutral-50 shadow-md prose-p:font-serif prose-a:font-sans prose-a:underline-offset-2">
        <div className="col-span-3 bg-slate-600 p-6 text-gray-100 prose-headings:text-white prose-a:text-white xl:p-12">
          {infoEdit ? (
            <Card>
              <InfoForm
                data={info}
                handleSave={setInfo}
                onComplete={() => setInfoEdit(false)}
              />
            </Card>
          ) : (
            <div className="relative">
              <ResumeInfo resume={info} />
              <span className="absolute top-0 right-0">
                <Button
                  size="sm"
                  type="button"
                  onClick={() => setInfoEdit((value) => !value)}
                >
                  <IconPencilSolid />
                </Button>
              </span>
            </div>
          )}
          <Divider />
          {skillsEdit ? (
            <Card>
              <SkillsForm
                data={skills}
                handleSave={setSkills}
                onComplete={() => setSkillsEdit(false)}
              />
            </Card>
          ) : (
            <div className="relative">
              <ResumeSkills skills={skills} />
              <span className="absolute top-0 right-0">
                <Button
                  size="sm"
                  type="button"
                  onClick={() => setSkillsEdit((value) => !value)}
                >
                  <IconPencilSolid />
                </Button>
              </span>
            </div>
          )}
          <Divider />
          {languagesEdit ? (
            <Card>
              <LanguagesForm
                data={languages}
                handleSave={setLanguages}
                onComplete={() => setLanguagesEdit(false)}
              />
            </Card>
          ) : (
            <div className="relative">
              <ResumeLanguages languages={languages} />
              <span className="absolute top-0 right-0">
                <Button
                  size="sm"
                  type="button"
                  onClick={() => setLanguagesEdit((value) => !value)}
                >
                  <IconPencilSolid />
                </Button>
              </span>
            </div>
          )}
        </div>
        <div className="col-span-7 p-6 xl:p-12">
          {introEdit ? (
            <IntroForm
              data={intro}
              handleSave={setIntro}
              onComplete={() => setIntroEdit(false)}
            />
          ) : (
            <div className="relative">
              <ResumeIntro intro={intro} />
              <span className="absolute top-0 right-0">
                <Button
                  appearance="secondary"
                  size="sm"
                  type="button"
                  onClick={() => setIntroEdit((value) => !value)}
                >
                  <IconPencilSolid />
                </Button>
              </span>
            </div>
          )}
          <Divider />
          {experienceEdit ? (
            <ExperienceForm
              data={experience}
              handleSave={setExperience}
              onComplete={() => setExperienceEdit(false)}
            />
          ) : (
            <div className="relative">
              <ResumeExperience experience={experience} />
              <span className="absolute top-0 right-0">
                <Button
                  appearance="secondary"
                  size="sm"
                  type="button"
                  onClick={() => setExperienceEdit((value) => !value)}
                >
                  <IconPencilSolid />
                </Button>
              </span>
            </div>
          )}
          <Divider />
          {projectsEdit ? (
            <ProjectsForm
              data={projects}
              handleSave={setProjects}
              onComplete={() => setProjectsEdit(false)}
            />
          ) : (
            <div className="relative">
              <ResumeProjects projects={projects} />
              <span className="absolute top-0 right-0">
                <Button
                  appearance="secondary"
                  size="sm"
                  type="button"
                  onClick={() => setProjectsEdit((value) => !value)}
                >
                  <IconPencilSolid />
                </Button>
              </span>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default FormsPage
