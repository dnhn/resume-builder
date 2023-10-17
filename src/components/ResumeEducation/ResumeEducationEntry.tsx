import Markdown from 'react-markdown'

import { Box } from 'components/Box'
import { Heading } from 'components/Heading'
import { IResumeEducation } from 'types/resume'
import { dateToMonthYear } from 'utils/formatDate'

export const ResumeEducationEntry = ({ data }: { data: IResumeEducation }) => {
  return (
    <Box>
      <Heading as="h3">{data.school}</Heading>
      <Heading as="h4">
        {data.degree}, {data.field}
      </Heading>
      <div>
        {data.startDate && dateToMonthYear(data.startDate)}
        {data.startDate && data.endDate && '–'}
        {data.endDate ? dateToMonthYear(data.endDate) : 'present'}
      </div>
      <div className="">
        <Markdown>{data.description}</Markdown>
      </div>
    </Box>
  )
}
