import Markdown from 'react-markdown'

import { IResumeExperience } from 'types/resume'
import { Box } from 'components/Box'
import { dateToMonthYear } from 'utils/formatDate'
import { ResumeHeading } from 'components/ResumeHeading'
import { Text } from 'components/Text'

export const ResumeExperienceEntry = ({
  data,
}: {
  data: IResumeExperience
}) => {
  const { title, company, startDate, endDate, description } = data

  return (
    <Box>
      <ResumeHeading as="h4" className="mb-1 mt-6">
        {title}
      </ResumeHeading>
      <ResumeHeading as="h5">{company}</ResumeHeading>
      <Text className="mt-2">
        {dateToMonthYear(startDate)}–
        {endDate ? dateToMonthYear(endDate) : 'present'}
      </Text>
      {description && (
        <div>
          <Markdown>{description}</Markdown>
        </div>
      )}
    </Box>
  )
}
