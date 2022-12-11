import React, { useEffect, useContext, useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom'

import {  TextField, Button } from '@Components/UI';
import { authActions } from "Redux@Actions";
import { AppContext } from '../../App';
import './index.scss'

export default function SignupPage(){
    //Initial Config
    const dispatch = useDispatch();
    const history = useHistory();

    // States 
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // Contexts sets
    const appConstants = useContext(AppContext);

    // Selectors
    const { loggedIn } = useSelector(state => state.security.auth)

    const handleSubmit = (e) => { 
        e.preventDefault()
        dispatch(authActions.Login({username,password}))
    }

    useEffect(() => {
        if(loggedIn){
            //Fez login
            history.push('/app');
        }
        //eslint-disable-next-line
    }, [loggedIn])


    return(
        <>
            <div  style={{ height: '100vh', textAlign: 'center'}} className='signup-container'>
                <div className='main-container'>
                    <div className='header'>
                        <div className='header-logo'>
                            <img src="/img/login-logo.svg" />
                        </div>
                        <div className='header-text'>
                            <p className='main-caption'>SIGN UP</p>
                            <p className='sub-caption' onClick={()=> {history.push('/login')}}>LOG IN</p>
                        </div>
                    </div>
                    <div className='signin'>
                        <Button label='Sign in with Google' style={{marginBottom: '22px', marginTop: '62px'}}></Button>
                        <Button label='Sign in with Facebook'></Button>
                    </div>
                    <p>OR</p>
                    <div className='signup-form'>
                        <TextField id="standard-basic" label="Email" variant="standard" style={{width: '100%', marginBottom: '35px'}}/>
                        <TextField id="standard-basic" label="Name" variant="standard" style={{width: '100%', marginBottom: '35px'}}/>
                        <TextField id="standard-basic" label="Password" variant="standard" style={{width: '100%', marginBottom: '35px'}}/>
                        <Button className='btn-signup' label='Sign up'></Button>
                    </div>
                    <div className='copyright-container'>
                        <p className='copyright'>Copyright Trufflear2022</p>
                    </div>
                </div>
            </div>
        </>
    )
}