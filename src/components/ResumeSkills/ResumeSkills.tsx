import { Badge } from 'components/Badge'
import { ResumeHeading } from 'components/ResumeHeading'
import { ResumeSection } from 'components/ResumeSection'

export const ResumeSkills = ({ skills }: { skills: string[] }) => {
  return (
    <ResumeSection>
      <ResumeHeading>Skills</ResumeHeading>
      <div className="mt-6 flex flex-wrap gap-4">
        {skills.map((skill, index) => (
          <Badge key={index} className="font-semibold">
            {skill}
          </Badge>
        ))}
      </div>
    </ResumeSection>
  )
}
