import { tv } from 'tailwind-variants'

const styles = tv({
  slots: {
    container: 'relative inline-flex',
    textarea: [
      'focus:outline-none bg-transparent border rounded-lg px-3 py-2 appearance-none',
      'bg-white placeholder-gray-500',
      'text-sm appearance-none w-full block',
    ],
  },
  variants: {
    fullWidth: {
      true: {
        container: 'w-full',
      },
    },
    invalid: {
      true: {
        textarea: 'border-red-600 text-red-900',
      },
      false: {
        textarea:
          'border-gray-300 text-gray-900 focus:ring-pink-500 focus:border-pink-500 focus:ring-1',
      },
    },
  },
})

export default styles
