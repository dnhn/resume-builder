// @ts-ignore

export interface IResumeExperience {
  title: string
  company: string
  startDate: Date
  endDate?: Date
  description?: string
}

export interface IResumeProject {
  name: string
  link?: string
  description?: string
}

export interface IResumeEducation {
  school: string
  degree?: string
  field?: string
  startDate?: Date
  endDate?: Date
  description?: string
}

export interface IResumeLanguage {
  name: string
  proficiency?: 'basic' | 'conversational' | 'fluent' | 'native'
}

export interface IResume {
  name: string
  title?: string
  address?: string
  phoneNumber?: string
  email?: string
  website?: string
  intro: string
  experience: IResumeExperience[]
  projects: IResumeProject[]
  education: IResumeEducation[]
  skills: string[]
  languages: IResumeLanguage[]
}
