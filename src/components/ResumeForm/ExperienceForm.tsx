import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'components/Button'
import { Card } from 'components/Card'
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
import { IResumeExperience } from 'types/resume'
import { completeChat } from 'utils/completeChat'
import { z } from 'zod'
import { FormCTA } from './FormCTA'
import { ItemActions } from './ItemActions'

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

const newField = {
  title: '',
  company: '',
  startDate: '',
  endDate: '',
  description: '',
}

export function ExperienceForm({
  data,
  handleSave,
  onComplete,
}: {
  data: IResumeExperience[]
  handleSave: (experience: IResumeExperience[]) => void
  onComplete: VoidFunction
}) {
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({})
  const form = useForm<ExperienceSchema>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      experience: data || [],
    },
  })

  const { control, getValues, handleSubmit, setValue, watch } = form

  watch()

  const { append, fields, move, remove } = useFieldArray({
    control,
    name: 'experience',
  })

  const onSubmit: SubmitHandler<ExperienceSchema> = (data) => {
    handleSave(data.experience)
    onComplete()
  }

  const appendContent = useCallback(
    (field: any, content: string) =>
      setValue(
        field,
        `${content}\n\n---\n\n### Previous content:\n\n${getValues(field)}`,
      ),
    [getValues, setValue],
  )

  const handleGenerateContent = useCallback(
    async (index: number) => {
      const title = getValues(`experience.${index}.title`)
      const company = getValues(`experience.${index}.company`)
      const descriptionField = `experience.${index}.description`
      const description = getValues(`experience.${index}.description`)

      if (title) {
        try {
          setIsLoading((state) => ({
            ...state,
            [descriptionField]: true,
          }))

          const { choices } = await completeChat(
            `Refine the content below, a job experience description of a ${title}:
  ${description || `${title} at ${company}`}`,
          )

          if (description) {
            appendContent(descriptionField, choices[0].message.content)
          } else {
            setValue(descriptionField as any, choices[0].message.content)
          }
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
          title: 'Please provide Title to receive suggestions.',
        })
      }
    },
    [appendContent, getValues, setValue],
  )

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormCTA
            addLabel="Add experience"
            handleAdd={() => append(newField)}
            handleCancel={onComplete}
          />
          {fields.map((field, index) => (
            <Card key={field.id} className="space-y-4">
              <ItemActions
                index={index}
                lastIndex={fields.length - 1}
                moveDown={() => move(index, index + 1)}
                moveUp={() => move(index, index - 1)}
                remove={() => remove(index)}
              />
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
                <ResumeEnhancedInput
                  control={
                    <Button
                      appearance="primary"
                      disabled={isLoading[`experience.${index}.description`]}
                      loading={isLoading[`experience.${index}.description`]}
                      type="button"
                      onClick={() => handleGenerateContent(index)}
                    >
                      {getValues(`experience.${index}.description`).length === 0
                        ? 'Suggest'
                        : 'Refine'}{' '}
                      content ✨
                    </Button>
                  }
                  field={
                    <FormTextarea
                      className="pb-16"
                      disabled={isLoading[`experience.${index}.description`]}
                      label="Description"
                      name={`experience.${index}.description`}
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
              addLabel="Add experience"
              handleAdd={() => append(newField)}
              handleCancel={onComplete}
            />
          )}
        </div>
      </form>
    </FormProvider>
  )
}
