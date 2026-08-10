import { useState } from "react";
import { login } from "../api/auth";

export function SignIn () {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const handelLogIn = async() => {
        try {
          const data = await login(email,password);
            localStorage.setItem('token',data.token);
            console.log(data); 
        }
        catch(err) {
            alert('somting is worng')
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
             <button onClick={handelLogIn}> להתחבר </button>
        </div>
    )
}

