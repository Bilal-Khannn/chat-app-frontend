import { socket } from '@/config/socket';
import { ICreateMessage } from '@/interfaces/chat';

export async function sendMessageService(messageData: ICreateMessage) {
    // Ensure the socket is connected
    if (!socket.connected) {
        socket.connect();
    }

    // Join the room for the current user (assuming currentUserId is available)
    const currentUserId = messageData.senderId;
    socket.emit('joinRoom', currentUserId);

    // Send the chat message
    socket.emit('chatMessage', messageData);
}

// Optionally, you can also set up a listener for incoming messages
socket.on('chatMessage', (message) => {
    console.log('New message received:', message);
    // Handle the incoming message, e.g., update the UI
});
