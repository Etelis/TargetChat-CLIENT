import React from 'react';
import Sidebar from './Components/Sidebar';
import Chat from './Components/Chat';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import { useStateValue } from './Components/StateProvider';


function App() {
  const [{ user }, dispatch] = useStateValue();
  return (
    <Router>
    <div className="app">
      {!user ? (
				<Routes>
					<Route path="*" element={ <Login /> } />
					<Route path="/register" element={ <Register /> } />
				</Routes>
      ) : (
			 <div className="app_body"> 
          <Routes>
            <Route path="/rooms/:roomId" element={[<Sidebar />, <Chat />]} />
            <Route path="*" element={[<Sidebar />]} />
          </Routes>
        </div>
			)
      }
      </div>
		</Router>
  );
}

export default App;