import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'components/Button'
import { Checkbox } from 'components/Checkbox'
import { FormCheckboxGroup } from 'components/FormCheckboxGroup'
import { FormInput, FormTextarea } from 'components/FormInput'
import { Text } from 'components/Text'
import { Dispatch, SetStateAction } from 'react'
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form'
import { IResumeEducation } from 'types/resume'
import { z } from 'zod'

const educationSchema = z.object({
  education: z.array(
    z
      .object({
        school: z.string().trim().min(1, 'School is required.'),
        degree: z.string().trim(),
        field: z.string().trim(),
        startDate: z.string(),
        endDate: z.string(),
        current: z.array(z.string()),
        description: z.string().trim(),
      })
      .superRefine(({ startDate, endDate }, ctx) => {
        if (startDate && endDate) {
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

type EducationSchema = z.infer<typeof educationSchema>

export function EducationForm({
  data,
  handleSave,
  onComplete,
}: {
  data: IResumeEducation[]
  handleSave: Dispatch<SetStateAction<IResumeEducation[]>>
  onComplete: VoidFunction
}) {
  const form = useForm<EducationSchema>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      education: data || [],
    },
  })

  const { control, getValues, handleSubmit, watch } = form

  watch()

  const { append, fields, remove } = useFieldArray({
    control,
    name: 'education',
  })

  const onSubmit: SubmitHandler<EducationSchema> = (data) => {
    handleSave(data.education)
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
                school: '',
                degree: '',
                field: '',
                startDate: '',
                endDate: '',
                current: [],
                description: '',
              })
            }
          >
            Add education
          </Button>
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <FormInput
                  label="School"
                  name={`education.${index}.school`}
                  rules={{ required: 'Required' }}
                  fullWidth
                />
                <FormInput
                  label="Degree"
                  name={`education.${index}.degree`}
                  fullWidth
                />
                <FormInput
                  label="Field"
                  name={`education.${index}.field`}
                  fullWidth
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <FormInput
                  label="Start date"
                  name={`education.${index}.startDate`}
                  type="date"
                  fullWidth
                />
                <FormCheckboxGroup
                  className="space-y-3"
                  name={`education.${index}.current`}
                >
                  <Checkbox value="true">Currently studying</Checkbox>
                </FormCheckboxGroup>
                {getValues(`education.${index}.current`).length === 0 && (
                  <FormInput
                    disabled={!!getValues(`education.${index}.current`).length}
                    label="End date"
                    name={`education.${index}.endDate`}
                    type="date"
                    fullWidth
                  />
                )}
              </div>
              <div>
                <FormTextarea
                  label="Description"
                  name={`education.${index}.description`}
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
