import { tv } from 'tailwind-variants'

const styles = tv({
  base: 'text-lg leading-snug mt-0',
  variants: {
    size: {
      h2: 'text-3xl',
      h3: 'text-2xl uppercase',
      h4: 'text-xl',
      h5: 'text-lg',
      h6: 'text-sm',
    },
  },
  defaultVariants: {
    size: 'h2',
  },
  compoundVariants: [
    {
      size: ['h2', 'h3'],
      className: 'font-bold',
    },
    {
      size: ['h4', 'h6'],
      className: 'font-medium',
    },
  ],
})

export default styles
