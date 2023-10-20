import { createElement, HTMLAttributes } from 'react'
import cx from 'classnames'
import styles from './ResumeHeading.style'

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
}

export const ResumeHeading: React.FC<HeadingProps> = (props) => {
  const { className, as = 'h2', ...rest } = props
  const baseClassName = styles({ size: as })

  return createElement(as, {
    className: cx(className, baseClassName),
    ...rest,
  })
}
