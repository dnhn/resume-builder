import Markdown from 'react-markdown'

import { IResumeExperience } from 'types/resume'
import { Box } from 'components/Box'
import { Heading } from 'components/Heading'
import { dateToMonthYear } from 'utils/formatDate'

export const ResumeExperienceEntry = ({
  data,
}: {
  data: IResumeExperience
}) => {
  return (
    <Box>
      <Heading as="h3">{data.title}</Heading>
      <Heading as="h4">{data.company}</Heading>
      <div>
        {dateToMonthYear(data.startDate)}–
        {data.endDate ? dateToMonthYear(data.endDate) : 'present'}
      </div>
      {data.description && (
        <div>
          <Markdown>{data.description}</Markdown>
        </div>
      )}
    </Box>
  )
}
