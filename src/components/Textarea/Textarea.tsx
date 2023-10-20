import React from 'react'
import cx from 'classnames'
import styles from './Textarea.style'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  fullWidth?: boolean
  filled?: boolean
  readOnly?: boolean
  value?: string
  invalid?: boolean
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    const {
      fullWidth = false,
      disabled = false,
      invalid = false,
      className,
      ...rest
    } = props
    const baseStyles = styles({ fullWidth, invalid })
    const containerClassName = baseStyles.container()
    const textareaClassName = baseStyles.textarea()

    return (
      <div className={containerClassName}>
        <textarea
          className={cx(textareaClassName, className)}
          rows={3}
          {...rest}
          ref={ref}
          disabled={disabled}
        />
      </div>
    )
  },
)

export default Textarea
