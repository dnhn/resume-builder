import { IResume } from 'types/resume'
import { ResumeHeading } from 'components/ResumeHeading'
import { ResumeSection } from 'components/ResumeSection'

export const ResumeIntro = ({ resume }: { resume: IResume }) => {
  return (
    <ResumeSection>
      <ResumeHeading as="h3" className="mt-0 mb-2">
        Introduction
      </ResumeHeading>
      <p className="mb-0">{resume.intro}</p>
    </ResumeSection>
  )
}
