import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'components/Button'
import { FormTextarea } from 'components/FormInput'
import { Dispatch, SetStateAction } from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
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
  data: string
  handleSave: Dispatch<SetStateAction<string>>
  onComplete: VoidFunction
}) {
  const form = useForm<IntroSchema>({
    resolver: zodResolver(introSchema),
    defaultValues: {
      intro: data || '',
    },
  })

  const { handleSubmit } = form

  const onSubmit: SubmitHandler<IntroSchema> = (data) => {
    handleSave(data.intro)
    onComplete()
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormTextarea label="Introduction" name="intro" rows={5} fullWidth />
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
