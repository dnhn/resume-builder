import Link from 'next/link'

import { IResume } from 'types/resume'
import { Box } from 'components/Box'
import { Heading } from 'components/Heading'

export const ResumeIntro = ({ resume }: { resume: IResume }) => {
  const externalUrl = resume.website?.startsWith('http')

  return (
    <Box>
      <Heading as="h2">{resume.name}</Heading>
      {resume.title && <Heading as="h3">{resume.title}</Heading>}
      {resume.address && <address>{resume.address}</address>}
      {(resume.phoneNumber || resume.email || resume.website) && (
        <p className="flex gap-4 flex-wrap">
          {resume.phoneNumber && (
            <a href={`tel:${resume.phoneNumber}`}>{resume.phoneNumber}</a>
          )}
          {resume.email && (
            <a href={`mailto:${resume.email}`}>{resume.email}</a>
          )}
          {resume.website && (
            <Link
              href={resume.website}
              rel={externalUrl ? 'noopener noreferrer' : undefined}
              target={externalUrl ? '_blank' : undefined}
            >
              {resume.website}
            </Link>
          )}
        </p>
      )}
      <p>{resume.intro}</p>
    </Box>
  )
}
