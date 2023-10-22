import { getAuthMSW } from 'api/auth/auth.msw'

export const handlers = [...getAuthMSW()]
