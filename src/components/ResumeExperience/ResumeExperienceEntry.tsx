import Markdown from 'react-markdown'

import { IResumeExperience } from 'types/resume'
import { Box } from 'components/Box'
import { dateToMonthYear } from 'utils/formatDate'
import { ResumeHeading } from 'components/ResumeHeading'

export const ResumeExperienceEntry = ({
  data,
}: {
  data: IResumeExperience
}) => {
  const { title, company, startDate, endDate, description } = data

  return (
    <Box>
      <ResumeHeading as="h3" className="mb-1 mt-6">
        {title}
      </ResumeHeading>
      <ResumeHeading as="h4">{company}</ResumeHeading>
      <ResumeHeading as="h5" className="mt-2">
        {dateToMonthYear(startDate as unknown as Date)}–
        {endDate ? dateToMonthYear(endDate as unknown as Date) : 'present'}
      </ResumeHeading>
      {description && <Markdown className="font-serif">{description}</Markdown>}
    </Box>
  )
}
