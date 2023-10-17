import { IResume } from 'types/resume'
import { Box } from 'components/Box'
import { ResumeExperienceEntry } from './ResumeExperienceEntry'

export const ResumeExperience = ({
  resume: { experience },
}: {
  resume: IResume
}) => {
  return (
    <Box>
      <h3 className="text-gray-900 text-2xl font-bold uppercase">Experience</h3>
      {experience.map((exp, index) => (
        <ResumeExperienceEntry key={index} data={exp} />
      ))}
    </Box>
  )
}
