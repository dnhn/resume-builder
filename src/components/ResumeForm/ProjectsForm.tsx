import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'components/Button'
import { FormInput, FormTextarea } from 'components/FormInput'
import { Text } from 'components/Text'
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form'
import { IResumeProject } from 'types/resume'
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
  const form = useForm<ProjectsSchema>({
    resolver: zodResolver(projectsSchema),
    defaultValues: {
      projects: data || [],
    },
  })

  const { control, handleSubmit } = form

  const { append, fields, remove } = useFieldArray({
    control,
    name: 'projects',
  })

  const onSubmit: SubmitHandler<ProjectsSchema> = (data) => {
    handleSave(data.projects)
    onComplete()
  }

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
                <FormTextarea
                  label="Description"
                  name={`projects.${index}.description`}
                  fullWidth
                />
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
