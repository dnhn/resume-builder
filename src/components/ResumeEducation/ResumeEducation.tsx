import { IResume } from 'types/resume'
import { Box } from 'components/Box'
import { ResumeHeading } from 'components/ResumeHeading'
import { ResumeEducationEntry } from './ResumeEducationEntry'

export const ResumeEducation = ({
  resume: { education },
}: {
  resume: IResume
}) => {
  return education && education.length ? (
    <Box>
      <ResumeHeading as="h3">Education</ResumeHeading>
      {education.map((edu, index) => (
        <ResumeEducationEntry key={index} data={edu} />
      ))}
    </Box>
  ) : null
}
