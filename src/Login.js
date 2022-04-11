import React, { useEffect, useState, useRef } from 'react';
import "./Login.css";
import { Button, IconButton } from "@material-ui/core";
// import { auth, provider } from './firebase';
// import { signInWithPopup } from "firebase/auth";
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';
import QR from "./qr.png";
import GoogleIcon from '@mui/icons-material/Google';
import { ConstructionOutlined } from '@mui/icons-material';


function Login() {
    const toSignUp = () => {
        dispatch({
              type: actionTypes.SET_USER,
              user: "toRegister"});
    };
    const [state, dispatch] = useStateValue();
    const [input, setInput] = useState
    ({
        userName: '',
        password: ''
    });
    const [requiredField, setRequiredField] = useState
    ({
        userNameField: true,
        passwordField: true
    });
    
    const [errorFields, setErrorFirlds] = useState(true);

    const handleUserNameChange = (e) => {
        let updatedVal = 
        {
            userName: e.target.value,
            password: input.password,
        };

        setInput(input => 
        ({
            ...input,
            ...updatedVal
        }));
        console.log("Email is: ", input.userName);
        console.log("Password is: ", input.password);
    };

    const handlePassChange = (e) => {
        let updatedVal = 
        {
            userName: input.userName,
            password: e.target.value,
        };

        setInput(input => 
        ({
            ...input,
            ...updatedVal
        }));
    };

    const sendLogin = (e) => {
        e.preventDefault();
        let re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        let requiredFields = {
            userNameField: true,
            passwordField: true,
        }

        if (!input.userName){
            requiredFields.userNameField = false
        }

        if ( !re.test(input.password) ){
            requiredFields.passwordField = false
        }

        setRequiredField(requiredField => ({
            ...requiredField,
            ...requiredFields
        }))
    }
    // const signInGoogle = () => {
    //     signInWithPopup(auth, provider)
    //     .then((result) => { dispatch({
    //         type: actionTypes.SET_USER,
    //         user: result.user,
    //     })} )
    //     .catch((error) => { alert(error.message)} );
    // };

  return (
      
    <div className='login'>
        <div className='login__container'>
            <div className='login__form'>
                <div className='login__formHeader'>
                    <h3>Welcome back!</h3>
                    <h4>We're so excited to see you again!</h4>
                </div>
                <div className='login__formBody'>
                    <div className='login__formBodyEmail'>
                        {requiredField.userNameField ? (
                            errorFields ? (
                                <label htmlFor="ephone">USERNAME</label>
                            ) : (
                                <label htmlFor="ephone" className='attention'>USERNAME - login or password is invalid! </label>
                            )
                        ) : (
                            <label htmlFor="ephone" className='attention'>USERNAME - this field is required! </label>
                        )}
                        <input type="text" name="ephone" id="ephone" value={input.userName}
                               onChange={handleUserNameChange} />
                    </div>
                    <div className='login__formBodyPassword'>
                        {requiredField.passwordField ? ( 
                            errorFields ? (
                                <label htmlFor="password">PASSWORD</label>
                            ) : (
                                <label htmlFor="password" className='attention'>PASSWORD - login or password is invalid! </label>
                            )
                            ) : (
                                <label htmlFor="password" className='attention'>PASSWORD - password does not meet the password policy requirements</label>
                            )}
                        <input type="password" name="password" id="password" value={input.password}
                               onChange={handlePassChange} />
                    </div>
                </div>
                <div className='login__formFooter'>
                    <Button variant="contained" className='button' color='primary' onClick={sendLogin} type="submit">
                        Login
                    </Button>
                </div>
                <div className='toSignUp__container'>
                      <div className='toSignUp'>
                          Already have an account?
                      </div>
                      <div className='toSignUp__link' onClick={toSignUp}>
                          Sign in
                      </div>
                  </div>
            </div>
            <div className='login__QR'>
                    <img src={QR} alt="" />
                <h3>Log in with QR Code</h3>
                <h4>
                Scan this with the{" "}
                <span className="boldDescription"> Mobile app </span> to log
                in instantly.
                </h4>

                <h5 className='boldDescription'> <span className="boldDescription"> Or Signing With: </span> </h5>
                <IconButton id="googleIcon"><GoogleIcon /> </IconButton>
            </div>
        </div>
    </div>
  );
}

export default Login;