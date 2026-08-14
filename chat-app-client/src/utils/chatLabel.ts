export type ChatMember = {
  user: {
    id: number;
    userName: string;
  };
};

export type Chat = {
  id: number;
  name: string | null;
  isGroup: boolean;
  pic: string | null;
  code: string | null;
  members: ChatMember[];
};

export function getChatLabel(chat: Chat, myUserId: number | null): string {
  if (chat.isGroup) {
    return chat.name || 'Unnamed group';
  }

  const otherMember = chat.members.find(m => m.user.id !== myUserId);
  return otherMember?.user.userName || 'Unknown user';
}