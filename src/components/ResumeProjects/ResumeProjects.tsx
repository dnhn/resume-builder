import { IResume } from 'types/resume'
import { Box } from 'components/Box'
import { ResumeProjectsEntry } from './ResumeProjectsEntry'

export const ResumeProjects = ({
  resume: { projects },
}: {
  resume: IResume
}) => {
  return projects && projects.length ? (
    <Box>
      <h3 className="text-gray-900 text-2xl font-bold uppercase">Projects</h3>
      {projects.map((project, index) => (
        <ResumeProjectsEntry key={index} data={project} />
      ))}
    </Box>
  ) : null
}
