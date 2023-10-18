import { tv } from 'tailwind-variants'

const styles = tv({
  base: 'text-lg leading-snug',
  variants: {
    size: {
      h2: 'text-3xl',
      h3: 'text-2xl uppercase',
      h4: 'text-xl font-medium',
      h5: 'text-lg',
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
  ],
})

export default styles
