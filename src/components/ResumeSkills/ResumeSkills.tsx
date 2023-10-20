import { IResume } from 'types/resume'
import { Badge } from 'components/Badge'
import { ResumeHeading } from 'components/ResumeHeading'
import { ResumeSection } from 'components/ResumeSection'

export const ResumeSkills = ({ resume: { skills } }: { resume: IResume }) => {
  return skills && skills.length ? (
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
  ) : null
}
