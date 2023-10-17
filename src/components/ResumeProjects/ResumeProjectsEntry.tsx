import Link from 'next/link'
import Markdown from 'react-markdown'

import { Box } from 'components/Box'
import { Heading } from 'components/Heading'
import { IResumeProject } from 'types/resume'

export const ResumeProjectsEntry = ({ data }: { data: IResumeProject }) => {
  return (
    <Box>
      <Heading as="h3">{data.name}</Heading>
      {data.link && (
        <Link href={data.link} rel="noopener noreferrer" target="_blank">
          {data.link}
        </Link>
      )}
      {data.description && (
        <div>
          <Markdown>{data.description}</Markdown>
        </div>
      )}
    </Box>
  )
}
