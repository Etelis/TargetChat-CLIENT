import React, {useState, useEffect} from 'react';
import "./Register.css";
import { Button, Fade} from "react-bootstrap";
import { useStateValue } from './StateProvider';
import { createUserDB } from '../Controllers/UsersDBController';
import { actionTypes } from '../Utils/Constants';
import { Link } from "react-router-dom";
import { ConsoleLogger } from '@microsoft/signalr/dist/esm/Utils';

function Register() {
  const [state, dispatch] = useStateValue();
  // inital values for the registration form
  const initialValues = {userName: "", password: "", verify_password: "", displayname: "", photo: null};
  // state for the form values
  const [formValues, setFormValues] = useState(initialValues);
  // state for the form errors
  const [formErrors, setFormErrors] = useState({});
  // state of the submit status of the form
  const [isSubmit, setIsSubmit] = useState(false);

	// This function handles changing of the current photo.
	const onImageChange = (event) => {
		 if (event.target.files && event.target.files[0]) {
			 setFormValues({...formValues, photo: URL.createObjectURL(event.target.files[0])});
		 }
	}

	// handles all other changes.
  const handleChange = (e) => {
        const{name, value} = e.target;
        setFormValues({...formValues, [name]: value});
    }

	// on click sumbit
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    }

	// validator
    const validate = (values) => {
        const errors = {};
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if(!values.userName) {
            errors.userName = " - Username is required!"
        }
        if(!values.password) {
            errors.password = " - Password is required!"
            errors.verify_password = " - Passwords are not matching!"
        }
        if(!regex.test(values.password)) {
            errors.password = " - Minimum eight characters, at least one letter and one number"
        }
        if(values.password != values.verify_password) {
            errors.verify_password = " - Passwords are not matching!"
        }
        if(!values.displayname) {
            errors.displayname = " - Display Name is required!"
        }
        if(!values.photo) {
            errors.photo = " - Photo is required!"
        } 
        return errors;
    }
  
    useEffect(() => {
      // if no errors and the form was submitted
        if(Object.keys(formErrors).length === 0 && isSubmit) {
            async function fetchData(){
            const newUser = 
            {
                username: formValues.userName,
                password: formValues.password,
                displayName: formValues.displayname,
                photo: formValues.photo,
            }
            
            if (await createUserDB(newUser))
            {
                dispatch(
                    {
                    type: actionTypes.SET_USER,
                    otherUser: newUser
                    })
            }
            else{
                setFormErrors({userName: " - User already exists!" });
            }
        }
        fetchData()
    }
    }, [formErrors]);
  
  return (
    <div className='register'>
        <Fade in={true} appear={true}>
        <div className='register__container'>
            <div className='register__form'>
                <div className='register__formHeader'>
                    <h3>Create an account</h3>
                </div>
                <form>
                <div className='register__formBody'>
                    <div className='field'>
                        <label htmlFor="userName" className={formErrors.userName && "attention"}>USERNAME{formErrors.userName}</label>
                        <input type="text" name="userName" id="userName" value={formValues.userName} 
                        onChange={handleChange}></input>
                    </div>
                    <div className='field'>
                        <label htmlFor="password" className={formErrors.password && "attention"}>PASSWORD{formErrors.password}</label>
                        <input type="password" name="password" id="password" value={formValues.password}
                         onChange={handleChange}></input>
                    </div>
                    <div className='field'>
                        <label htmlFor="verify_password" className={formErrors.verify_password && "attention"} >VERIFY PASSWORD{formErrors.verify_password}</label>
                        <input type="password" name="verify_password" id="verify_password" value={formValues.verify_password}
                        onChange={handleChange}></input>
                    </div>
                    <div className='field'>
                        <label htmlFor="displayname" className={formErrors.displayname && "attention"} >DISPLAY NAME{formErrors.displayname}</label>
                        <input type="displayname" name="displayname" id="displayname" value={formValues.displayname}
                        onChange={handleChange}></input>
                    </div>
                    <div className='field'>
                        <label htmlFor="photo" className={formErrors.photo && "attention"}>PHOTO{formErrors.photo}</label>
                        <input type="file" name="photo" id="photo" accept="image/*" multiple = "false" onChange={onImageChange} />
                    </div>
                </div>
							
                <div className='register__formFooter'>
                    <Button variant="primary" className='button' color='primary' type='sub' onClick={handleSubmit}>
                        Register
                    </Button>
                </div>
                </form>
                <div className='toSignIn__container'>
                    <div className='toSignIn'>
                        Already have an account?
                    </div>
									
                  <Link to={"/login"}>  
										<div className='toSignIn__link' > 
                        Sign in
                    </div>
								  </Link>
                </div>
            </div>
        </div>
        </Fade>
    </div>
  )
}

export default Register;