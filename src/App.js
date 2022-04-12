import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './Login';
import Register from './Register';
import { useStateValue } from './StateProvider';


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