import Link from 'next/link'
import Markdown from 'react-markdown'

import { IResumeProject } from 'types/resume'
import { Box } from 'components/Box'
import { ResumeHeading } from 'components/ResumeHeading'

export const ResumeProjectsEntry = ({ data }: { data: IResumeProject }) => {
  const { description, name, url } = data

  return (
    <Box>
      <ResumeHeading as="h3" className="mb-1 mt-6">
        {name}
      </ResumeHeading>
      {url && (
        <Link
          className="text-xs"
          href={url}
          rel="noopener noreferrer"
          target="_blank"
        >
          {url}
        </Link>
      )}
      {description && <Markdown className="font-serif">{description}</Markdown>}
    </Box>
  )
}
