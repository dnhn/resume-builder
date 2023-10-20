import { IResumeLanguage } from 'types/resume'
import { ResumeHeading } from 'components/ResumeHeading'
import { ResumeSection } from 'components/ResumeSection'

export const ResumeLanguages = ({
  languages,
}: {
  languages: IResumeLanguage[]
}) => {
  return (
    <ResumeSection>
      <ResumeHeading>Languages</ResumeHeading>
      <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
        {languages.map((lang, index) => (
          <p key={index} className="m-0">
            <span className="font-bold capitalize">{lang.name}</span>
            {lang.proficiency && (
              <>
                : <span className="capitalize">{lang.proficiency}</span>
              </>
            )}
          </p>
        ))}
      </div>
    </ResumeSection>
  )
}
