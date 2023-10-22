import Markdown from 'react-markdown'

import { Box } from 'components/Box'
import { IResumeEducation } from 'types/resume'
import { dateToMonthYear } from 'utils/formatDate'
import { ResumeHeading } from 'components/ResumeHeading'

export const ResumeEducationEntry = ({ data }: { data: IResumeEducation }) => {
  const { school, degree, field, startDate, endDate, current, description } =
    data

  return (
    <Box>
      <ResumeHeading as="h3" className="mb-1 mt-6">
        {school}
      </ResumeHeading>
      <ResumeHeading as="h4">
        {degree}
        {degree && field ? ',' : ''} {field}
      </ResumeHeading>
      {startDate && (
        <ResumeHeading as="h5" className="mt-2">
          {startDate && dateToMonthYear(startDate as unknown as Date)}
          {startDate && (endDate || !!current.length) && '–'}
          {current.length === 0 &&
            endDate &&
            dateToMonthYear(endDate as unknown as Date)}
          {!!current.length && 'present'}
        </ResumeHeading>
      )}
      {description && <Markdown className="font-serif">{description}</Markdown>}
    </Box>
  )
}
