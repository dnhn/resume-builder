import { IconHome } from 'components/icons/components/IconHome'
import { IconLinkSolid } from 'components/icons/components/IconLinkSolid'
import { IconPaperClip } from 'components/icons/components/IconPaperClip'
import { IconPencilSolid } from 'components/icons/components/IconPencilSolid'
import { ROUTES } from 'constants/routes'
import Link from 'next/link'
import cx from 'classnames'
import { useRouter } from 'next/router'
import { WithChildren } from 'types/common'
import { Logo } from 'components/Logo'
import { Header } from 'components/Header'
import { useAuthContext } from 'context/auth'
import { useEffect, useState } from 'react'

const menuItems = [
  { name: 'Dashboard', href: ROUTES.DASHBOARD, Icon: IconHome },
  { name: 'Create', href: ROUTES.FORMS, Icon: IconPencilSolid },
  { name: 'Résumé', href: ROUTES.RESUME, Icon: IconPaperClip },
  {
    name: 'GitHub',
    href: 'https://github.com/dnhn/resume-builder',
    Icon: IconLinkSolid,
  },
]

export const Layout = ({ children }: WithChildren) => {
  const { pathname } = useRouter()
  const [hydrated, setHydrated] = useState(false)

  const { isLogin } = useAuthContext()
  const { push } = useRouter()

  useEffect(() => {
    if (!isLogin) {
      push(ROUTES.LOGIN)
    } else {
      setHydrated(true)
    }
  }, [isLogin, push])

  if (!isLogin || !hydrated) {
    return null
  }

  return (
    <div className="flex h-full bg-gray-100">
      <aside className="w-72 fixed left-0 top-0 bg-gray-800 min-h-screen p-4 flex justify-between flex-col">
        <div className="space-y-5">
          <Logo hasText />
          <nav className="space-y-1">
            {menuItems.map(({ Icon, name, href }) => {
              const external = href.startsWith('http')
              return (
                <Link
                  key={name}
                  className={cx(
                    'flex w-full p-2 space-x-3 rounded-md',
                    'bg-transparent duration-200 transition-all',
                    {
                      'bg-gray-900 text-gray-300': pathname === href,
                      'text-gray-400 hover:text-gray-100': pathname !== href,
                    },
                  )}
                  href={href}
                  rel={external ? 'noopener' : undefined}
                  target={external ? '_blank' : undefined}
                >
                  <Icon className="w-6 h-6" /> <span>{name}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>
      <main className="flex-1 pl-72">
        <Header />
        <div className="px-8 py-6">
          <div className="flex space-y-6 flex-col max-w-7xl w-full mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
