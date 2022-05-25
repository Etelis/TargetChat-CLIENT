import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { currentUserSetter } from './Controllers/UsersDBController';
import { nullUser } from './Utils/Constants';
import { StateProvider } from './Components/StateProvider';
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={nullUser} reducer={currentUserSetter}>
    <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
