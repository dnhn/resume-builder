import { IResumeProject } from 'types/resume'
import { ResumeHeading } from 'components/ResumeHeading'
import { ResumeSection } from 'components/ResumeSection'
import { ResumeProjectsEntry } from './ResumeProjectsEntry'

export const ResumeProjects = ({
  projects,
}: {
  projects: IResumeProject[]
}) => {
  return (
    <ResumeSection>
      <ResumeHeading>Projects</ResumeHeading>
      {projects.map((project, index) => (
        <ResumeProjectsEntry key={index} data={project} />
      ))}
    </ResumeSection>
  )
}
