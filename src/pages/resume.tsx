import { Layout } from 'components/Layout'
import { ROUTES } from 'constants/routes'
import { useAuthContext } from 'context/auth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Resume() {
  const { replace } = useRouter()
  const { isLogin, user } = useAuthContext()

  useEffect(() => {
    replace(isLogin ? ROUTES.RESUME_BY_ID(user) : ROUTES.LOGIN)
  }, [isLogin, replace, user])

  return <Layout> </Layout>
}
