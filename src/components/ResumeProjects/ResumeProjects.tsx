import { IResume } from 'types/resume'
import { ResumeHeading } from 'components/ResumeHeading'
import { ResumeSection } from 'components/ResumeSection'
import { ResumeProjectsEntry } from './ResumeProjectsEntry'

export const ResumeProjects = ({
  resume: { projects },
}: {
  resume: IResume
}) => {
  return projects && projects.length ? (
    <ResumeSection>
      <ResumeHeading as="h3">Projects</ResumeHeading>
      {projects.map((project, index) => (
        <ResumeProjectsEntry key={index} data={project} />
      ))}
    </ResumeSection>
  ) : null
}
