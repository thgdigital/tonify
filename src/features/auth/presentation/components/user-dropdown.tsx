'use client'

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components//ui/avatar"

  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

  import {ExitIcon } from '@radix-ui/react-icons'
import UserInfo from "./user-info"
import { useState, useEffect } from "react"
import { api } from "@/igniter.client";
import { redirect } from "next/navigation"
  
export function UserDropdown() {
  // Estado para controlar se estamos no cliente
  const [isClient, setIsClient] = useState(false);
  const auth = api.auth.signOut.useMutation({
    onRequest(request) {
      redirect('/auth')
    },
  });

  // Renderização no cliente (com interatividade)
    function handleLogout() {
      auth.mutate();
    }  
  
  // Efeito para marcar quando estamos no cliente
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Renderização inicial no servidor (sem interatividade)
  if (!isClient) {
    return (
      <div className="relative h-8 w-8 flex items-center justify-between w-full space-x-2 !px-0">
        <UserInfo variant="compact" className="flex-1" showAvatar={true} avatarSize="sm" />
      </div>
    );
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link"
         className="relative h-8 w-8 flex items-center justify-between w-full space-x-2 !px-0">
          <UserInfo variant="compact" className="flex-1" showAvatar={true} avatarSize="sm" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <UserInfo showAvatar={true} avatarSize="md" />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Configurações
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
          </DropdownMenuItem>
       
          <DropdownMenuItem>New Team</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
        <ExitIcon className="w-3 h-3 mr-3"/>
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}