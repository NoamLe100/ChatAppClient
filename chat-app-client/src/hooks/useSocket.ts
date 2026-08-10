import { useEffect,useState  } from "react";
import {io,Socket}   from "socket.io-client"

export function useSocket () {
    const [socket,setSocket ] = useState <Socket|null>(null);
    useEffect(() => {
      const token = localStorage.getItem('token');
    const newSocket = io('http://localhost:3000', {
        auth: {token: token}
      });
    setSocket(newSocket);
      return () => {
      newSocket.disconnect(); 
    };
 },[]);
  return socket;
}