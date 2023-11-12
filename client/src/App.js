import Register from "./pages/register/Register";
import {  Route, } from "react-router-dom";
import TopBar from "./topbar/TopBar";
import { React} from "react";
import {
  BrowserRouter as Router,
  Routes 
} from "react-router-dom";
import Information from "./pages/information/Information";
import ViewInformation from "./pages/viewInformation/ViewInformation";
import Login from "./pages/login/Login";

 


function App() {
  return (
    <div className="App">
    
     <Router>
     <TopBar/>
     <Routes>
     <Route  path="/" element={<Register/>} />
     <Route  path="/login" element={<Login/>} />
    
     <Route  path="/information" element={<Information/>} />
     <Route  path="/view" element={<ViewInformation/>} />
        
    

     </Routes>
     </Router>

 
    </div>
  );
}

export default App;
