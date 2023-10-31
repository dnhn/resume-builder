import { Button } from 'components/Button'

interface IFormCTA {
  addLabel: string
  handleAdd: VoidFunction
  handleCancel: VoidFunction
}

export const FormCTA = ({
  addLabel = 'Add',
  handleAdd,
  handleCancel,
}: IFormCTA) => (
  <div className="flex items-center justify-between">
    <Button appearance="secondary" size="sm" type="button" onClick={handleAdd}>
      {addLabel}
    </Button>
    <div className="space-x-2 text-right">
      <Button size="sm" type="button" onClick={handleCancel}>
        Cancel
      </Button>
      <Button appearance="primary" size="sm" type="submit">
        Save
      </Button>
    </div>
  </div>
)
