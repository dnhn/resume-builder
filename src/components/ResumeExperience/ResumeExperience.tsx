import { IResume } from 'types/resume'
import { Box } from 'components/Box'
import { ResumeHeading } from 'components/ResumeHeading'
import { ResumeExperienceEntry } from './ResumeExperienceEntry'

export const ResumeExperience = ({
  resume: { experience },
}: {
  resume: IResume
}) => {
  return (
    <Box>
      <ResumeHeading as="h3">Experience</ResumeHeading>
      {experience.map((exp, index) => (
        <ResumeExperienceEntry key={index} data={exp} />
      ))}
    </Box>
  )
}
