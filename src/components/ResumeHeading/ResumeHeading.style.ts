import { tv } from 'tailwind-variants'

const styles = tv({
  base: 'text-lg leading-snug mt-0',
  variants: {
    size: {
      h1: 'text-4xl',
      h2: 'text-2xl uppercase',
      h3: 'text-xl',
      h4: 'text-lg',
      h5: 'text-sm',
    },
  },
  defaultVariants: {
    size: 'h2',
  },
  compoundVariants: [
    {
      size: ['h1', 'h2'],
      className: 'font-bold',
    },
    {
      size: ['h3', 'h5'],
      className: 'font-medium',
    },
  ],
})

export default styles
