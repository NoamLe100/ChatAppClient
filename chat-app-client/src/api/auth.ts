import axios from "axios";

const API_URL = 'http://localhost:3000';

axios.defaults.withCredentials = true;

export async function register(email: string, password: string) {
  const response = await axios.post(`${API_URL}/users/register`, {
    email,
    password,
  });
  return response.data;
}

export async function login(email: string, password: string) {
  const response = await axios.post(`${API_URL}/users/singIn`, {
    email,
    password,
  });
  return response.data;
}

export async function getMe(): Promise<{ userId: number } | null> {
  try {
    const response = await axios.get(`${API_URL}/users/me`);
    return response.data;
  } catch {
    return null;
  }
}

export async function logout() {
  await axios.post(`${API_URL}/users/logout`);
}

