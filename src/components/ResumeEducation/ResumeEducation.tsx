import { IResume } from 'types/resume'
import { Box } from 'components/Box'
import { Heading } from 'components/Heading'
import { ResumeEducationEntry } from './ResumeEducationEntry'

export const ResumeEducation = ({
  resume: { education },
}: {
  resume: IResume
}) => {
  return education.length ? (
    <Box>
      <Heading as="h2">Education</Heading>
      {education.map((edu, index) => (
        <ResumeEducationEntry key={index} data={edu} />
      ))}
    </Box>
  ) : null
}
