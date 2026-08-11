import { useEffect,useState  } from "react";
import {useSocket}   from "../hooks/useSocket"

export function SocketTest() {
    const socket = useSocket();
    const [groupId,setGroupId]= useState ('');
    const [textId,setText] = useState ('');
    const [messages,setMessages] =useState <string[]>([]);
     useEffect(() => {
    if (!socket) return;

    socket.on('connect', () => {
      console.log('Connected! Socket ID:', socket.id);
    });
    socket.on('message',(payload:{groupId:string;text:string})=>{
        setMessages((prev)=>[...prev,payload.text]);
    });
  }, [socket]);

  return <div>
    <div>
      <input
      placeholder="Group id"
      value={groupId}
      onChange={(e)=> setGroupId(e.target.value)}
      />
     <button onClick={() => socket?.emit('joinRoom', groupId)}>
      join Room
     </button>
    </div>

    <div>
      <input  
      placeholder="message"
      value={textId}
      onChange={(e) => setText(e.target.value)}
      />
      <button onClick={() => socket?.emit('message',{groupId,text:textId})}>
      Send
      </button>
      
    </div>
    <ul>
      {messages.map((msg,i)=> <li key={i}>{msg}</li>)}
    </ul>
  </div>;
}
