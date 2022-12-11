import React, { useEffect, useContext, useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from 'react-router-dom'
import { authActions } from "Redux@Actions";
import { AppContext } from '../../App';
import './index.scss'


const useStyles = makeStyles((theme) => ({
    form: {
        padding: theme.spacing(2),
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5)
    },
    header:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),
        paddingBottom: 0
    },
    input: {
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1)
    },
    button: {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(3),
    },
    loginText: {
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    displayLogo: {
        display: 'flex',
        alignItems: 'center',
        marginRight: '8px'
    },
    logoTopText: {
        marginBottom: '1px', 
        marginTop: '0',
        fontFamily: 'Inter',
        fontWeight: '700',
        color: '#282828',
        fontSize: '20px',
        lineHeight: '24px'
    }
}));


export default function LoginPage(){
    //Initial Config
    const classes = useStyles();
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
        <div className='home-panel'>
            <div className='main-container'>              
                    <div style={{display: 'flex'}} className='logo-box '>
                        <div className={classes.displayLogo}>
                            <img src="/img/admin-logo.svg" />
                        </div>
                        <div className={classes.loginText}>
                            <p className='login-top-text'>TRUFFLEAR</p>
                            <p className='login-bottom-text'>Search engine for your content</p>
                        </div>
                    </div>
                    <div className='intro'>
                        <p>
                        <b>Search Made Easier</b><br></br><br></br>
                        With hundred or thousands of your food posts on <b>Instagram</b>,
                        your followers can now search through them with Trufflear! 🥐<br></br><br></br><br></br>
                        Upcoming Feature(s):<br></br><br></br>
                        <b>Keyword Analytics</b> <br></br><br></br>
                        Can show which keywords bring the most traffic to you page 🔍
                        </p>
                    </div>
                    <div className='btn-container'>
                        <img src='/img/btn-play.svg' onClick={()=>{history.push('/auth')}}></img>
                    </div>   
                    
                    <p className='copyright'>Copyright Trufflear2022</p>
            </div>
        </div>
        </>
    )
}