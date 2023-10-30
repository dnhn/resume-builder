import { createContext, isSSR } from '@dwarvesf/react-utils'
import { login as signIn } from 'api'
import axios from 'axios'
import { API_ROUTES, ROUTES } from 'constants/routes'
import { useRouter } from 'next/router'
import { useState, useCallback, useEffect } from 'react'
import { WithChildren } from 'types/common'
import { emitter } from 'utils/emitter'

interface AuthContextValues {
  isLogin: boolean
  login: (username: string, password: string) => Promise<any>
  logout: () => void
  user: string
}

const [Provider, useAuthContext] = createContext<AuthContextValues>({
  name: 'auth',
})

const tokenKey = 'df-token'
const userKey = 'df-user'
const getToken = () => window.localStorage.getItem(tokenKey)
const cleanAuth = () => {
  window.localStorage.removeItem(tokenKey)
  window.localStorage.removeItem(userKey)
}

const AuthContextProvider = ({ children }: WithChildren) => {
  const { pathname, replace } = useRouter()
  const [isLogin, setIsLogin] = useState(() => {
    return isSSR() ? false : Boolean(window.localStorage.getItem(tokenKey))
  })
  const [user, setUser] = useState(() => {
    return isSSR() ? '' : window.localStorage.getItem(userKey) || ''
  })

  const login = useCallback(async (username: string, password: string) => {
    try {
      const res = await signIn({ username, password })

      if (res.data) {
        await axios.put(API_ROUTES.CHECK_AUTH(username), {
          accessToken: res.data.accessToken,
        })
        setIsLogin(true)
        setUser(res.data.username)
        window.localStorage.setItem(tokenKey, res.data.accessToken)
        window.localStorage.setItem(userKey, res.data.username)
      }
    } catch {
      throw new Error('Incorrect username or password!')
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await axios.delete(API_ROUTES.CHECK_AUTH(user))
    } catch {
      //
    } finally {
      if (!pathname.startsWith(`${ROUTES.RESUME}/`)) {
        replace(ROUTES.LOGIN)
      }

      setIsLogin(false)
      setUser('')
      cleanAuth()
    }
  }, [pathname, replace, user])

  const checkSession = useCallback(async (user: string) => {
    try {
      await axios.post(API_ROUTES.CHECK_AUTH(user), {
        accessToken: getToken(),
      })
    } catch {
      emitter.emit('FORCE_LOGOUT')
    }
  }, [])

  useEffect(() => {
    if (isLogin) {
      checkSession(user)
    }
  }, [checkSession, isLogin, user])

  useEffect(() => {
    emitter.on('FORCE_LOGOUT', logout)
    return () => {
      emitter.off('FORCE_LOGOUT', logout)
    }
  }, [isLogin, logout])

  return (
    <Provider value={{ isLogin, login, logout, user }}>{children}</Provider>
  )
}

export { AuthContextProvider, useAuthContext, getToken }
