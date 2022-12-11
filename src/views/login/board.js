import React, { useEffect, useContext, useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { useHistory, useLocation } from 'react-router-dom'
import Button from '@material-ui/core/Button';
// import { PassField, TextField, Button, Paper} from '@Components/UI';
import { authActions } from "Redux@Actions";
import { AppContext } from '../../App';
import { useTranslation } from 'react-i18next';
import './board.scss'

const {InfluencerAccountConnectIgServiceClient} = require('../../network/services/influencer_account_connect_ig_service_grpc_web_pb');

const {GetIgAuthorizationWindowUrlRequest,ConnectIgUserMediaRequest} = require('../../network/services/influencer_account_connect_ig_service_pb');

var client = new InfluencerAccountConnectIgServiceClient('https://api.trufflear.com:8080/', null, null);


export default function BoardPage(props){
    //Initial Config
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const { t, i18n } = useTranslation();
    // Contexts sets
    const appConstants = useContext(AppContext);

    const handleConnect = (e) => { 
        var request = new GetIgAuthorizationWindowUrlRequest();
        var token = localStorage.getItem('trufflear-token')
        var metadata = {'id-token': token};
        client.getIgAuthorizationWindowUrl(request, metadata, (err, response) => {
            if(err) {
                console.error('getIgAuth', err)
            } else {
                console.log('url', response.getUrl())
                window.location.href = response.getUrl()
            }
        })
    }

    useEffect(()=> {
        if(location.search.indexOf('code=')>-1) {
            console.log('code=', location.search.split('code=')[1])
            let authcode = location.search.split('code=')[1]
            var request = new ConnectIgUserMediaRequest();
            request.setInstagramAuthCode(authcode);
            // request.setInstagramAuthCode('AQAAQbB6PPtG1K-7t9SpbClC028Qr1S8rlnaQ33DBZFWFekTL[…]hjD9xfJQVV8BbOtetyB_ZazyUASbkECEQrUwWYZHo7E57jN50dPgzoIkZzZg');
            var token = localStorage.getItem('trufflear-token')
            var metadata = {'id-token': token};
            client.connectIgUserMedia(request, metadata, (err, response) => {
                if(err) {
                    console.error('connectIgUserMedia', err)
                } else {
                    console.log('url', response.getUrl())
                }
            })
        }
    }, [])

    return(
        <>
            <div className='board-container'>
                <div className='main-container'>
                    <div className='header'>
                        <div className='header-logo'>
                            <img src="/img/admin-logo.svg" />
                        </div>
                        <div className='header-text'>
                            <p className='main-caption'>{t('onBoarding')}</p>
                        </div>
                    </div>
                    <p className='main-caption'>{t('welcome')}, NAME</p>
                    <p className='sub-caption'>{t('boardOne')}</p>
                    <Button className='btn-connect' style={{marginBottom: '40px'}} onClick={handleConnect}><img style={{marginRight:'10px'}} src='/img/icon-instagram.svg'></img>{t('connectInsta')}</Button>
                    <p className='sub-caption'>{t('boardTwo')} </p>
                    <p className='sub-caption'>{t('boardThree')} </p>
                    <p className='sub-caption'>{t('boardFour')}</p>
                    <div className='signup-form'>
                        <Button className='btn-signup' onClick={() => { history.push('/profile') }}>{t('getStarted')}</Button>
                    </div>
                    <div className='copyright-container'>
                        <p className='copyright'>Copyright Trufflear2022</p>
                    </div>
                </div>
            </div>
        </>
    )
}