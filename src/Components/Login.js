import React, { useEffect, useState } from 'react';
import "./Login.css";
// import { auth, provider } from './firebase';
// import { signInWithPopup } from "firebase/auth";
import { useStateValue } from './StateProvider';
import { actionTypes } from '../controller/userDBController';
import QR from "../images/qr.png";
import { Link } from "react-router-dom";
import { getUser } from '../controller/userDBController';
import { Button, Fade } from 'react-bootstrap'

function Login() {
	const inputInitialState = {userName: '', password: ''};
    const [state, dispatch] = useStateValue();
    const [formValues, setFormValues] = useState(inputInitialState);
  	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);

		const handleChange = (e) => {
			const {name, value} = e.target;
			setFormValues({...formValues, [name]: value});
		};

    const validate = (values) => {
        const errors = {};
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
			
        if(!values.userName) {
            errors.userName = " - this field is required!"
        }
			
			  if(!regex.test(values.password)) {
            errors.password = " - password does not meet the password requirements"
        }
			
        if(!values.password) {
            errors.password = " - this field is required!"
        }
        return errors;
    }

	  const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    }
  
	  useEffect(() => {
			
        if(Object.keys(formErrors).length === 0 && isSubmit) {
          const foundUser = getUser(formValues.userName, formValues.password);
					
          if(foundUser){
            dispatch({type: actionTypes.SET_USER, otherUser: foundUser});
          }
          else
            setFormErrors({userName: " - invalid Username or Password!", password: " - invalid Username or Password!" });
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
        <Fade in={true} appear={true} >
        <div className='login__container'>
            <div className='login__form'>
                <div className='login__formHeader'>
                    <h3>Welcome back!</h3>
                    <h4>We're so excited to see you again!</h4>
                </div>
                <form>
                <div className='login__formBody'>
                    <div className='login__formBodyEmail'>
											  <label htmlFor="ephone" className={formErrors.userName && 'attention'}>USERNAME{formErrors.userName} </label>
                        <input type="text" name="userName" id="ephone" value={formValues.userName}
                               onChange={handleChange} />
                    </div>
									
                    <div className='login__formBodyPassword'>
											<label htmlFor="password" className={formErrors.password && 'attention'} >PASSWORD {formErrors.password} </label>
                        <input type="password" name="password" id="password" value={formValues.password} onChange={handleChange} />
                    </div>
                </div>
                <div className='login__formFooter'>
                    <Button variant="primary" className='button' color='primary' onClick={handleSubmit} type="submit">
                        Login
                    </Button >
                </div>
                </form>
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
                <h5>Log in with QR Code</h5>
                <h4>
                Scan this with the{" "}
                <span className="boldDescription"> Mobile app </span> to log
                in instantly.
                </h4>

                <h4 className='boldDescription'> <span className="boldDescription"> Or Signing With: </span> </h4>
        <button type="button" class="btn btn-outline-secondary btn-sm"><i class="bi bi-emoji-smile-upside-down"></i></button>
							
            </div>
        </div>
        </Fade>
    </div>
  );
}

export default Login;