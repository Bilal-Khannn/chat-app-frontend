import { useQuery } from '@tanstack/react-query';
import { getOneToOneChatService, getConversation } from '@/services/chat';
import { useLocalStorageUser } from '../auth';

const fetchOneToOneChat = async (userId: number | undefined) => {
    return await getOneToOneChatService(userId);
};

export const useOneToOneChat = () => {
    const { user } = useLocalStorageUser();

    return useQuery({
        queryKey: ['oneToOneChat', user?.id],
        queryFn: () => fetchOneToOneChat(user?.id),
        enabled: !!user,
        retry: false
    });
};

export const useConversation = (chatId: number | undefined) => {
    return useQuery({
        queryKey: ['conversation', chatId],
        queryFn: () => getConversation(chatId),
        enabled: !!chatId,
        retry: false
    });
};
