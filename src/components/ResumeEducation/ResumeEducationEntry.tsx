import Markdown from 'react-markdown'

import { Box } from 'components/Box'
import { IResumeEducation } from 'types/resume'
import { dateToMonthYear } from 'utils/formatDate'

export const ResumeEducationEntry = ({ data }: { data: IResumeEducation }) => {
  const { school, degree, field, startDate, endDate, description } = data

  return (
    <Box>
      <h4 className="text-gray-900 text-xl font-medium mb-1 mt-6">{school}</h4>
      <h5 className="text-gray-900 text-lg">
        {degree}, {field}
      </h5>
      <div className="mt-2">
        {startDate && dateToMonthYear(startDate)}
        {startDate && endDate && '–'}
        {endDate ? dateToMonthYear(endDate) : 'present'}
      </div>
      <div className="">
        <Markdown>{description}</Markdown>
      </div>
    </Box>
  )
}
