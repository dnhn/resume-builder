import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'components/Button'
import { FormTextarea } from 'components/FormInput'
import { ResumeEnhancedInput } from 'components/ResumeEnhancedInput'
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
        `${content}\n\n---\n\n### Previous content:\n\n${getValues('intro')}`,
      ),
    [getValues, setValue],
  )

  const handleGenerateContent = useCallback(async () => {
    const intro = getValues('intro')

    if (!data.info.title || data.skills.length === 0) {
      toast.info({
        title:
          'Please provide Job title and Skills to receive more relevant suggestions.',
      })
    }

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
          : `Write a brief résumé introduction ${
              data.info.title ? `for a ${data.info.title}` : ''
            } ${
              data.skills.length
                ? ` and include some of these skills: ${data.skills}`
                : ''
            }`,
      )

      if (intro) {
        appendContent(choices[0].message.content)
      } else {
        setValue('intro', choices[0].message.content)
      }
    } catch {
      toast.error({
        title: 'An error occurred.',
      })
    } finally {
      setIsLoading(false)
    }
  }, [appendContent, data.info.title, data.skills, getValues, setValue])

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <ResumeEnhancedInput
            control={
              <Button
                appearance="primary"
                disabled={isLoading}
                loading={isLoading}
                type="button"
                onClick={handleGenerateContent}
              >
                {getValues('intro').length === 0 ? 'Suggest' : 'Refine'} content
                ✨
              </Button>
            }
            field={
              <FormTextarea
                className="pb-16"
                disabled={isLoading}
                label="Introduction"
                name="intro"
                rows={10}
                fullWidth
              />
            }
          />
          <div className="space-x-2 text-right">
            <Button size="sm" type="button" onClick={onComplete}>
              Cancel
            </Button>
            <Button appearance="primary" size="sm" type="submit">
              Save
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
