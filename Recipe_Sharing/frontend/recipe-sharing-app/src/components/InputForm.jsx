import React, {useState} from 'react';
import axios from 'axios';



export default function InputForm({setIsOpen}) { 
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [isSignUp,setIsSignUp]=useState(false);
    const [error,setError]=useState("");
    
    const handelOnSubmit=async (e)=>{
        e.preventDefault();
        let endpoint=isSignUp ? "signup" : "login";
        await axios.post(`http://localhost:8080/user/${endpoint}`,{email,password})
        .then((res)=>{
            localStorage.setItem("token",res.data.token);
            localStorage.setItem("user",JSON.stringify(res.data.user));
            setIsOpen(false);
        })
        .catch(data=>setError(data.response?.data?.message));
    }
  return (
    <form className="form" onSubmit={handelOnSubmit}>
      <div className="form-control"><br></br>
        <label>Email</label><br></br>
        <input type="email" className='input' onChange={(e)=>setEmail(e.target.value)} required/>
      </div>
      
      <div className="form-control">
        <label>Password</label>
        <input type="password" className='input' onChange={(e)=>setPassword(e.target.value)}  required/>
      </div>

      <button type='submit'>{(isSignUp) ? "Sign Up" :"Login"}</button><br></br>
      { (error!="") && <h6 className='error'>{error}</h6>}
      <p onClick={()=>setIsSignUp(pre=>!pre)}>{(isSignUp) ? "Alerady have an account?" :"Create new account"}</p>
    </form>
  );
}