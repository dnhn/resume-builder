import Link from 'next/link'
import Markdown from 'react-markdown'

import { IResumeProject } from 'types/resume'
import { Box } from 'components/Box'
import { ResumeHeading } from 'components/ResumeHeading'

export const ResumeProjectsEntry = ({ data }: { data: IResumeProject }) => {
  const { name, link, description } = data

  return (
    <Box>
      <ResumeHeading as="h4" className="mb-1 mt-6">
        {name}
      </ResumeHeading>
      {link && (
        <Link
          className="text-xs"
          href={link}
          rel="noopener noreferrer"
          target="_blank"
        >
          {link}
        </Link>
      )}
      {description && <Markdown className="font-serif">{description}</Markdown>}
    </Box>
  )
}
