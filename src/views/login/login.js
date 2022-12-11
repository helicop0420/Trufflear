import React, { useEffect, useContext, useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { Box, Grid, Typography} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from 'react-router-dom'

import { PassField, TextField, Button, Paper} from '@Components/UI';
import { authActions } from "Redux@Actions";
import { AppContext } from '../../App';
import './login.scss'

export default function LoginFormPage(){
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

    return(
        <>
            <div  style={{ height: '100vh', textAlign: 'center'}} className='login-container'>
                <div className='main-container'>
                    <div className='header'>
                        <div className='header-logo'>
                            <img src="/img/login-logo.svg" />
                        </div>
                        <div className='header-text'>
                            <p className='main-caption'>LOG IN</p>
                            <p className='sub-caption' onClick={() => {history.push('/signup')}}>SIGN UP</p>
                        </div>
                    </div>
               
                    <div className='signin'>
                        <Button label='Log in with Google' style={{marginBottom: '22px', marginTop: '8vh'}}></Button>
                        <Button label='Log in with Facebook'></Button>
                    </div>
                    <p>OR</p>
                    <div className='login-form'>
                        <TextField id="standard-basic" label="Email" variant="standard" style={{width: '100%', marginBottom: '35px'}}/>
                        <TextField id="standard-basic" label="Password" variant="standard" style={{width: '100%', marginBottom: '35px'}}/>
                        <Button className='btn-login' label='Log in' onClick={() => { history.push('/board') }}></Button>
                    </div>
                    <div className='copyright-container'>
                        <p className='copyright'>Copyright Trufflear2022</p>
                    </div>
                </div>
            </div>
        </>
    )
}