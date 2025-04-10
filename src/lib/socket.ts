'use client';

import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket && typeof window !== 'undefined') {
    socket = io('http://localhost:3000', {
      path: '/api/socket',
      transports: ['websocket'],
    });
  }

  return socket!;
};