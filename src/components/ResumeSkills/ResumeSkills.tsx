import { IResume } from 'types/resume'
import { Badge } from 'components/Badge'
import { Box } from 'components/Box'
import { ResumeHeading } from 'components/ResumeHeading'

export const ResumeSkills = ({ resume: { skills } }: { resume: IResume }) => {
  return skills && skills.length ? (
    <Box>
      <ResumeHeading as="h3">Skills</ResumeHeading>
      <div className="flex flex-wrap gap-4 mt-6">
        {skills.map((skill, index) => (
          <Badge key={index}>{skill}</Badge>
        ))}
      </div>
    </Box>
  ) : null
}
