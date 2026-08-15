import { api } from './client';

export async function getMessages(chatId: number) {
  const response = await api.post('/Massges/getHistory', { groupId: chatId });
  return response.data;
}
