export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/',
  EDIT: '/edit',
  RESUME: '/resume',
  RESUME_BY_ID: (id: string) => `/resume/${id}`,
}

export const API_ROUTES = {
  GET_RESUME: (id: string) => `/api/resume?id=${id}`,
  UPDATE_RESUME: (id: string) => `/api/resume?id=${id}`,
}
