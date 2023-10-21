import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'components/Button'
import { FormInput, FormTextarea } from 'components/FormInput'
import { Text } from 'components/Text'
import { Dispatch, SetStateAction } from 'react'
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form'
import { IResumeExperience } from 'types/resume'
import { z } from 'zod'

const experienceSchema = z.object({
  experience: z.array(
    z
      .object({
        title: z.string().trim().min(1, 'Title is required.'),
        company: z.string().trim().min(1, 'Company is required.'),
        startDate: z.string().length(10, 'Start date is required.'),
        endDate: z.string(),
        description: z.string().trim(),
      })
      .superRefine(({ startDate, endDate }, ctx) => {
        if (endDate) {
          if (new Date(endDate) < new Date(startDate)) {
            ctx.addIssue({
              code: z.ZodIssueCode.invalid_date,
              path: ['endDate'],
              message: 'End date must be later than Start date.',
            })
          }
        }

        return z.NEVER
      }),
  ),
})

type ExperienceSchema = z.infer<typeof experienceSchema>

export function ExperienceForm({
  data,
  handleSave,
  onComplete,
}: {
  data: IResumeExperience[]
  handleSave: Dispatch<SetStateAction<IResumeExperience[]>>
  onComplete: VoidFunction
}) {
  const form = useForm<ExperienceSchema>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      experience: data || [],
    },
  })

  const { control, handleSubmit } = form

  const { append, fields, remove } = useFieldArray({
    control,
    name: 'experience',
  })

  const onSubmit: SubmitHandler<ExperienceSchema> = (data) => {
    handleSave(data.experience)
    onComplete()
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <Button
            type="button"
            onClick={() =>
              append({
                title: '',
                company: '',
                startDate: '',
                endDate: '',
                description: '',
              })
            }
          >
            Add experience
          </Button>
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label="Title"
                  name={`experience.${index}.title`}
                  rules={{ required: 'Required' }}
                  fullWidth
                />
                <FormInput
                  label="Company"
                  name={`experience.${index}.company`}
                  rules={{ required: 'Required' }}
                  fullWidth
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label="Start date"
                  name={`experience.${index}.startDate`}
                  rules={{ required: 'Required' }}
                  type="date"
                  fullWidth
                />
                <FormInput
                  label="End date"
                  name={`experience.${index}.endDate`}
                  type="date"
                  fullWidth
                />
              </div>
              <div>
                <FormTextarea
                  label="Description"
                  name={`experience.${index}.description`}
                  fullWidth
                />
                <Text as="small">Markdown syntax supported</Text>
              </div>
              <Button type="reset" onClick={() => remove(index)}>
                Remove
              </Button>
            </div>
          ))}
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
