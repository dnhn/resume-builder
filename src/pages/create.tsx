import { Button } from 'components/Button'
import { Card } from 'components/Card'
import { Heading } from 'components/Heading'
import { Layout } from 'components/Layout'
import { InfoForm } from 'components/ResumeForm'
import { ResumeInfo } from 'components/ResumeInfo'
import { IconPencilSolid } from 'components/icons/components/IconPencilSolid'
import { useState } from 'react'
import { IResumeInfo } from 'types/resume'

const FormsPage = () => {
  const [info, setInfo] = useState<IResumeInfo>({ name: '' })

  const [infoEdit, setInfoEdit] = useState(true)

  return (
    <Layout>
      <Heading as="h2" className="text-center uppercase">
        Edit your résumé
      </Heading>

      <div className="prose prose-sm grid max-w-none grid-cols-10 rounded-none bg-neutral-50 shadow-md prose-p:font-serif prose-a:font-sans prose-a:underline-offset-2">
        <div className="col-span-3 bg-slate-600 p-6 text-gray-100 prose-headings:text-white prose-a:text-white xl:p-12">
          {infoEdit ? (
            <Card>
              <InfoForm
                data={info}
                handleSave={setInfo}
                onComplete={() => setInfoEdit(false)}
              />
            </Card>
          ) : (
            <div className="relative">
              <ResumeInfo resume={info} />
              <span className="absolute top-0 right-0">
                <Button
                  size="sm"
                  type="button"
                  onClick={() => setInfoEdit((value) => !value)}
                >
                  <IconPencilSolid />
                </Button>
              </span>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default FormsPage
