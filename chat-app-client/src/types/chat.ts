export type ChatMember = {
  user: {
    id: number;
    userName: string;
    name: string | null;
  };
};

export type LastMessage = {
  text: string;
  senderId: number;
  senderName: string;
  sentAt: string;
} | null;

export type Chat = {
  id: number;
  name: string | null;
  isGroup: boolean;
  pic: string | null;
  code: string | null;
  members: ChatMember[];
  lastMessage: LastMessage;
};
