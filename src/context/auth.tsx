import { createContext, isSSR } from '@dwarvesf/react-utils'
import { useCallback, useEffect, useState } from 'react'
import { WithChildren } from 'types/common'
import { login as signIn } from 'api'
import { emitter } from 'utils/emitter'
import { API_ROUTES } from 'constants/routes'
import axios from 'axios'

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
      setIsLogin(false)
      setUser('')
      cleanAuth()
    }
  }, [user])

  const checkSession = useCallback(async () => {
    try {
      await axios.post(API_ROUTES.CHECK_AUTH(user), { accessToken: getToken() })
    } catch {
      emitter.emit('FORCE_LOGOUT')
    }
  }, [user])

  useEffect(() => {
    checkSession()
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
