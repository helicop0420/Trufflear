import React, { useEffect, useContext, useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom'

import { Button} from '@Components/UI';
import { authActions } from "Redux@Actions";
import  strings  from '../../locale/index'
import './index.scss'

export default function MainPage(){
    //Initial Config
    const dispatch = useDispatch();
    const history = useHistory();

    // States 
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // Contexts sets

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
            <div  style={{ height: '100vh'}} className='board-container'>
                <div className='header'>
                    <div className='header-logo'>
                        <img src="/img/login-logo.svg" />
                    </div>
                    <div className='header-text'>
                        <p className='main-caption'>{strings.onBoarding}</p>
                    </div>
                </div>
                <p className='main-caption'>Welcome, NAME</p>
                <p className='sub-caption'>{strings.boardOne}</p>
                <Button className='btn-connect' label='Connect with Instagram' style={{marginBottom: '40px'}}></Button>
                <p className='sub-caption'>{strings.boardTwo} </p>
                <p className='sub-caption'>{strings.boardThree} </p>
                <p className='sub-caption'>{strings.boardFour}</p>
                <div className='signup-form'>
                    <Button className='btn-signup' label={strings.getStarted}></Button>
                </div>
                <p className='copyright'>Copyright Trufflear2022</p>
            </div>
        </>
    )
}