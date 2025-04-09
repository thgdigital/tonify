'use client'

import { useEffect, useState } from "react";
import DashBoardPage, {
  DashBoardPageHeader,
  DashBoardPageHeaderTitle,
  DashBoardPageMain,
} from "@/features/auth/presentation/components/dashboard-page";
import { FormInstance } from "@/features/instance/presentation/components/form-instance";
import { CardInstance } from "@/features/instance/presentation/components/card-instance";
import { api, useQueryClient } from "@/igniter.client";
import { Instance } from "@/features/instance/instance.interface";
import {getSocket} from "@/lib/socket"

export default function Page() {
  const queryClient = useQueryClient();
  const { data: instances } = api.instance.getUserId.useQuery();

  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'connecting'>('connecting')
  const [messages, setMessages] = useState<string[]>([])
  useEffect(() => {
    const socket = getSocket()
      socket.on("connect", () => {
        setConnectionStatus("connected");
        console.log("✅ Socket.IO conectado");
      })
      socket.on("disconnect", () => {
        setConnectionStatus("disconnected");
        console.warn("❌ Socket.IO desconectado");
      })
      socket.on("messages.upsert", (message) => {
        console.log("📥 Evento recebido:", event);
      })
      socket.emit("message", "Olá do cliente")
      socket.emit("message", "Olá do cliente")
      socket.emit("message", "Olá do cliente")   
  
      // Adicionar listeners
      
      const onDisconnect = () => {
          setConnectionStatus("disconnected");
          console.warn("❌ Socket.IO desconectado");
        };
      return () => {
        socket?.off("disconnect", onDisconnect);
        socket?.disconnect();
      }
    }, [])

  return (
    <DashBoardPage>
      <DashBoardPageHeader>
        <DashBoardPageHeaderTitle>Minha Instância</DashBoardPageHeaderTitle>
      </DashBoardPageHeader>
      <DashBoardPageMain>
        
        <div
          className={`px-6 py-3 font-medium rounded-t-xl ${
            connectionStatus === 'connected'
              ? 'bg-green-50 text-green-700 border-b border-green-100'
              : connectionStatus === 'disconnected'
              ? 'bg-red-50 text-red-700 border-b border-red-100'
              : 'bg-yellow-50 text-yellow-700 border-b border-yellow-100'
          }`}
        >
          Status: {connectionStatus === 'connected'
            ? '🟢 Conectado'
            : connectionStatus === 'disconnected'
            ? '🔴 Desconectado'
            : '🟡 Conectando...'}
        </div>

        <br /><br />
        {instances && instances.length > 0 ? (
          instances.map((instance: Instance) => (
            <div key={instance.id}>
              <CardInstance instance={instance} />
            </div>
          ))
        ) : (
          <FormInstance />
        )}
      </DashBoardPageMain>
    </DashBoardPage>
  );
}