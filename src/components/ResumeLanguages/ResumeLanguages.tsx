import { IResume } from 'types/resume'
import { Box } from 'components/Box'
import { ResumeHeading } from 'components/ResumeHeading'

export const ResumeLanguages = ({
  resume: { languages },
}: {
  resume: IResume
}) => {
  return languages && languages.length ? (
    <Box>
      <ResumeHeading as="h3">Languages</ResumeHeading>
      <div className="flex flex-wrap gap-x-10 gap-y-3 mt-6">
        {languages.map((lang, index) => (
          <div key={index}>
            <span className="font-semibold">{lang.name}</span>
            {lang.proficiency && (
              <>
                : <span className="capitalize">{lang.proficiency}</span>
              </>
            )}
          </div>
        ))}
      </div>
    </Box>
  ) : null
}
