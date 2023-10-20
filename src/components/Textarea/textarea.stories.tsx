import React from 'react'
import Textarea from './Textarea'

export default {
  title: 'components/Textarea',
}

export const Default = () => {
  return (
    <div className="max-w-sm space-y-4">
      <Textarea placeholder="Message" fullWidth />
      <Textarea placeholder="Message" fullWidth invalid />
    </div>
  )
}

Default.story = {
  name: 'default',
}
