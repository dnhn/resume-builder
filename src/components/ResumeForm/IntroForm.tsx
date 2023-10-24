import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'components/Button'
import { FormTextarea } from 'components/FormInput'
import { toast } from 'components/Toast'
import { useCallback, useState } from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { IResume } from 'types/resume'
import { completeChat } from 'utils/completeChat'
import { z } from 'zod'

const introSchema = z.object({
  intro: z.string().trim(),
})

type IntroSchema = z.infer<typeof introSchema>

export function IntroForm({
  data,
  handleSave,
  onComplete,
}: {
  data: IResume
  handleSave: (intro: string) => void
  onComplete: VoidFunction
}) {
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<IntroSchema>({
    resolver: zodResolver(introSchema),
    defaultValues: {
      intro: data.intro || '',
    },
  })

  const { getValues, handleSubmit, setValue, watch } = form

  watch()

  const onSubmit: SubmitHandler<IntroSchema> = (data) => {
    handleSave(data.intro)
    onComplete()
  }

  const appendContent = useCallback(
    (content: string) =>
      setValue(
        'intro',
        `${getValues('intro')}\n\n---
\nHere is your generated content:\n\n${content}`,
      ),
    [getValues, setValue],
  )

  const handleGenerateContent = useCallback(async () => {
    const intro = getValues('intro')

    try {
      setIsLoading(true)

      const { choices } = await completeChat(
        intro
          ? `Refine the content below, a résumé introduction ${
              data.info.title ? ` for a ${data.info.title}` : ''
            } ${
              data.skills.length
                ? `, include some of these skills: ${data.skills}`
                : ''
            }, and keep it short:\n${getValues('intro')}`
          : `Write a short résumé introduction ${
              data.info.title ? `for a ${data.info.title}` : ''
            } ${
              data.skills.length
                ? ` and include some of these skills: ${data.skills}: `
                : ''
            }`,
      )

      appendContent(choices[0].message.content)
    } catch (error) {
      toast.error({
        title: 'An error occurred.',
      })
    } finally {
      setIsLoading(false)
    }
  }, [appendContent, data.info.title, data.skills, getValues])

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div className="relative">
            <FormTextarea
              disabled={isLoading}
              label="Introduction"
              name="intro"
              rows={10}
              fullWidth
            />
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
              <Button
                appearance="primary"
                disabled={isLoading}
                loading={isLoading}
                size="sm"
                type="button"
                onClick={handleGenerateContent}
              >
                {getValues('intro').length === 0 ? 'Suggest' : 'Refine'} content
              </Button>
            </div>
          </div>
          <div className="space-x-2 text-right">
            <Button type="button" onClick={onComplete}>
              Cancel
            </Button>
            <Button appearance="primary" type="submit">
              Save
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
