import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'components/Button'
import { Card } from 'components/Card'
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
import { FormCTA } from './FormCTA'
import { ItemActions } from './ItemActions'

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

const newField = {
  school: '',
  degree: '',
  field: '',
  startDate: '',
  endDate: '',
  current: [],
  description: '',
}

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

  const { append, fields, move, remove } = useFieldArray({
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

      if (degree && field) {
        try {
          setIsLoading((state) => ({
            ...state,
            [descriptionField]: true,
          }))

          const { choices } = await completeChat(
            `Write an education description in the résumé of a ${degree} in ${field} ${
              description
                ? `by refining the content below:\n${description}`
                : '.'
            }`,
          )

          appendContent(descriptionField, choices[0].message.content)
        } catch {
          toast.error({
            title: 'An error occurred.',
          })
        } finally {
          setIsLoading((state) => ({
            ...state,
            [descriptionField]: false,
          }))
        }
      } else {
        toast.info({
          title: 'Please provide Degree and Field to receive suggestions.',
        })
      }
    },
    [appendContent, getValues],
  )

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormCTA
            addLabel="Add education"
            handleAdd={() => append(newField)}
            handleCancel={onComplete}
          />
          {fields.map((field, index) => (
            <Card key={field.id} className="space-y-4">
              <ItemActions
                fields={fields.length}
                index={index}
                moveDown={() => move(index, index + 1)}
                moveUp={() => move(index, index - 1)}
                remove={() => remove(index)}
              />
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
            </Card>
          ))}
          {fields.length > 0 && (
            <FormCTA
              addLabel="Add education"
              handleAdd={() => append(newField)}
              handleCancel={onComplete}
            />
          )}
        </div>
      </form>
    </FormProvider>
  )
}
