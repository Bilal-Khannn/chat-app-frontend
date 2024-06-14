import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getOneToOneChatService, getConversation } from '@/services/chat';
import { useLocalStorageUser } from '../auth';
import { IMessage } from '@/interfaces/chat';

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
    const queryClient = useQueryClient();

    const { data, ...rest } = useQuery({
        queryKey: ['conversation', chatId],
        queryFn: async () => {
            if (chatId === undefined) return [];
            const response = await getConversation(chatId);
            return response.data;
        },
        enabled: !!chatId,
        retry: false
    });

    const addMessageToConversation = (
        newMessage: IMessage,
        chatIdParam: number | undefined
    ) => {
        queryClient.setQueryData(
            ['conversation', chatIdParam ? chatIdParam : chatId],
            (oldData: IMessage[] | undefined) => {
                if (oldData) {
                    return [...oldData, newMessage];
                } else {
                    return [newMessage];
                }
            }
        );
    };

    return { data, addMessageToConversation, ...rest };
};
