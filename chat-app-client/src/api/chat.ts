import { api } from './client';

export async function getMyChats() {
  const response = await api.get('/chat/getMychat');
  return response.data;
}

export async function joinByCode(code: string) {
  const response = await api.post('/chat/joinByCode', { code });
  return response.data;
}

export async function searchUsers(query: string) {
  const response = await api.get('/users/search', { params: { query } });
  return response.data;
}

export async function startPrivateChat(userId: number) {
  const response = await api.post('/chat/startPrivateChat', { userId });
  return response.data;
}

export async function addMember(chatId: number, userId: number) {
  const response = await api.post('/chat/addMember', { Chatid: chatId, userid: userId });
  return response.data;
}

export async function getChatDetails(chatId: number) {
  const response = await api.get(`/chat/chat/${chatId}`);
  return response.data;
}
