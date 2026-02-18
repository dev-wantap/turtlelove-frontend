import { chatApi } from '../api/chatApi';
import { queryKeys } from '@/shared/api/queryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUIStore } from '@/stores/uiStore';

export function useLeaveChatRoom() {
  const queryClient = useQueryClient();
  const addToast = useUIStore((state) => state.addToast);

  const mutation = useMutation({
    mutationFn: (roomId: number) => chatApi.leaveRoom(roomId),

    onSuccess: () => {
      // 채팅방 목록 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: queryKeys.chat.rooms(),
      });

      addToast({
        message: '채팅방에서 나갔습니다.',
        variant: 'success',
      });
    },

    onError: (error: any) => {
      addToast({
        message: error.response?.data?.message || '채팅방 나가기에 실패했습니다.',
        variant: 'error',
      });
    },
  });

  return {
    leaveRoom: mutation.mutate,
    leaveRoomAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
