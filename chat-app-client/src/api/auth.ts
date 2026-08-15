import { api } from './client';
import type { Me } from '../types';

export async function register(email: string, password: string, userName: string) {
  const response = await api.post('/users/register', { email, password, userName });
  return response.data;
}

export async function login(email: string, password: string) {
  const response = await api.post('/users/singIn', { email, password });
  return response.data;
}

export async function getMe(): Promise<Me | null> {
  try {
    const response = await api.get('/users/me');
    return response.data;
  } catch {
    return null;
  }
}

export async function updateProfile(name: string, userName: string) {
  const response = await api.patch('/users/me', { name, userName });
  return response.data;
}

export async function logout() {
  await api.post('/users/logout');
}
