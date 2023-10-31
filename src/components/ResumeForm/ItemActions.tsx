import { Button } from 'components/Button'
import { IconArrowSmDown } from 'components/icons/components/IconArrowSmDown'
import { IconArrowSmUp } from 'components/icons/components/IconArrowSmUp'
import { IconClose } from 'components/icons/components/IconClose'

interface IFormActions {
  index: number
  lastIndex: number
  moveUp: VoidFunction
  moveDown: VoidFunction
  remove: VoidFunction
}

export const ItemActions = ({
  index,
  lastIndex,
  moveDown,
  moveUp,
  remove,
}: IFormActions) => (
  <div className="flex items-center justify-between">
    <div className="space-x-2">
      {index > 0 && (
        <Button
          className="!rounded-full !p-2"
          size="sm"
          title="Move up"
          type="button"
          onClick={moveUp}
        >
          <IconArrowSmUp />
        </Button>
      )}
      {index < lastIndex && (
        <Button
          className="!rounded-full !p-2"
          size="sm"
          title="Move down"
          type="button"
          onClick={moveDown}
        >
          <IconArrowSmDown />
        </Button>
      )}
    </div>
    <Button
      appearance="secondary"
      className="!rounded-full !p-2"
      size="sm"
      title="Remove"
      type="button"
      onClick={remove}
    >
      <IconClose />
    </Button>
  </div>
)
