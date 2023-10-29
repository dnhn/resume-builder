import { zodResolver } from '@hookform/resolvers/zod'
import cx from 'classnames'
import { Button } from 'components/Button'
import { Card } from 'components/Card'
import { FormInput } from 'components/FormInput'
import { Heading } from 'components/Heading'
import { Logo } from 'components/Logo'
import { toast } from 'components/Toast'
import { ROUTES } from 'constants/routes'
import { useAuthContext } from 'context/auth'
import { Raleway } from 'next/font/google'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'

const fontFamily = Raleway({
  weight: ['400', '500'],
  subsets: ['latin'],
})
const loginFormDefaultValues = {
  username: process.env.NEXT_PUBLIC_USERNAME ?? '',
  password: process.env.NEXT_PUBLIC_PASSWORD ?? '',
}
const validationSchema = z.object({
  username: z.string().trim(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/\d/, {
      message: 'Password must contain at least 1 numeric digit',
    }),
})

const LoginPage = () => {
  const { push } = useRouter()
  const { login, isLogin } = useAuthContext()
  const [isLoading, setIsLoading] = useState(false)
  const formInstance = useForm({
    defaultValues: loginFormDefaultValues,
    resolver: zodResolver(validationSchema),
  })
  const { handleSubmit } = formInstance

  const onSubmit = async (data: typeof loginFormDefaultValues) => {
    setIsLoading(true)
    try {
      await login(data.username, data.password)
    } catch {
      toast.error({ title: 'Invalid username or password' })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isLogin) {
      push(ROUTES.DASHBOARD)
    }
  }, [isLogin, push])

  return (
    <div
      className={cx(
        'flex min-h-screen w-full flex-col items-center justify-center space-y-8 bg-gray-100 pt-8 pb-28',
        fontFamily.className,
      )}
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-6 scale-125 transform">
          <Logo />
        </div>
        <div className="space-y-1">
          <Heading as="h3">Sign in to your account</Heading>
        </div>
      </div>
      <Card className="w-full max-w-[460px] !p-10">
        <FormProvider {...formInstance}>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              label="Username"
              name="username"
              placeholder="Username"
              rules={{ required: 'Required' }}
              autoFocus
              fullWidth
            />
            <FormInput
              label="Password"
              name="password"
              placeholder="Password"
              rules={{ required: 'Required' }}
              type="password"
              fullWidth
            />

            <Button
              appearance="primary"
              disabled={isLoading}
              loading={isLoading}
              type="submit"
              fullWidth
            >
              Sign in
            </Button>
          </form>
        </FormProvider>
      </Card>
      <Link
        className="font-bold"
        href="https://github.com/dnhn/resume-builder"
        rel="noopener noreferrer"
        target="_blank"
      >
        GitHub
      </Link>
    </div>
  )
}

export default LoginPage
