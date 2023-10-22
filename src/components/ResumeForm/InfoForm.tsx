import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'components/Button'
import { FormInput } from 'components/FormInput'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { IResumeInfo } from 'types/resume'
import { z } from 'zod'

const infoSchema = z.object({
  name: z.string().trim().min(1, 'Name is required.'),
  title: z.string().trim(),
  address: z.string().trim(),
  phoneNumber: z.string().trim(),
  email: z.string().trim(),
  website: z
    .string()
    .trim()
    .refine(
      (value) => (value.length ? value.startsWith('http') : true),
      'URL is invalid.',
    ),
})

type InfoSchema = z.infer<typeof infoSchema>

export function InfoForm({
  data,
  handleSave,
  onComplete,
}: {
  data: IResumeInfo
  handleSave: (info: IResumeInfo) => void
  onComplete: VoidFunction
}) {
  const form = useForm<InfoSchema>({
    resolver: zodResolver(infoSchema),
    defaultValues: {
      name: data.name || '',
      title: data.title || '',
      address: data.address || '',
      phoneNumber: data.phoneNumber || '',
      email: data.email || '',
      website: data.website || '',
    },
  })

  const { handleSubmit } = form

  const onSubmit: SubmitHandler<InfoSchema> = (data) => {
    handleSave(data)
    onComplete()
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormInput
            label="Name"
            name="name"
            rules={{ required: 'Required' }}
            fullWidth
          />
          <FormInput label="Title" name="title" fullWidth />
          <FormInput label="Address" name="address" fullWidth />
          <FormInput label="Phone number" name="phoneNumber" fullWidth />
          <FormInput label="Email" name="email" fullWidth />
          <FormInput label="Website" name="website" fullWidth />
          <div className="space-x-2 text-right">
            <Button disabled={!data.name} type="button" onClick={onComplete}>
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
