'use client';

import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface UseInstanceSocketOptions {
  instanceId: string;
}

export function useInstanceSocket({ instanceId }: UseInstanceSocketOptions) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'open' | 'close' | 'connecting' | 'refused'>('connecting');
  const [instanceStatus, setInstanceStatus] = useState<'CONNECTED' | 'DISCONNECTED' | 'CONNECTING' | 'REFUSED'>('CONNECTING');
  const [messages, setMessages] = useState<any[]>([]);
  const [qrcode , setQrCode] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socketIo = io({
      path: '/api/socket',
      transports: ['websocket'],
    });

    socketIo.on("connect", () => {
      setConnectionStatus("open");
      socketIo.emit('join', { room: instanceId });
      console.log(`✅ Entrou na sala ${instanceId}`);
    });

    socketIo.on("disconnect", () => {
      setConnectionStatus("close");
      console.warn("❌ Socket.IO desconectado");
    });

    socketIo.on("connect_error", () => {
      setConnectionStatus("refused");
    });

    socketIo.on('client:connection_status', (payload) => {
      if (payload.instance === instanceId) {
        setInstanceStatus(payload.clientStatus);
        console.log(`[${instanceId}] 🧭 Status atualizado:`, payload.status);
      }
    });

    socketIo.on(`MESSAGES_UPSERT:${instanceId}`, (data) => {
      console.log(`[${instanceId}] 📩 Nova mensagem:`, data);
      setMessages((prev) => [...prev, data]);
    });

    socketIo.on(`qrcode.updated:${instanceId}`, (data) => {
        setQrCode(data.base64);
      console.log(`[${instanceId}] 🔄 QR Code atualizado:`, data);
    });

    socketIo.onAny((event, ...args) => {
      console.log("📨 Evento recebido:", event, args);
    });

    socketRef.current = socketIo;
    setSocket(socketIo);

    return () => {
      socketIo.emit('leave', { room: instanceId });
      socketIo.disconnect();
    };
  }, [instanceId]);

  return {
    socket,
    connectionStatus,
    messages,
    qrcode,
    instanceStatus
  };
}