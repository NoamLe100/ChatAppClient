    import axios from "axios";

const API_URL = 'http://localhost:3000';
 export async function getMyChats(  ) {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/chat/getMychat`,{
        headers : {
            Authorization:`Bearer ${token}` 
        }
    });
    return response.data;
 }