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
import { IResumeProject } from 'types/resume'
import { completeChat } from 'utils/completeChat'
import { z } from 'zod'
import { FormCTA } from './FormCTA'
import { ItemActions } from './ItemActions'

const projectsSchema = z.object({
  projects: z.array(
    z.object({
      name: z.string().trim().min(1, 'Name is required.'),
      url: z
        .string()
        .trim()
        .refine(
          (value) => (value.length ? value.startsWith('http') : true),
          'URL is invalid.',
        ),
      description: z.string().trim(),
    }),
  ),
})

type ProjectsSchema = z.infer<typeof projectsSchema>

const newField = {
  name: '',
  url: '',
  description: '',
}

export function ProjectsForm({
  data,
  handleSave,
  onComplete,
}: {
  data: IResumeProject[]
  handleSave: (projects: IResumeProject[]) => void
  onComplete: VoidFunction
}) {
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({})
  const form = useForm<ProjectsSchema>({
    resolver: zodResolver(projectsSchema),
    defaultValues: {
      projects: data || [],
    },
  })

  const { control, getValues, handleSubmit, setValue, watch } = form

  watch()

  const { append, fields, move, remove } = useFieldArray({
    control,
    name: 'projects',
  })

  const onSubmit: SubmitHandler<ProjectsSchema> = (data) => {
    handleSave(data.projects)
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
      const name = getValues(`projects.${index}.name`)
      const descriptionField = `projects.${index}.description`
      const description = getValues(`projects.${index}.description`)

      if (name) {
        try {
          setIsLoading((state) => ({
            ...state,
            [descriptionField]: true,
          }))

          const { choices } = await completeChat(
            `${
              description
                ? `Refine the description of the project ${name}:\n${description}`
                : `Write a brief project description for the project ${name}.`
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
          title: 'Please provide project name to receive suggestions.',
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
            addLabel="Add project"
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
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label="Name"
                  name={`projects.${index}.name`}
                  rules={{ required: 'Required' }}
                  fullWidth
                />
                <FormInput
                  label="URL"
                  name={`projects.${index}.url`}
                  fullWidth
                />
              </div>
              <div>
                <ResumeEnhancedInput
                  control={
                    <Button
                      appearance="primary"
                      disabled={isLoading[`projects.${index}.description`]}
                      loading={isLoading[`projects.${index}.description`]}
                      type="button"
                      onClick={() => handleGenerateContent(index)}
                    >
                      {getValues(`projects.${index}.description`).length === 0
                        ? 'Suggest'
                        : 'Refine'}{' '}
                      content ✨
                    </Button>
                  }
                  field={
                    <FormTextarea
                      className="pb-16"
                      disabled={isLoading[`projects.${index}.description`]}
                      label="Description"
                      name={`projects.${index}.description`}
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
              addLabel="Add project"
              handleAdd={() => append(newField)}
              handleCancel={onComplete}
            />
          )}
        </div>
      </form>
    </FormProvider>
  )
}
