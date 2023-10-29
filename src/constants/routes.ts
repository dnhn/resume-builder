export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/',
  BUILD: '/build',
  RESUME: '/resume',
  RESUME_BY_ID: (id: string) => `/resume/${id}`,
}

export const API_ROUTES = {
  CHECK_AUTH: (username: string) => `/api/check-auth?username=${username}`,
  GET_RESUME: (id: string) => `/api/resume?id=${id}`,
  UPDATE_RESUME: (id: string) => `/api/resume?id=${id}`,
}
