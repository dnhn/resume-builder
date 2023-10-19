import Markdown from 'react-markdown'

import { Box } from 'components/Box'
import { IResumeEducation } from 'types/resume'
import { dateToMonthYear } from 'utils/formatDate'
import { ResumeHeading } from 'components/ResumeHeading'
import { Text } from 'components/Text'

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
      <Text className="mt-2">
        {startDate && dateToMonthYear(startDate)}
        {startDate && endDate && '–'}
        {endDate ? dateToMonthYear(endDate) : 'present'}
      </Text>
      {description && (
        <div className="[font-family:var(--font-libre-baskerville)]">
          <Markdown>{description}</Markdown>
        </div>
      )}
    </Box>
  )
}
