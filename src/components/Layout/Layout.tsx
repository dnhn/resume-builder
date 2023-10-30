import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import cx from 'classnames'

import { IconHome } from 'components/icons/components/IconHome'
import { IconLinkSolid } from 'components/icons/components/IconLinkSolid'
import { IconPaperClip } from 'components/icons/components/IconPaperClip'
import { IconPencilSolid } from 'components/icons/components/IconPencilSolid'
import { ROUTES } from 'constants/routes'
import { WithChildren } from 'types/common'
import { Logo } from 'components/Logo'
import { useAuthContext } from 'context/auth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'components/DropdownMenu'
import { IconLogout } from 'components/icons/components/IconLogout'

const menuItems = [
  { name: 'Dashboard', href: ROUTES.DASHBOARD, Icon: IconHome },
  { name: 'Résumé', href: ROUTES.RESUME, Icon: IconPaperClip },
  { name: 'Build', href: ROUTES.BUILD, Icon: IconPencilSolid },
  {
    name: 'GitHub',
    href: 'https://github.com/dnhn/resume-builder',
    Icon: IconLinkSolid,
  },
]

export const Layout = ({ children }: WithChildren) => {
  const { pathname } = useRouter()
  const [hydrated, setHydrated] = useState(false)
  const { isLogin, logout, user } = useAuthContext()

  useEffect(() => {
    setHydrated(true)
  }, [])

  if (!hydrated) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {isLogin && (
        <>
          <aside className="fixed top-0 left-0 flex h-full w-52 flex-col justify-between bg-gray-800 p-4 xl:w-72">
            <div className="space-y-5">
              <Logo hasText />
              <nav className="space-y-1">
                {menuItems.map(({ Icon, name, href }) => {
                  const external = href.startsWith('http')
                  return (
                    <Link
                      key={name}
                      className={cx(
                        'flex w-full space-x-3 rounded-md p-2',
                        'bg-transparent transition-all duration-200',
                        {
                          'bg-gray-900 text-gray-300':
                            href === '/'
                              ? pathname === href
                              : pathname.startsWith(href),
                          'text-gray-400 hover:text-gray-100':
                            href === '/'
                              ? pathname !== href
                              : !pathname.startsWith(href),
                        },
                      )}
                      href={href}
                      rel={external ? 'noopener noreferrer' : undefined}
                      target={external ? '_blank' : undefined}
                    >
                      <Icon className="h-6 w-6" /> <span>{name}</span>
                    </Link>
                  )
                })}
              </nav>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger
                className="w-full cursor-pointer whitespace-nowrap rounded-md border border-transparent bg-gray-500 px-5 py-3 text-center text-sm font-medium leading-none text-white shadow-sm transition duration-200 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                data-testid="profile-button"
              >
                {user || 'User'}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-32">
                <DropdownMenuItem data-testid="logout-button" onClick={logout}>
                  <IconLogout className="mr-2 h-5 w-5" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </aside>
          <div className="w-52 xl:w-72" />
        </>
      )}
      <main className="flex-1">
        <div className="px-4 py-8 sm:px-8 sm:py-16">
          <div className="mx-auto flex w-full max-w-7xl flex-col space-y-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
