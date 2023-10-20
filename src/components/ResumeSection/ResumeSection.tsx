import { HTMLAttributes } from 'react'
import cx from 'classnames'

export const ResumeSection = ({
  children,
  ...other
}: HTMLAttributes<HTMLElement>) => {
  return <section className={cx('py-6', other.className)}>{children}</section>
}
