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