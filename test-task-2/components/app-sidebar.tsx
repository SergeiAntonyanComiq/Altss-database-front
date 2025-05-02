'use client'

import Apartment from '@/components/icons/apartment'
import Favorites from '@/components/icons/favorites'
import Logo from '@/components/icons/logo'
import Orders from '@/components/icons/orders'
import Search from '@/components/icons/search'
import User from '@/components/icons/user'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'

const menu = [
  {
    title: 'Companies',
    url: '/',
    icon: Apartment,
  },
  {
    title: 'Persons',
    url: '#',
    icon: User,
    showSeparator: true,
  },
  {
    title: 'My Orders',
    url: '#',
    icon: Orders,
  },
  {
    title: 'Favorites',
    url: '#',
    icon: Favorites,
  },
  {
    title: 'Saved Searches',
    url: '#',
    icon: Search,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { open } = useSidebar()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className={cn(open ? 'justify-between' : 'justify-center')}>
        {open && <Logo />}
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menu.map((item) => (
                <Fragment key={item.title}>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive={pathname === item.url} asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  {item.showSeparator && <SidebarSeparator className={cn(open && 'ml-8')} />}
                </Fragment>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex cursor-pointer items-center gap-4">
              <Avatar>
                <AvatarImage src="avatar.png" />
              </Avatar>
              {open && <span className="text-[#637381]">User Name</span>}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[185px]" align="start">
            <DropdownMenuItem>Sign-out</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Contact Support</DropdownMenuItem>
            <DropdownMenuItem>Open My Profile</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
