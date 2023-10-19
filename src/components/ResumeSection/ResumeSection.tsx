import { HTMLAttributes } from 'react'

export const ResumeSection = ({ children }: HTMLAttributes<HTMLElement>) => {
  return <section className="py-6">{children}</section>
}
