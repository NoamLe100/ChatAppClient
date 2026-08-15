import type { Chat } from '../types';

export function getChatLabel(chat: Chat, myUserId: number | null): string {
  if (chat.isGroup) {
    return chat.name || 'Unnamed group';
  }

  const otherMember = chat.members.find(m => m.user.id !== myUserId);
  if (!otherMember) return 'Unknown user';

  return otherMember.user.name || otherMember.user.userName;
}

export function getLastMessagePreview(chat: Chat, myUserId: number | null): string | undefined {
  if (!chat.lastMessage) return undefined;

  const who = chat.lastMessage.senderId === myUserId ? 'You' : chat.lastMessage.senderName;

  const time = new Date(chat.lastMessage.sentAt).toLocaleTimeString('he-IL', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return `${who}: ${chat.lastMessage.text} · ${time}`;
}
