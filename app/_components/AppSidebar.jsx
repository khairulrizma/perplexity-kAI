'use client'
import { Button } from '@/components/ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
  useUser,
} from '@clerk/nextjs'
import { Compass, GalleryHorizontalEnd, LogIn, Search } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'

const MenuOptions = [
  {
    title: 'Home',
    icon: Search,
    path: '/',
  },
  {
    title: 'Discover',
    icon: Compass,
    path: '/discover',
  },
  {
    title: 'Library',
    icon: GalleryHorizontalEnd,
    path: '/library',
  },
  {
    title: 'Sign In',
    icon: LogIn,
    path: '/login',
  },
]

function AppSidebar() {
  //use react hook called pathName
  const path = usePathname()
  const { user } = useUser()

  return (
    <Sidebar>
      <SidebarHeader className='bg-accent flex items-center justify-center py-5'>
        <Image src='/logo.png' alt='logo' width={150} height={100} />
      </SidebarHeader>

      <SidebarContent className='bg-accent'>
        <SidebarGroup />
        <SidebarContent>
          <SidebarMenu>
            {MenuOptions.map((menu, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton
                  asChild
                  className={`p-5 py-6 hover:bg-transparent hover:font-bold ${
                    path === menu.path ? 'font-bold' : 'font-normal'
                  }`}
                >
                  <a href={menu.path} className='flex items-center gap-3'>
                    <menu.icon className='h-8 w-8' />
                    <span className='text-md'>{menu.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          {!user ? (
            <SignUpButton mode='modal'>
              <Button className={'rounded-full mx-4 mt-4 cursor-pointer'}>
                Sign Up
              </Button>
            </SignUpButton>
          ) : (
            <SignOutButton>
              <Button className={'rounded-full mx-4 mt-4 cursor-pointer'}>
                Logout
              </Button>
            </SignOutButton>
          )}
        </SidebarContent>
        <SidebarGroup />
      </SidebarContent>

      <SidebarFooter className='bg-accent p-4 text-sm text-gray-800'>
        © 2025 k-AI by Khairul
        <div className={'py-3 flex flex-col'}>
          <h2 className='text-gray-800'> You can try now</h2>
          <span className='text-gray-700'>
            Upgrade for image upload powered by AI
          </span>
        </div>
        <Button variant={'secondary'} className='font-bold cursor-pointer'>
          Learn More
        </Button>
        <UserButton></UserButton>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
