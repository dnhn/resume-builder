export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/',
  EDIT: '/edit',
  RESUME: '/resume',
}

export const API_ROUTES = {
  GET_RESUME: (id: string) => `/api/resume?id=${id}`,
  UPDATE_RESUME: (id: string) => `/api/resume?id=${id}`,
}
