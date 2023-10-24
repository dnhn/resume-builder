import { ResumeHeading } from 'components/ResumeHeading'
import { ResumeSection } from 'components/ResumeSection'
import Markdown from 'react-markdown'

export const ResumeIntro = ({ intro }: { intro: string }) => {
  return (
    <ResumeSection>
      <ResumeHeading className="mt-0 mb-6">Introduction</ResumeHeading>
      <div className="prose prose-sm max-w-none prose-p:last:mb-0">
        <Markdown className="font-serif">{intro}</Markdown>
      </div>
    </ResumeSection>
  )
}
