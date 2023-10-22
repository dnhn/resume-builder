import { IResume } from 'types/resume'
import { Layout } from 'components/Layout'
import { ResumeInfo } from 'components/ResumeInfo'
import { ResumeIntro } from 'components/ResumeIntro'
import { ResumeExperience } from 'components/ResumeExperience'
import { ResumeEducation } from 'components/ResumeEducation'
import { ResumeSkills } from 'components/ResumeSkills'
import { ResumeProjects } from 'components/ResumeProjects'
import { ResumeLanguages } from 'components/ResumeLanguages'
import { Divider } from 'components/Divider'

export default function Resume() {
  const data: IResume = {
    name: 'The Dwarf',
    title: 'Front-end Developer',
    address: '200 Ba Thang Hai street, ward 12, district 10',
    phoneNumber: '+84909090909',
    email: 'hello@d.foundation',
    website: 'https://d.foundation',
    intro:
      'Explicabo beatae nemo sapiente voluptatum unde vel tempore totam mollitia perferendis, impedit quos ducimus eos excepturi ut deserunt dolor veniam aliquam adipisci. Doloribus sit officia unde blanditiis eius id tempore aspernatur incidunt alias. Suscipit ab, explicabo quis illum vero placeat corrupti maiores eligendi alias.',
    experience: [
      {
        title: 'Front-end Developer',
        company: 'Dwarves Foundation',
        startDate: '2020-01-01',
        description: `Nobis eum provident reprehenderit, quasi nesciunt aperiam natus quis eaque unde saepe aliquam nulla. Eos neque fugit officia assumenda repellendus exercitationem sed.
- list item 1
- list item 2
- list item 3`,
      },
    ],
    projects: [
      {
        name: 'DF Front-end 2023',
        url: 'https://github.com/dwarvesf/df-frontend-2023',
        description: `Welcome to the Frontend Training 2023 repository! This is where you'll find exercises and templates meant to guide you through 8 training sessions on frontend development organized by Dwarves Foundation.`,
      },
      {
        name: 'Next.js Boilerplate',
        url: 'https://github.com/dwarvesf/nextjs-boilerplate',
        description: `An opinionated production-ready frontend boilerplate built on top of Next.js, shipped with:
- TypeScript
- SWR
- Tailwind CSS
- Jest
- testing-library
- Cypress
- Storybook`,
      },
    ],
    education: [
      {
        school: 'University of Science',
        field: 'Computer Science',
        degree: 'Bachelor’s Degree',
        startDate: '2016-08-01',
        endDate: '2020-10-01',
        current: [],
        description: `A fugiat quasi saepe beatae? Eligendi vero consectetur reprehenderit voluptatem aut sed iusto, harum quae soluta temporibus repudiandae consequatur vitae nam obcaecati.
- list item 1
- list item 2
- list item 3`,
      },
    ],
    skills: [
      'HTML',
      'CSS',
      'Tailwind CSS',
      'JavaScript',
      'TypeScript',
      'React.js',
      'Next.js',
    ],
    languages: [
      { name: 'Vietnamese', proficiency: 'native' },
      { name: 'English', proficiency: 'fluent' },
      { name: 'French', proficiency: 'conversational' },
      { name: 'German', proficiency: 'basic' },
    ],
  }

  return (
    <Layout>
      <div className="prose prose-sm grid max-w-none grid-cols-10 rounded-none bg-neutral-50 shadow-md prose-p:font-serif prose-a:font-sans prose-a:underline-offset-2">
        <div className="col-span-3 bg-slate-600 p-12 text-gray-100 prose-headings:text-white prose-a:text-white">
          <ResumeInfo resume={data} />
          <Divider />
          {data.skills && data.skills.length ? (
            <ResumeSkills skills={data.skills} />
          ) : null}
          <Divider />
          {data.languages && data.languages.length ? (
            <ResumeLanguages languages={data.languages} />
          ) : null}
        </div>
        <div className="col-span-7 p-12">
          {data.intro && <ResumeIntro intro={data.intro} />}
          <Divider />
          <ResumeExperience experience={data.experience} />
          <Divider />
          {data.projects && <ResumeProjects projects={data.projects} />}
          <Divider />
          {data.education && <ResumeEducation education={data.education} />}
        </div>
      </div>
    </Layout>
  )
}
