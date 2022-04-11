import React from 'react';
import "./Register.css";
import { Button, IconButton } from "@material-ui/core";
import {useState, useEffect} from "react";
import { useStateValue } from './StateProvider';
import { actionTypes , dispatch} from './reducer';

function Register() {
  const toSignIn = () => {
      dispatch({
            type: actionTypes.SET_USER,
            user: ""});
  };
  
  const [state, dispatch] = useStateValue();
  const initialValues = {userName: "", password: "", verify_password: "", displayname: "", photo: ""};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  
  const handleChange = (e) => {
        const{name, value} = e.target;
        setFormValues({...formValues, [name]: value});
    }
  
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    }
  
    const validate = (values) => {
        const errors = {};
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if(!values.userName) {
            errors.userName = "Username is required!"
        }
        if(!values.password) {
            errors.password = "Password is required!"
            errors.verify_password = "Passwords are not matching!"
        }
        if(!regex.test(values.password)) {
            errors.password = "Minimum eight characters, at least one letter and one number"
        }
        if(values.password != values.verify_password) {
            errors.verify_password = "Passwords are not matching!"
        }
        if(!values.displayname) {
            errors.displayname = "Display Name is required!"
        }
        if(!values.photo) {
            errors.photo = "Photo is required!"
        } 
        return errors;
    }
  
    useEffect(() => {
        console.log(formErrors);
        if(Object.keys(formErrors).length === 0 && isSubmit) {
            dispatch({
            type: actionTypes.SET_USER,
            user: formValues.userName});
        }
    }, [formErrors]);
  
  return (
    <div className='register'>
        <div className='register__container'>
            <div className='register__form'>
                <div className='register__formHeader'>
                    <h3>Create an account</h3>
                </div>
                <div className='register__formBody'>
                    <div className='field'>
                        <label htmlFor="userName">USERNAME</label>
                        <input type="text" name="userName" id="userName" value={formValues.userName} 
                        onChange={handleChange}></input>
                        <span class="error">{formErrors.userName}</span>
                    </div>
                    <div className='field'>
                        <label htmlFor="password">PASSWORD</label>
                        <input type="password" name="password" id="password" value={formValues.password}
                         onChange={handleChange}></input>
                         <span class="error">{formErrors.password}</span>
                    </div>
                    <div className='field'>
                        <label htmlFor="verify_password">VERIFY PASSWORD</label>
                        <input type="password" name="verify_password" id="verify_password" value={formValues.verify_password}
                        onChange={handleChange}></input>
                        <span class="error">{formErrors.verify_password}</span>
                    </div>
                    <div className='field'>
                        <label htmlFor="displayname">DISPLAY NAME</label>
                        <input type="displayname" name="displayname" id="displayname" value={formValues.displayname}
                        onChange={handleChange}></input>
                        <span class="error">{formErrors.displayname}</span>
                    </div>
                    <div className='field'>
                        <label htmlFor="photo">Please upload a photo</label>
                        <input type="file" name="photo" id="photo" value={formValues.photo}
                        onChange={handleChange}></input>
                        <span class="error">{formErrors.photo}</span>
                    </div>
                </div>
                <div className='register__formFooter'>
                    <Button variant="contained" className='button' color='primary' onClick={handleSubmit}>
                        Register
                    </Button>
                </div>
                <div className='toSignIn__container'>
                    <div className='toSignIn'>
                        Already have an account?
                    </div>
                    <div className='toSignIn__link' onClick={toSignIn}>
                        Sign in
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register;