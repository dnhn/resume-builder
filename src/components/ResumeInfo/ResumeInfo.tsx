import Link from 'next/link'

import { IResumeInfo } from 'types/resume'
import { ResumeHeading } from 'components/ResumeHeading'
import { ResumeSection } from 'components/ResumeSection'

export const ResumeInfo = ({ data }: { data: IResumeInfo }) => {
  const externalUrl = data.website?.startsWith('http')

  return (
    <ResumeSection className="text-center">
      <ResumeHeading as="h1" className="mt-0 mb-4">
        {data.name}
      </ResumeHeading>
      {data.title && (
        <div className="mb-8 text-xl font-medium">{data.title}</div>
      )}
      {data.address && <address className="not-italic">{data.address}</address>}
      {(data.phoneNumber || data.email || data.website) && (
        <p className="m-0 flex flex-wrap justify-center gap-x-4 gap-y-1">
          {data.phoneNumber && (
            <a href={`tel:${data.phoneNumber}`}>{data.phoneNumber}</a>
          )}
          {data.email && <a href={`mailto:${data.email}`}>{data.email}</a>}
          {data.website && (
            <Link
              href={data.website}
              rel={externalUrl ? 'noopener noreferrer' : undefined}
              target={externalUrl ? '_blank' : undefined}
            >
              {data.website}
            </Link>
          )}
        </p>
      )}
    </ResumeSection>
  )
}
