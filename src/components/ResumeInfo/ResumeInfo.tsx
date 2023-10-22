import Link from 'next/link'

import { IResumeInfo } from 'types/resume'
import { ResumeHeading } from 'components/ResumeHeading'
import { ResumeSection } from 'components/ResumeSection'

export const ResumeInfo = ({ info }: { info: IResumeInfo }) => {
  const { name, address, email, phoneNumber, title, website } = info
  const externalUrl = website?.startsWith('http')

  return (
    <ResumeSection className="text-center">
      <ResumeHeading as="h1" className="mt-0 mb-4 capitalize">
        {name}
      </ResumeHeading>
      {title && <div className="mb-8 text-xl font-medium">{title}</div>}
      {address && <address className="not-italic">{address}</address>}
      {(phoneNumber || email || website) && (
        <p className="m-0 flex flex-wrap justify-center gap-x-4 gap-y-1">
          {phoneNumber && <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>}
          {email && <a href={`mailto:${email}`}>{email}</a>}
          {website && (
            <Link
              href={website}
              rel={externalUrl ? 'noopener noreferrer' : undefined}
              target={externalUrl ? '_blank' : undefined}
            >
              {website}
            </Link>
          )}
        </p>
      )}
    </ResumeSection>
  )
}
