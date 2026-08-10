import axios from "axios";

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
