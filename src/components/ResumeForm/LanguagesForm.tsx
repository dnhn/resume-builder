import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'components/Button'
import { FormInput } from 'components/FormInput'
import { FormSelect } from 'components/FormSelect'
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form'
import { IResumeLanguage } from 'types/resume'
import { z } from 'zod'

const PROFICIENCY = ['basic', 'conversational', 'fluent', 'native']

const languagesSchema = z.object({
  languages: z.array(
    z.object({
      name: z.string().trim().min(1, 'Language is required'),
      proficiency: z.string().trim(),
    }),
  ),
})

type LanguagesSchema = z.infer<typeof languagesSchema>

const newField = { name: '', proficiency: '' }

export function LanguagesForm({
  data,
  handleSave,
  onComplete,
}: {
  data: IResumeLanguage[]
  handleSave: (languages: IResumeLanguage[]) => void
  onComplete: VoidFunction
}) {
  const form = useForm<LanguagesSchema>({
    resolver: zodResolver(languagesSchema),
    defaultValues: {
      languages: data || [],
    },
  })

  const { control, handleSubmit } = form

  const { append, fields, remove } = useFieldArray({
    control,
    name: 'languages',
  })

  const onSubmit: SubmitHandler<LanguagesSchema> = (data) => {
    handleSave(data.languages)
    onComplete()
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <Button
            appearance="secondary"
            size="sm"
            type="button"
            onClick={() => append(newField)}
          >
            Add language
          </Button>
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label="Language"
                  name={`languages.${index}.name`}
                  rules={{ required: 'Required' }}
                  fullWidth
                />
                <FormSelect
                  className="capitalize text-gray-900"
                  label="Proficiency"
                  name={`languages.${index}.proficiency`}
                >
                  <option aria-label="Blank value" value="" />
                  {PROFICIENCY.map((prof) => (
                    <option key={prof} value={prof}>
                      {prof}
                    </option>
                  ))}
                </FormSelect>
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
