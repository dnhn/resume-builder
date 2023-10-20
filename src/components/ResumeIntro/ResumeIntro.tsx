import { IResume } from 'types/resume'
import { ResumeHeading } from 'components/ResumeHeading'
import { ResumeSection } from 'components/ResumeSection'

export const ResumeIntro = ({ resume }: { resume: IResume }) => {
  return (
    <ResumeSection>
      <ResumeHeading className="mt-0 mb-6">Introduction</ResumeHeading>
      <p className="mb-0">{resume.intro}</p>
    </ResumeSection>
  )
}
