import { IResume } from 'types/resume'
import { Box } from 'components/Box'
import { Heading } from 'components/Heading'
import { ResumeProjectsEntry } from './ResumeProjectsEntry'

export const ResumeProjects = ({
  resume: { projects },
}: {
  resume: IResume
}) => {
  return projects.length ? (
    <Box>
      <Heading as="h2">Projects</Heading>
      {projects.map((project, index) => (
        <ResumeProjectsEntry key={index} data={project} />
      ))}
    </Box>
  ) : null
}
