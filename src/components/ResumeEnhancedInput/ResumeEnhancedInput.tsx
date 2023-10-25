import { ReactNode } from 'react'

export function ResumeEnhancedInput({
  field,
  control,
}: {
  field: ReactNode
  control: ReactNode
}) {
  return (
    <div className="relative">
      {field}
      <div className="absolute bottom-2 left-1/2 z-[1] -translate-x-1/2">
        {control}
      </div>
    </div>
  )
}
