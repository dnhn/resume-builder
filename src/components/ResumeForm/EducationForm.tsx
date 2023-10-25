import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'components/Button'
import { Checkbox } from 'components/Checkbox'
import { FormCheckboxGroup } from 'components/FormCheckboxGroup'
import { FormInput, FormTextarea } from 'components/FormInput'
import { ResumeEnhancedInput } from 'components/ResumeEnhancedInput'
import { Text } from 'components/Text'
import { toast } from 'components/Toast'
import { useCallback, useState } from 'react'
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form'
import { IResumeEducation } from 'types/resume'
import { completeChat } from 'utils/completeChat'
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
      .superRefine(({ current, startDate, endDate }, ctx) => {
        if (current.length === 0 && startDate && endDate) {
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
  handleSave: (education: IResumeEducation[]) => void
  onComplete: VoidFunction
}) {
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({})
  const form = useForm<EducationSchema>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      education: data || [],
    },
  })

  const { control, getValues, handleSubmit, setValue, watch } = form

  watch()

  const { append, fields, remove } = useFieldArray({
    control,
    name: 'education',
  })

  const onSubmit: SubmitHandler<EducationSchema> = (data) => {
    handleSave(data.education)
    onComplete()
  }

  const appendContent = useCallback(
    (field: any, content: string) =>
      setValue(
        field,
        `${getValues(field)}\n\n---
\nHere is your generated content:\n\n${content}`,
      ),
    [getValues, setValue],
  )

  const handleGenerateContent = useCallback(
    async (index: number) => {
      const degree = getValues(`education.${index}.degree`)
      const field = getValues(`education.${index}.field`)
      const descriptionField = `education.${index}.description`
      const description = getValues(`education.${index}.description`)

      try {
        setIsLoading((state) => ({
          ...state,
          [descriptionField]: true,
        }))

        const { choices } = await completeChat(
          `${
            description ? 'Refine the content below,' : 'Write'
          } a résumé education description of a ${degree} in ${field}:
${description || `${degree} in ${field}`}`,
        )

        appendContent(descriptionField, choices[0].message.content)
      } catch (error) {
        toast.error({
          title: 'An error occurred.',
        })
      } finally {
        setIsLoading((state) => ({
          ...state,
          [descriptionField]: false,
        }))
      }
    },
    [appendContent, getValues],
  )

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <Button
            appearance="secondary"
            size="sm"
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
                <ResumeEnhancedInput
                  control={
                    <Button
                      appearance="primary"
                      disabled={isLoading[`education.${index}.description`]}
                      loading={isLoading[`education.${index}.description`]}
                      type="button"
                      onClick={() => handleGenerateContent(index)}
                    >
                      {getValues(`education.${index}.description`).length === 0
                        ? 'Suggest'
                        : 'Refine'}{' '}
                      content ✨
                    </Button>
                  }
                  field={
                    <FormTextarea
                      className="pb-16"
                      disabled={isLoading[`education.${index}.description`]}
                      label="Description"
                      name={`education.${index}.description`}
                      rows={10}
                      fullWidth
                    />
                  }
                />
                <Text as="small">Markdown syntax supported</Text>
              </div>
              <Button
                appearance="secondary"
                size="sm"
                type="reset"
                onClick={() => remove(index)}
              >
                Remove
              </Button>
            </div>
          ))}
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
