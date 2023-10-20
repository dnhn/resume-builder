import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from 'components/DropdownMenu'
import { IconLogout } from 'components/icons/components/IconLogout'
import { Text } from 'components/Text'
import { useAuthContext } from 'context/auth'
import React from 'react'

export const Header = () => {
  const { logout, user } = useAuthContext()

  return (
    <header className="mx-auto flex justify-end py-2 px-5">
      <DropdownMenu>
        <DropdownMenuTrigger
          className="inline-flex items-center px-5 py-3 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          data-testid="profile-button"
        >
          <Text as="span" className="text-sm text-gray-600">
            {user || 'User'}
          </Text>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem data-testid="logout-button" onClick={logout}>
            <IconLogout className="mr-2 h-5 w-5" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
