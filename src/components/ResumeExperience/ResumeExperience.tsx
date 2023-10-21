import { IResumeExperience } from 'types/resume'
import { ResumeHeading } from 'components/ResumeHeading'
import { ResumeSection } from 'components/ResumeSection'
import { ResumeExperienceEntry } from './ResumeExperienceEntry'

export const ResumeExperience = ({
  experience,
}: {
  experience: IResumeExperience[]
}) => {
  return (
    <ResumeSection>
      <ResumeHeading>Experience</ResumeHeading>
      {experience.map((exp, index) => (
        <ResumeExperienceEntry key={index} data={exp} />
      ))}
    </ResumeSection>
  )
}
