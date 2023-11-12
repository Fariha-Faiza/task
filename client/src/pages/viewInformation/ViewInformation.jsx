import React from 'react'
import { useState, useEffect, } from "react";
import axios from "axios";
import { useContext, useRef } from "react";
import { Context } from "../../context/Context";
import "./viewInformation.css"
import { Link } from "react-router-dom";
export default function ViewInformation(id1) {
    const { user } = useContext(Context);
    const [allData, setAllData] = useState([])
    const [profession, setProfession] = useState([])
    const [bio, setBio] = useState("")
    const [interest, setInterest] = useState([])
    const [matchedId , setMatchedId] = useState(1)
    var [userName, setUserName] = useState("")
    var [email, setEmail] = useState("")
    
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [success1, setSuccess1] = useState(false);
  const arr = ['Marketing Professional', 'Entrepreneur', 'Content Creator']
  const interestsofMP = ['Growth marketing', 'Digital Marketing', 'Product Marketing', 'Paid marketing', 'Organic marketing']
  const interestsofEnterpreneur = ['Startup enthusiast', 'SME', 'Product enthusiast', 'Product Leader', 'Product owner etc']
  const interestsofCC = ['Youtube', 'Twitch', 'Twitter', 'Video Content ']
  const [checked, setChecked] = useState([]);

   // Add/Remove checked item from list
   const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
      console.log(updatedList, checked);
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
      console.log(updatedList, checked);
    }
    setChecked(updatedList);
  };

  // Return classes based on whether item is checked
  var isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";



  
  useEffect(() => {
    console.log("my url11111")
    async function fethcData() {
      const res = await axios.get(`https://replymind-se-final.onrender.com/api/information/info`)
    console.log("res data", res.data)
    const matchedData = (res.data.filter((x) => x.username === user.username && x.email === user.email))
         setAllData(matchedData)
         console.log("matchedData", matchedData);
         setProfession(matchedData[0].profession)
         setInterest(matchedData[0].interest)
         setBio(matchedData[0].bio)
         setMatchedId(matchedData[0]._id)
      }

      fethcData()
  }, []);
  userName = user.username;
  email = user.email;
//update profile info
  const handleUpdate = async (e) => {
    console.log("update profile info")
    e.preventDefault();
    setError(false);
    setSuccess(false)
    try {
      const res = await axios.put(`https://replymind-se-final.onrender.com/api/information/info/${matchedId}`, {

        username: userName,
        email: email,
        profession,
        interest: checked,
        bio
      });
      setSuccess(true)
      console.log(res) 
      //res.data && window.location.replace("/view");
    } catch (err) {
      setError(true);
    }
  };

//delete profile info
const handleDelete= async (e) => {
  e.preventDefault();
  setError(false);
  setSuccess1(false)
  console.log('delete');
  try {
    const res = await axios.delete(`https://replymind-se-final.onrender.com/api/information/info/${matchedId}`)

    
  
  setSuccess1(true)
  }
   catch (err) {
    setError(true);
    }
}



  return (
    <div>
      <span className="registerTitle">Information of {user?.username}</span>
        <div action="" className="registerForm">
          <label >Profession :</label>
          <span>{profession} </span>
          <label >Interests :</label>
          <span>{interest} </span>
          <label >Profession :</label>
          <span>{bio} </span>

          <span className="registerTitle">Update Information of {user?.username}</span>
          <form action="" className="registerForm" onSubmit={handleUpdate}>
          <label >Profession</label>

          <select onChange={e => setProfession(e.target.value)} className="registerInput">
            <option>
             {profession}
            </option>
            {
              arr.map(item => {
                return <option key={item} value={item}>{item}</option>
              })
            }
          </select>
          <label >Interests</label>
          {/* <input type="text" className="registerInput"
            placeholder="Enter your password......."
            onChange={e => setInterest(e.target.value)} /> */}
          {profession === "Marketing Professional" &&
            <div className="list-container">
              {interestsofMP.map((item, index) => (
                <div key={index}>
                  <input value={item} type="checkbox" onChange={handleCheck} />
                  <span className={isChecked(item)}>{item}</span>
                </div>
              ))}
            </div>}
          {profession === "Entrepreneur" &&
            <div className="list-container">
              {interestsofEnterpreneur.map((item, index) => (
                <div key={index}>
                  <input value={item} type="checkbox" onChange={handleCheck} />
                  <span className={isChecked(item)}>{item}</span>
                </div>
              ))}
            </div>}
          {profession === "Content Creator" &&
            <div className="list-container">
              {interestsofCC.map((item, index) => (
                <div key={index}>
                  <input value={item} type="checkbox" onChange={handleCheck} />
                  <span className={isChecked(item)}>{item}</span>
                </div>
              ))}
            </div>}
          <label >Bio</label>
          <input type="text" maxlength="50" className="registerInput"
            placeholder="Character count Max 50" value={bio}
            onChange={e => setBio(e.target.value)} />

          <button className="registerButton" type="submit" >Update
          </button>
          
        </form>
       <div>
       {success && <span style={{color:"red", marginTop:"10px"}}>Data update successful</span>}
    
        {error && <span style={{ color: "red", marginTop: "10px" }}>Something went wrong!</span>}
        </div>
<div>
  
<button className="registerButton"  onClick={handleDelete} > Delete Info

          </button>

          <button className="registerLoginButton">
      <Link className="link" to="/information">HOME</Link>
      </button>
          {success1 && <span style={{color:"red", marginTop:"10px"}}>Data Delete successful, Go to Home page to add info again</span>}
</div>
          
          </div>
    </div>
  )
}
