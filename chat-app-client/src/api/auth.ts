import axios from "axios";
import { jwtDecode } from 'jwt-decode';



type JwtPayload = {
  userId: number;
};

const API_URL = 'http://localhost:3000'

export async function register(email:string , password:string) {
    const response = await axios.post(`${API_URL}/users/register`,{
        email,
        password,
    });
    return response.data;
}
export async function login(email:string,password:string) {
    const response =await axios.post(`${API_URL}/users/singIn`,{
        email,
        password,
    })
    return response.data;   
}

export function getMyUserId(): number | null {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const decoded = jwtDecode<JwtPayload>(token);
  return decoded.userId;
}
