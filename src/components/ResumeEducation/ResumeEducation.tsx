import { IResume } from 'types/resume'
import { ResumeHeading } from 'components/ResumeHeading'
import { ResumeSection } from 'components/ResumeSection'
import { ResumeEducationEntry } from './ResumeEducationEntry'

export const ResumeEducation = ({
  resume: { education },
}: {
  resume: IResume
}) => {
  return education && education.length ? (
    <ResumeSection>
      <ResumeHeading as="h3">Education</ResumeHeading>
      {education.map((edu, index) => (
        <ResumeEducationEntry key={index} data={edu} />
      ))}
    </ResumeSection>
  ) : null
}
