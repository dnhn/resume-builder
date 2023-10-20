import { IResume } from 'types/resume'
import { ResumeHeading } from 'components/ResumeHeading'
import { ResumeSection } from 'components/ResumeSection'

export const ResumeLanguages = ({
  resume: { languages },
}: {
  resume: IResume
}) => {
  return languages && languages.length ? (
    <ResumeSection>
      <ResumeHeading as="h3">Languages</ResumeHeading>
      <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
        {languages.map((lang, index) => (
          <p key={index} className="m-0">
            <span className="font-semibold">{lang.name}</span>
            {lang.proficiency && (
              <>
                : <span className="capitalize">{lang.proficiency}</span>
              </>
            )}
          </p>
        ))}
      </div>
    </ResumeSection>
  ) : null
}
