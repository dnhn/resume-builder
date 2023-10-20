import Markdown from 'react-markdown'

import { Box } from 'components/Box'
import { IResumeEducation } from 'types/resume'
import { dateToMonthYear } from 'utils/formatDate'
import { ResumeHeading } from 'components/ResumeHeading'

export const ResumeEducationEntry = ({ data }: { data: IResumeEducation }) => {
  const { school, degree, field, startDate, endDate, description } = data

  return (
    <Box>
      <ResumeHeading as="h4" className="mb-1 mt-6">
        {school}
      </ResumeHeading>
      <ResumeHeading as="h5">
        {degree}, {field}
      </ResumeHeading>
      <ResumeHeading as="h6" className="mt-2">
        {startDate && dateToMonthYear(startDate)}
        {startDate && endDate && '–'}
        {endDate ? dateToMonthYear(endDate) : 'present'}
      </ResumeHeading>
      {description && <Markdown className="font-serif">{description}</Markdown>}
    </Box>
  )
}
