import React, { useEffect, useContext, useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { Box, Grid, Typography} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from 'react-router-dom'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { PassField, TextField,  Paper} from '@Components/UI';
import Button from '@material-ui/core/Button';
import { authActions } from "Redux@Actions";
import { AppContext } from '../../App';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Auth} from 'aws-amplify';
import { useTranslation } from 'react-i18next';
import './index.scss'


export default function SettingPage(){
    //Initial Config
    const dispatch = useDispatch();
    const history = useHistory();
    const { t, i18n } = useTranslation();

    // States 
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // Contexts sets
    const appConstants = useContext(AppContext);

    // Selectors
    const loggedIn = localStorage.getItem('trufflear-token'); 

    const handleSubmit = (e) => { 
        e.preventDefault()
        dispatch(authActions.Login({username,password}))
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const signOut = async() => {
        await Auth.signOut(); 
        localStorage.removeItem('trufflear-token'); 
        history.push('/home')
    }

    return(
        <>
            <div className='setting-container'>
                <div className='main-container'>
                    <div className='header'>
                        <div className='header-logo'>
                            <img src="/img/login-logo.svg" />
                        </div>
                        <div className='header-text'>
                            <p className='main-caption'>{t('setting')}</p>
                        </div>
                    </div>
               
                    <div className='live-setting'>
                        <p>{t('activeProfile')}</p>
                        <Switch
                            name="checkedB"
                            color="primary"
                            size='medium'
                            className='active-toggle'
                        />
                    </div>
                    <div className='any-question'>
                        <p className='link-helper'>{t('linkHelper')} </p>
                        <p className='link-dest'>team@trufflear.com</p>
                    </div>
                    <div className='copyright-container'>
                        <div className='footer'>
                            <Button className='btn-ok' onClick={() => {}}>{t('done')}</Button>
                            <Button className='btn-out' onClick={handleClickOpen}>{t('signout')}</Button>
                        </div>
                        <p className='copyright'>Copyright Trufflear2022</p>
                    </div>
                </div>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{t('question')}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {t('questionSignout')}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    {t('disagree')}
                </Button>
                <Button onClick={signOut} color="primary" autoFocus>
                    {t('agree')}
                </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}