import { IResume } from 'types/resume'
import { Box } from 'components/Box'
import { Heading } from 'components/Heading'
import { ResumeExperienceEntry } from './ResumeExperienceEntry'

export const ResumeExperience = ({
  resume: { experience },
}: {
  resume: IResume
}) => {
  return (
    <Box>
      <Heading as="h2">Experience</Heading>
      {experience.map((exp, index) => (
        <ResumeExperienceEntry key={index} data={exp} />
      ))}
    </Box>
  )
}
