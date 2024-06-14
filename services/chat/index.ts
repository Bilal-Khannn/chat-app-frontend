import { socket } from '@/config/socket';
import { ICreateMessage, IMessage } from '@/interfaces/chat';
import { useConversation } from '@/hooks/chat';

// this service sends a new message to an existng conversation or initiates a new conversation
export async function sendMessageService(
    messageData: ICreateMessage | undefined
) {
    socket.emit('chatMessage', messageData);
}

// this service gets the direct message chats that we have initiated with other users
export async function getOneToOneChatService(userId: number | undefined) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/chat/one-to-one?userId=${userId}`,
        {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include'
        }
    );

    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.message);
    }

    return result;
}

// this service gets detail (messages) of a particular chat by ID
export async function getConversation(chatId: number | undefined) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/chat/conversation?chatId=${chatId}`,
        {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include'
        }
    );

    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.message);
    }

    return result;
}
