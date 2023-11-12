
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import "./topbar.css";

export default function Topbar() {
  const{ user, dispatch} = useContext(Context)
  const handleLogout = () =>{
   dispatch({
      type: "LOGOUT",
    });

  }
 
  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/information">
              Add Details
            </Link>
          </li>
          <li className="topListItem">
          <Link className="link" to="/view">
              View Details
            </Link>
            </li>
         
            {user &&  <li className="topListItem">
         <Link className="link" to="/login">
              LogOut
            </Link>
            </li>}
        
         
          {/* <li className="topListItem" onClick={handleLogout}>
        {user &&  "LOGOUT"}</li> */}

        </ul>
      </div>
      
    </div>
  );
}