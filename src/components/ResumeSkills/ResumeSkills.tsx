import { IResume } from 'types/resume'
import { Badge } from 'components/Badge'
import { Box } from 'components/Box'

export const ResumeSkills = ({ resume: { skills } }: { resume: IResume }) => {
  return skills && skills.length ? (
    <Box>
      <h3 className="text-gray-900 text-2xl font-bold uppercase">Skills</h3>
      <div className="flex flex-wrap gap-4 mt-6">
        {skills.map((skill, index) => (
          <Badge key={index}>{skill}</Badge>
        ))}
      </div>
    </Box>
  ) : null
}
