import { IResume } from 'types/resume'
import { Badge } from 'components/Badge'
import { Box } from 'components/Box'
import { Heading } from 'components/Heading'

export const ResumeSkills = ({ resume: { skills } }: { resume: IResume }) => {
  return skills.length ? (
    <Box>
      <Heading as="h2">Skills</Heading>
      <div className="flex flex-wrap gap-4">
        {skills.map((skill, index) => (
          <Badge key={index}>{skill}</Badge>
        ))}
      </div>
    </Box>
  ) : null
}
