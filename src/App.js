import React, { useEffect, useState } from 'react';
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
import LoadAnimation from './Components/MediaComponents/Loading'



function App() {
  const [{ username }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(true)

  useEffect( () => {
    
    async function fetchData(){
      const user = await AuthenticateByToken()
      if (user == null)
        return
      dispatch({type: actionTypes.SET_USER, otherUser: user})
    }
    fetchData()
    setLoading(false)

  },[])

  if (loading)
    return(<LoadAnimation/>);

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