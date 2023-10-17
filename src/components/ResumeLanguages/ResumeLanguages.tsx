import { IResume } from 'types/resume'
import { Box } from 'components/Box'

export const ResumeLanguages = ({
  resume: { languages },
}: {
  resume: IResume
}) => {
  return languages && languages.length ? (
    <Box>
      <h3 className="text-gray-900 text-2xl font-bold uppercase">Languages</h3>
      <div className="flex flex-col gap-2 mt-6">
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
