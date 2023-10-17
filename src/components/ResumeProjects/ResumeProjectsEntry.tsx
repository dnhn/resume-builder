import Link from 'next/link'
import Markdown from 'react-markdown'

import { IResumeProject } from 'types/resume'
import { Box } from 'components/Box'

export const ResumeProjectsEntry = ({ data }: { data: IResumeProject }) => {
  const { name, link, description } = data

  return (
    <Box>
      <h4 className="text-gray-900 text-xl font-medium mb-0 mt-6">{name}</h4>
      {link && (
        <Link href={link} rel="noopener noreferrer" target="_blank">
          {link}
        </Link>
      )}
      {description && (
        <div>
          <Markdown>{description}</Markdown>
        </div>
      )}
    </Box>
  )
}
