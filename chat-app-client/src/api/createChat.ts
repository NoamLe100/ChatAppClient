import axios from "axios";

const API_URL = 'http://localhost:3000';

export async function createChat(name: string) {
  const response = await axios.post(`${API_URL}/chat/CreateChat`, {
    memberIds: [],
    isGroup: true,
    name: name,
  });
  return response.data;
}