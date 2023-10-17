import { IResume } from 'types/resume'
import { Box } from 'components/Box'
import { ResumeEducationEntry } from './ResumeEducationEntry'

export const ResumeEducation = ({
  resume: { education },
}: {
  resume: IResume
}) => {
  return education && education.length ? (
    <Box>
      <h3 className="text-gray-900 text-2xl font-bold uppercase">Education</h3>
      {education.map((edu, index) => (
        <ResumeEducationEntry key={index} data={edu} />
      ))}
    </Box>
  ) : null
}
