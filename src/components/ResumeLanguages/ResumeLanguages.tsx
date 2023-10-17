import { IResume } from 'types/resume'
import { Box } from 'components/Box'
import { Heading } from 'components/Heading'

export const ResumeLanguages = ({
  resume: { languages },
}: {
  resume: IResume
}) => {
  return languages.length ? (
    <Box>
      <Heading as="h2">Languages</Heading>
      <div className="flex flex-col gap-3">
        {languages.map((lang, index) => (
          <div key={index}>
            <div>{lang.name}</div>
            {lang.proficiency && <div>{lang.proficiency}</div>}
          </div>
        ))}
      </div>
    </Box>
  ) : null
}
