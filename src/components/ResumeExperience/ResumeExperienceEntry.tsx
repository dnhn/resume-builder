import Markdown from 'react-markdown'

import { IResumeExperience } from 'types/resume'
import { Box } from 'components/Box'
import { dateToMonthYear } from 'utils/formatDate'

export const ResumeExperienceEntry = ({
  data,
}: {
  data: IResumeExperience
}) => {
  const { title, company, startDate, endDate, description } = data

  return (
    <Box>
      <h4 className="text-gray-900 text-xl font-medium mb-1 mt-6">{title}</h4>
      <h5 className="text-gray-900 text-lg">{company}</h5>
      <div className="mt-2">
        {dateToMonthYear(startDate)}–
        {endDate ? dateToMonthYear(endDate) : 'present'}
      </div>
      {description && (
        <div>
          <Markdown>{description}</Markdown>
        </div>
      )}
    </Box>
  )
}
