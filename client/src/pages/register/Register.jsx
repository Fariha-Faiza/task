import "./register.css"
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useContext, useRef } from "react";
import { Context } from "../../context/Context";

export default function Register() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user, dispatch, isFetching } = useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setSuccess(false)
    try {
      const res = await axios.post("https://replymind-se-final.onrender.com/api/auth/register", {
      
        username,
        email,
        password,
  
      });
      setSuccess(true)
   console.log('result', res)
      // res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };

   console.log('see',user);
  return (
    <div className="register">
        <div className="register-alignment">
        <span className="registerTitle">Register</span>

        
      <form action="" className="registerForm" onSubmit={handleSubmit}>
      <label >Username</label>
          <input type="text" className="registerInput" 
          placeholder="Enter your username......."
          onChange={e=>setUsername(e.target.value)} 
          
          />

          <label >Email</label>
          <input type="text" className="registerInput"
           placeholder="Enter your email......."
           onChange={e=>setEmail(e.target.value)} />

          <label >Password</label>
          <input type="password" className="registerInput" 
          placeholder="Enter your password......." 
          onChange={e=>setPassword(e.target.value)} />


         
        
  

          
          <button className="registerButton" type="submit" >Register</button>
         
   
      </form>
      {success && <span style={{color:"red", marginTop:"10px"}}>Registration Sucessful!Please click on login button</span>}
      {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
      <div className="register-alignment">
      <button className="registerLoginButton">
      <Link className="link" to="/login">Login</Link>
      </button>
      </div>
      </div>
     
    </div>
  )
}
