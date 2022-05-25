import React, { useEffect } from 'react';
import Sidebar from './Components/Sidebar';
import Chat from './Components/Chat';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import { useStateValue } from './Components/StateProvider';
import { Fade } from 'react-bootstrap';
import { AuthenticateByToken } from './Controllers/UsersDBController';
import { actionTypes } from './Utils/Constants';



function App() {
  // Global User Object
  const [{ username }, dispatch] = useStateValue();

  useEffect( () => {
    async function fetchData(){
      await AuthenticateByToken(dispatch)
    }
    fetchData()
  },[])

  return (
    <Router>
    <div className="app">
      {!username ? (
				<Routes>
					<Route path="*" element={<Login />} />
					<Route path="/register" element={ <Register /> } />
				</Routes>
      ) : (
       <Fade in={true} appear={true}>
			 <div className="app_body"> 
          <Routes>
            <Route path="/rooms/:roomId" element={[<Sidebar />, <Chat />]} />
            <Route path="*" element={[<Sidebar />]} />
          </Routes>
        </div>
      </Fade>
			)
      }
      </div>
		</Router>
  );
}

export default App;