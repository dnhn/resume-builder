import { IResume } from 'types/resume'
import { Layout } from 'components/Layout'
import { ResumeIntro } from 'components/ResumeIntro'
import { ResumeExperience } from 'components/ResumeExperience'
import { ResumeEducation } from 'components/ResumeEducation'
import { ResumeSkills } from 'components/ResumeSkills'
import { ResumeProjects } from 'components/ResumeProjects'
import { ResumeLanguages } from 'components/ResumeLanguages'

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
        startDate: new Date('2020-01-01'),
        description: `Nobis eum provident reprehenderit, quasi nesciunt aperiam natus quis eaque unde saepe aliquam nulla. Eos neque fugit officia assumenda repellendus exercitationem sed.
- list item 1
- list item 2
- list item 3`,
      },
    ],
    projects: [
      {
        name: 'DF Front-end 2023',
        link: 'https://github.com/dwarvesf/df-frontend-2023',
        description: `Welcome to the Frontend Training 2023 repository! This is where you'll find exercises and templates meant to guide you through 8 training sessions on frontend development organized by Dwarves Foundation.`,
      },
      {
        name: 'Next.js Boilerplate',
        link: 'https://github.com/dwarvesf/nextjs-boilerplate',
        description: `An opinionated production-ready frontend boilerplate built on top of NextJS, shipped with:
- TypeScript
- SWR
- TailwindCSS
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
        startDate: new Date('2016-08-01'),
        endDate: new Date('2020-10-01'),
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
      <section className="bg-white rounded-none shadow p-12 max-w-none prose prose-sm prose-p:[font-family:var(--font-libre-baskerville)] prose-a:underline-offset-2">
        <ResumeIntro resume={data} />
        <ResumeExperience resume={data} />
        <ResumeProjects resume={data} />
        <ResumeEducation resume={data} />
        <ResumeSkills resume={data} />
        <ResumeLanguages resume={data} />
      </section>
    </Layout>
  )
}
