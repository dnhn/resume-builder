import { IResume } from 'types/resume'
import { ResumeHeading } from 'components/ResumeHeading'
import { ResumeSection } from 'components/ResumeSection'
import { ResumeExperienceEntry } from './ResumeExperienceEntry'

export const ResumeExperience = ({
  resume: { experience },
}: {
  resume: IResume
}) => {
  return (
    <ResumeSection>
      <ResumeHeading as="h3">Experience</ResumeHeading>
      {experience.map((exp, index) => (
        <ResumeExperienceEntry key={index} data={exp} />
      ))}
    </ResumeSection>
  )
}
