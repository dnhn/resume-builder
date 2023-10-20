import { ResumeHeading } from 'components/ResumeHeading'
import { ResumeSection } from 'components/ResumeSection'

export const ResumeIntro = ({ intro }: { intro: string }) => {
  return (
    <ResumeSection>
      <ResumeHeading className="mt-0 mb-6">Introduction</ResumeHeading>
      <p className="mb-0">{intro}</p>
    </ResumeSection>
  )
}
