import { useState } from "react";
import { register } from "../api/auth";

export function Register() {
    const [email,setEmail] =useState('');
    const [password,setPassword] =useState(''); 
    const [error,setError] = useState('');

    const registretion = async ()=> {
      try{
        await register (email,password);
         alert('you are register');
      }
      catch(err){
        alert('somting is worng');
      }

    }

    return (
        <div>
            <input 
                placeholder="enter email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)} 
                />
            <input 
                placeholder="enter password"
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />

            <button onClick={registretion}>להירשם</button>
        </div>  
    )
}