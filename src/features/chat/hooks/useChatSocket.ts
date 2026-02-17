import { useEffect, useState, useCallback, useRef } from 'react';
import { useAuthStore } from '@/stores';
import { getChatSocketService } from '../services/chatSocket';
import type { ChatMessageSubscription, SendMessagePayload } from '../types/chat.types';
import { useQueryClient } from '@tanstack/react-query';
import type { Frame } from '@stomp/stompjs';

interface UseChatSocketOptions {
  roomId?: number;
  onMessage?: (message: ChatMessageSubscription) => void;
}

export function useChatSocket({ roomId, onMessage }: UseChatSocketOptions = {}) {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const queryClient = useQueryClient();
  const socketServiceRef = useRef<ReturnType<typeof getChatSocketService> | null>(null);
  const onMessageRef = useRef(onMessage);
  const { accessToken } = useAuthStore();

  // 최신 콜백 유지
  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  // 콜백 생성 로직을 useCallback으로 추출
  const createCallbacks = useCallback(() => ({
    onConnected: () => {
      console.log('[DEBUG] Socket Connected');
      setIsConnected(true);
      setIsConnecting(false);
      setError(null);
    },
    onDisconnected: () => {
      console.log('[DEBUG] Socket Disconnected');
      setIsConnected(false);
    },
    onError: (frame: Frame) => {
      console.error('[DEBUG] Socket Error:', frame.headers?.message);
      setError(new Error(frame.headers?.message || 'WebSocket error'));
      setIsConnecting(false);
    },
    onMessage: (message: ChatMessageSubscription) => {
      console.log('[DEBUG] Message Received:', message);
      // 메시지 캐시 무효화
      if (message.room_id) {
        queryClient.invalidateQueries({
          queryKey: ['chat', 'messages', message.room_id],
        });
      }

      // 채팅방 목록 무효화 (last_message, unread_count 업데이트)
      queryClient.invalidateQueries({
        queryKey: ['chat', 'rooms'],
      });

      onMessageRef.current?.(message);
    },
  }), [queryClient]);

  // Initialize socket service
  useEffect(() => {
    console.log('[DEBUG] Service Init useEffect - accessToken:', !!accessToken);

    if (!accessToken) {
      console.log('[DEBUG] No accessToken, skipping service init');
      return;
    }

    // 서비스 인스턴스가 없으면 초기화
    if (!socketServiceRef.current) {
      console.log('[DEBUG] Creating new socket service instance');
      socketServiceRef.current = getChatSocketService(createCallbacks());
    } else {
      // 기존 인스턴스가 있으면 콜백만 업데이트
      console.log('[DEBUG] Updating callbacks for existing service');
      socketServiceRef.current.setCallbacks(createCallbacks());
    }

    return () => {
      // Cleanup: don't destroy on unmount
    };
  }, [accessToken, createCallbacks]);

  // Connect/Disconnect based on auth
  useEffect(() => {
    console.log('[DEBUG] Connection useEffect - accessToken:', !!accessToken, 'isConnected:', isConnected, 'isConnecting:', isConnecting);

    if (!socketServiceRef.current || !accessToken) {
      console.log('[DEBUG] Missing service or token, skipping connect');
      return;
    }

    if (accessToken && !isConnected && !isConnecting) {
      console.log('[DEBUG] Attempting socket connection...');
      setIsConnecting(true);
      socketServiceRef.current.connect(accessToken);
    }

    return () => {
      if (!accessToken) {
        console.log('[DEBUG] No token, disconnecting');
        socketServiceRef.current?.disconnect();
      }
    };
  }, [accessToken, isConnected, isConnecting]);

  // Subscribe to room when roomId changes
  useEffect(() => {
    console.log('[DEBUG] Room Subscribe useEffect - roomId:', roomId, 'isConnected:', isConnected);

    if (!socketServiceRef.current || !roomId || !isConnected) {
      console.log('[DEBUG] Missing service/room/connection, skipping subscribe');
      return;
    }

    console.log('[DEBUG] Subscribing to room:', roomId);
    socketServiceRef.current.subscribeToRoom(roomId);

    return () => {
      if (socketServiceRef.current && roomId) {
        console.log('[DEBUG] Unsubscribing from room:', roomId);
        socketServiceRef.current.unsubscribeFromRoom(roomId);
      }
    };
  }, [roomId, isConnected]);

  // Send message function
  const sendMessage = useCallback(
    (payload: SendMessagePayload) => {
      if (!socketServiceRef.current) {
        throw new Error('Socket service not initialized');
      }

      socketServiceRef.current.sendMessage(payload);
    },
    []
  );

  // Force reconnect function
  const reconnect = useCallback(() => {
    if (!socketServiceRef.current || !accessToken) return;

    setIsConnecting(true);
    socketServiceRef.current.forceReconnect(accessToken);
  }, [accessToken]);

  return {
    isConnected,
    isConnecting,
    error,
    sendMessage,
    reconnect,
  };
}
