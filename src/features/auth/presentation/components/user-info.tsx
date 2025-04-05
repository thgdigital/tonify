'use client'

import { api } from "@/igniter.client";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";

interface UserInfoProps {
  className?: string;
  showEmail?: boolean;
  variant?: 'default' | 'compact';
  showAvatar?: boolean;
  avatarSize?: 'sm' | 'md' | 'lg';
}

export default function UserInfo({ 
  className = "", 
  showEmail = true, 
  variant = 'default',
  showAvatar = false,
  avatarSize = 'md'
}: UserInfoProps) {
  // Estado para controlar se estamos no cliente
  const [isClient, setIsClient] = useState(false);
  
  // Efeito para marcar quando estamos no cliente
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Consulta de dados do usuário
  const { data: userResponse, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      return await api.auth.user.query()
    },
    staleTime: 1000 * 60 * 5, // Dados ficam frescos por 5 minutos
    refetchOnWindowFocus: false, // Não refetch ao focar na janela
    // Desabilitar a consulta no servidor para evitar problemas de hidratação
    enabled: isClient,
  });
  
  const userData = userResponse?.data;
  
  // Função para gerar iniciais do nome
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  // Função para obter o tamanho do avatar
  const getAvatarSize = () => {
    switch (avatarSize) {
      case 'sm': return 'h-6 w-6';
      case 'lg': return 'h-10 w-10';
      default: return 'h-8 w-8';
    }
  };
  
  // Renderização inicial no servidor (sem dados)
  if (!isClient) {
    return (
      <div className={`flex items-center ${className}`}>
        {showAvatar && (
          <Avatar className={`${getAvatarSize()} mr-2`}>
            <AvatarFallback>...</AvatarFallback>
          </Avatar>
        )}
        <div>
          <p className="text-sm font-medium leading-none">Carregando...</p>
          {showEmail && <p className="text-xs leading-none text-muted-foreground">...</p>}
        </div>
      </div>
    );
  }
  
  if (isLoading) {
    return (
      <div className={`flex items-center ${className}`}>
        {showAvatar && (
          <Avatar className={`${getAvatarSize()} mr-2`}>
            <AvatarFallback>...</AvatarFallback>
          </Avatar>
        )}
        <div>
          <p className="text-sm font-medium leading-none">Carregando...</p>
          {showEmail && <p className="text-xs leading-none text-muted-foreground">...</p>}
        </div>
      </div>
    );
  }
  
  if (!userData) {
    return (
      <div className={`flex items-center ${className}`}>
        {showAvatar && (
          <Avatar className={`${getAvatarSize()} mr-2`}>
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        )}
        <div>
          <p className="text-sm font-medium leading-none">Usuário</p>
          {showEmail && <p className="text-xs leading-none text-muted-foreground">Não autenticado</p>}
        </div>
      </div>
    );
  }
  
  const userName = userData.name || "Usuário";
  const userEmail = userData.email || "email@example.com";
  const userImage = userData.image || "/avatars/01.png";
  const initials = getInitials(userName);
  
  if (variant === 'compact') {
    return (
      <div className={`flex items-center ${className}`}>
        {showAvatar && (
          <Avatar className={`${getAvatarSize()} mr-2`}>
            <AvatarImage src={userImage} alt={userName} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        )}
        <div>
          <p className="text-sm font-medium leading-none">{userName}</p>
          {showEmail && <p className="text-xs leading-none text-muted-foreground">{userEmail}</p>}
        </div>
      </div>
    );
  }
  
  return (
    <div className={`flex items-center ${className}`}>
      {showAvatar && (
        <Avatar className={`${getAvatarSize()} mr-2`}>
          <AvatarImage src={userImage} alt={userName} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      )}
      <div className="flex flex-col space-y-1">
        <p className="text-sm font-medium leading-none">{userName}</p>
        {showEmail && <p className="text-xs leading-none text-muted-foreground">{userEmail}</p>}
      </div>
    </div>
  );
}