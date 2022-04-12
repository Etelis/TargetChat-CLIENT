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
import { Link } from "react-router-dom";


function Login() {
		const inputInitialState = {userName: '', password: ''};
		const errorOnFieldsInitialize = {userField: false, passwordField: false};
    const [state, dispatch] = useStateValue();
    const [formValues, setFormValues] = useState(inputInitialState);
    const [errorFields, setErrorFields] = useState(errorOnFieldsInitialize);
  	const [formErrors, setFormErrors] = useState({});
	  const [isSubmit, setIsSubmit] = useState(false);

		const handleChange = (e) => {
			const {name, value} = e.target;
			setFormValues({...formValues, [name]: value});
		};

    const validate = (values) => {
        const errors = {};
				const errorOnFields = errorOnFieldsInitialize;
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
			
        if(!values.userName) {
            errors.userName = " - this field is required!"
						errorOnFields.userField = true;
        }
			
			  if(!regex.test(values.password)) {
            errors.password = " - password does not meet the password policy requirements"
						errorOnFields.passwordField = true;
        }
			
        if(!values.password) {
            errors.password = " - this field is required!"
						errorOnFields.passwordField = true;
        }
				setErrorFields(errorOnFields);
        return errors;
    }

	  const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    }

	  useEffect(() => {
        console.log(formErrors);
        if(Object.keys(formErrors).length === 0 && isSubmit) {
					//LOGIN LOGIC
        }
    }, [formErrors]);

	
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
											{errorFields.userField ? (
																<label htmlFor="ephone" className='attention'>USERNAME{formErrors.userName} </label>
                            ) : (
                                <label htmlFor="ephone">USERNAME</label>
                      )}
                        <input type="text" name="userName" id="ephone" value={formValues.userName}
                               onChange={handleChange} />
                    </div>
									
                    <div className='login__formBodyPassword'>
                        
											{errorFields.passwordField ? (
															<label htmlFor="password" className='attention'>PASSWORD {formErrors.password} </label>
                            ) : (
                              <label htmlFor="password">PASSWORD</label>
                            )}
                        <input type="password" name="password" id="password" value={formValues.password} onChange={handleChange} />
                    </div>
                </div>
                <div className='login__formFooter'>
                    <Button variant="contained" className='button' color='primary' onClick={handleSubmit} type="submit">
                        Login
                    </Button>
                </div>
                <div className='toSignUp__container'>
                      <div className='toSignUp'>
                          Need an account?
                      </div>
									<Link to={"/register"}>
                      <div className='toSignUp__link'>
                          Sign up
                      </div>
									</Link>
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