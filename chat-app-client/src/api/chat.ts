import axios from "axios";

const API_URL = 'http://localhost:3000';

export async function getMyChats() {
  const response = await axios.get(`${API_URL}/chat/getMychat`);
  return response.data;
}

export async function joinByCode(code: string) {
  const response = await axios.post(`${API_URL}/chat/joinByCode`, { code });
  return response.data;
}


export async function searchUsers(query: string) {
  const response = await axios.get(`${API_URL}/users/search`, {
    params: { query },
  });
  return response.data;
}

export async function startPrivateChat(userId: number) {
  const response = await axios.post(`${API_URL}/chat/startPrivateChat`, { userId });
  return response.data;
}
export async function addMember(chatId: number, userId: number) {
  const response = await axios.post(`${API_URL}/chat/addMember`, { Chatid: chatId, userid: userId });
  return response.data;
}

export async function getChatDetails(chatId: number) {
  const response = await axios.get(`${API_URL}/chat/chat/${chatId}`);
  return response.data;
}