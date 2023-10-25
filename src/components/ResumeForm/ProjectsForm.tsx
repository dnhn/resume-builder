import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'components/Button'
import { FormInput, FormTextarea } from 'components/FormInput'
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

  const { append, fields, remove } = useFieldArray({
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

      try {
        setIsLoading((state) => ({
          ...state,
          [descriptionField]: true,
        }))

        const { choices } = await completeChat(
          `${
            description
              ? `Refine the content below, project ${name}’s description:\n${description}`
              : `Write a project description for project ${name}.`
          }`,
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
            type="button"
            onClick={() =>
              append({
                name: '',
                url: '',
                description: '',
              })
            }
          >
            Add project
          </Button>
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-4">
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
                <div className="relative">
                  <FormTextarea
                    disabled={isLoading[`projects.${index}.description`]}
                    label="Description"
                    name={`projects.${index}.description`}
                    rows={10}
                    fullWidth
                  />
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                    <Button
                      appearance="primary"
                      disabled={isLoading[`projects.${index}.description`]}
                      loading={isLoading[`projects.${index}.description`]}
                      size="sm"
                      type="button"
                      onClick={() => handleGenerateContent(index)}
                    >
                      {getValues(`projects.${index}.description`).length === 0
                        ? 'Suggest'
                        : 'Refine'}{' '}
                      description
                    </Button>
                  </div>
                </div>
                <Text as="small">Markdown syntax supported</Text>
              </div>
              <Button
                appearance="secondary"
                type="reset"
                onClick={() => remove(index)}
              >
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
