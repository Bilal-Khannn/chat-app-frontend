'use client';

import { io } from 'socket.io-client';

export const socket = io('http://localhost:8000', { autoConnect: false });

// useful during development, so that any event received by the client will be printed in the console.
socket.onAny((event, ...args) => {
    console.log(event, args);
});
