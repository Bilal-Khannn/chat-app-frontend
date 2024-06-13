export interface ICreateMessage {
    senderId: number | undefined;
    receiverId: number | undefined;
    content: string;
}

export interface IOneToOneChat {
    id: number;
    sender_id: number;
    sender_name: string;
    receiver_id: number;
    receiver_name: string;
}

export interface IMessage {
    content: string;
    id: number;
    sender_id: number;
    sender_name: string;
    timestamp: string;
}
