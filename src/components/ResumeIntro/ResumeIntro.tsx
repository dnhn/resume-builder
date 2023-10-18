import Link from 'next/link'

import { IResume } from 'types/resume'
import { Box } from 'components/Box'
import { ResumeHeading } from 'components/ResumeHeading'

export const ResumeIntro = ({ resume }: { resume: IResume }) => {
  const externalUrl = resume.website?.startsWith('http')

  return (
    <Box>
      <ResumeHeading className="mt-0 mb-2">{resume.name}</ResumeHeading>
      {resume.title && (
        <div className="text-xl mb-4 font-medium">{resume.title}</div>
      )}
      {resume.address && (
        <address className="not-italic">{resume.address}</address>
      )}
      {(resume.phoneNumber || resume.email || resume.website) && (
        <p className="flex gap-4 flex-wrap mt-0">
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
