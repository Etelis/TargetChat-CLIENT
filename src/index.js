import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { currentUserSetter } from './controller/userDBController';
import { currentUser } from './model/UserDB';
import { StateProvider } from './Components/StateProvider';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={currentUser} reducer={currentUserSetter}>
    <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
