import axios from "axios";

const API_URL = 'http://localhost:3000';

export async function getMessages(groupId: number) {
  const token = localStorage.getItem('token');
  const response = await axios.post(
    `${API_URL}/Massges/getHistory`,
    { groupId },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
}

export async function sendMessage(gruopId: number, text: string) {
  const token = localStorage.getItem('token');
  const response = await axios.post(
    `${API_URL}/Massges/sandMassge`,
    { gruopId, text },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
}