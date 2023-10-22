// @ts-ignore

export interface IResumeInfo {
  name: string
  title?: string
  address?: string
  phoneNumber?: string
  email?: string
  website?: string
}

export interface IResumeExperience {
  title: string
  company: string
  startDate: string
  endDate?: string
  description?: string
}

export interface IResumeProject {
  name: string
  url?: string
  description?: string
}

export interface IResumeEducation {
  school: string
  degree?: string
  field?: string
  startDate?: string
  endDate?: string
  current: string[]
  description?: string
}

export interface IResumeLanguage {
  name: string
  proficiency?: string
}

export interface IResume {
  info: IResumeInfo
  intro: string
  experience: IResumeExperience[]
  projects: IResumeProject[]
  education: IResumeEducation[]
  skills: string[]
  languages: IResumeLanguage[]
}
