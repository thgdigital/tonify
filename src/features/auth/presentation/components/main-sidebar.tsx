'use client'

import { Sidebar, SidebarFooter, SidebarHeader, SidebarHeaderTitle, SidebarMain, SidebarNav, SidebarNavHeader, SidebarNavHeaderTitle, SidebarNavLink, SidebarNavMain } from "@/features/auth/presentation/components/sidebar"
import { usePathname } from "next/navigation"
import {DashboardIcon, DesktopIcon } from '@radix-ui/react-icons'
import { UserDropdown } from "./user-dropdown"
import { Logo } from "./logo"


export function MainSidebar() {
    const pathName = usePathname()

    const isActive = (path: string) => {
        return pathName === path
    }

    return (
    <Sidebar>
        <SidebarHeader>
            <Logo/>
        </SidebarHeader>
        <SidebarMain className="flex flex-col flex-grow">
          <SidebarNav>
           <SidebarNavMain>
            <SidebarNavLink href="/dashboard" active= {isActive('/dashboard')}>
            <DashboardIcon className="w-3 h-3 mr-3"/>
                Dashboard
            </SidebarNavLink>
            <SidebarNavLink href="/instance" active= {isActive('/instance')}>
            <DesktopIcon className="w-3 h-3 mr-3"/>
                Minha Instância
            </SidebarNavLink>
           </SidebarNavMain>
          </SidebarNav>

          <SidebarNav className="mt-auto">
            <SidebarNavHeader>
              <SidebarNavHeaderTitle>
                Link extras
              </SidebarNavHeaderTitle>
            </SidebarNavHeader>
           <SidebarNavMain>
            <SidebarNavLink href="/">Precisa de ajuda</SidebarNavLink>
            <SidebarNavLink href="/">Site</SidebarNavLink>
           </SidebarNavMain>
          </SidebarNav>
        </SidebarMain>
        <SidebarFooter>
          <UserDropdown />
        </SidebarFooter>
      </Sidebar>
    ) 
}