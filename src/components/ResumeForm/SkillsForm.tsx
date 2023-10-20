import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'components/Button'
import { FormInput } from 'components/FormInput'
import { Text } from 'components/Text'
import { Dispatch, SetStateAction } from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { z } from 'zod'

const skillsSchema = z.object({
  skills: z.string(),
})

type SkillsSchema = z.infer<typeof skillsSchema>

export function SkillsForm({
  data,
  handleSave,
  onComplete,
}: {
  data: string[]
  handleSave: Dispatch<SetStateAction<string[]>>
  onComplete: VoidFunction
}) {
  const form = useForm<SkillsSchema>({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      skills: data.join(', ') || '',
    },
  })

  const { handleSubmit } = form

  const onSubmit: SubmitHandler<SkillsSchema> = (data) => {
    let skills = data.skills.split(',')
    skills = skills.map((skill) => skill.trim())

    handleSave(skills)
    onComplete()
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormInput label="Skills" name="skills" fullWidth />
          <Text as="small">Comma-separated values</Text>
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
