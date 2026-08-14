import axios from "axios";

const API_URL = 'http://localhost:3000';

export async function getMessages(groupId: number) {
  const response = await axios.post(`${API_URL}/Massges/getHistory`, { groupId });
  return response.data;
}