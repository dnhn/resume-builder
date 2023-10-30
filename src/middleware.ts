import { ROUTES } from 'constants/routes'
import { getDbItem } from 'database'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const {
    cookies,
    nextUrl: { pathname },
  } = request
  const token = cookies.get('accessToken')?.value
  const username = cookies.get('user')?.value
  const key = `session:${username}`

  try {
    const result = await getDbItem(key)
    const session = result.Item?.data

    if ((!session || !token) && pathname !== ROUTES.LOGIN) {
      return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url))
    }

    if (session && token && session === token && pathname === ROUTES.LOGIN) {
      return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url))
    }
  } catch {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/login', '/resume', '/build'],
}
