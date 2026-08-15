import { api } from './client';

export async function createChat(name: string) {
  const response = await api.post('/chat/CreateChat', {
    name,
    isGroup: true,
    memberIds: [],
  });
  return response.data;
}
