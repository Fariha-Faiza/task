


import axios from "axios";
import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./login.css";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const roleRef = useRef();
  const { user, dispatch, isFetching } = useContext(Context);
  const arr= ['admin', 'user']
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setSuccess(false)
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("https://replymind-se-final.onrender.com/api/auth/login", {
       
        username: userRef.current.value,
        password: passwordRef.current.value,
      
      });
      setSuccess(true)
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      // res.data && window.location.replace("/information");
    } catch (err) {
      setError(true);
      dispatch({ type: "LOGIN_FAILURE" });
    }
    console.log('see',user);
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your username..."
          ref={userRef}
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
          





        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      {success && <span style={{color:"red", marginTop:"10px"}}>login successful! please click on GO</span>}
      {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
      <div className="register-alignment">
      <button className="loginRegisterButton">

        <Link className="link" to="/information">
          GO
        </Link>
      
      </button>
      </div>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>

      
    </div>
  );
}