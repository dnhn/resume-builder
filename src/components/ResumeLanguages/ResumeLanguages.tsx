import { IResume } from 'types/resume'
import { Box } from 'components/Box'
import { ResumeHeading } from 'components/ResumeHeading'
import { Text } from 'components/Text'

export const ResumeLanguages = ({
  resume: { languages },
}: {
  resume: IResume
}) => {
  return languages && languages.length ? (
    <Box>
      <ResumeHeading as="h3">Languages</ResumeHeading>
      <div className="flex flex-wrap gap-x-8 gap-y-3 mt-6">
        {languages.map((lang, index) => (
          <div key={index}>
            <Text as="span" className="font-semibold">
              {lang.name}
            </Text>
            {lang.proficiency && (
              <>
                :{' '}
                <Text as="span" className="capitalize">
                  {lang.proficiency}
                </Text>
              </>
            )}
          </div>
        ))}
      </div>
    </Box>
  ) : null
}
