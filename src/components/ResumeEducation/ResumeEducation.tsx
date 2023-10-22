import { IResumeEducation } from 'types/resume'
import { ResumeHeading } from 'components/ResumeHeading'
import { ResumeSection } from 'components/ResumeSection'
import { ResumeEducationEntry } from './ResumeEducationEntry'

export const ResumeEducation = ({
  education,
}: {
  education: IResumeEducation[]
}) => {
  return (
    <ResumeSection>
      <ResumeHeading>Education</ResumeHeading>
      {education.map((edu, index) => (
        <ResumeEducationEntry key={index} data={edu} />
      ))}
    </ResumeSection>
  )
}
