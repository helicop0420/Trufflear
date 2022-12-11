import React, { useEffect, useContext, useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { authActions } from "Redux@Actions";
import { AppContext } from '../../App';
import  strings  from '../../locale/index'
import {Auth} from 'aws-amplify';
import { useTranslation } from 'react-i18next';
import './index.scss'

const {InfluencerAccountServiceClient} = require('../../network/services/influencer_account_service_grpc_web_pb');

const {GetProfileRequest, GetProfileImageUploadUrlRequest} = require('../../network/services/influencer_account_service_pb');

var client = new InfluencerAccountServiceClient('https://api.trufflear.com:8080/', null, null);

export default function ProfilePage(){
    //Initial Config
    const dispatch = useDispatch();
    const history = useHistory();
    const { t, i18n } = useTranslation();

    // States 
    const [isLoading, setLoading] = useState(false);
    // Contexts sets
    const appConstants = useContext(AppContext);

    // Selectors
    const { loggedIn } = useSelector(state => state.security.auth)

    const handleRefresh = e => {
        setLoading(!isLoading)
    }

    const addPhoto = e => {
        let input = document.getElementById('photo-input')
        input.click()
    }

    const uploadPhoto = e => {
        let file = e.target.file
    }


    useEffect(() => {
        async function fetchData() {
            if(loggedIn){
                //Fez login
                history.push('/app');
            }
            let curretSession = await Auth.currentSession();
            let token = curretSession.getIdToken().getJwtToken();
            console.log('user_info', curretSession.getIdToken().getJwtToken())
            //eslint-disable-next-line
            let request = new GetProfileRequest()
            var metadata = {'id-token': token};
            client.getProfile(request, metadata, (err, response) => {
                if(err) {
                    console.error('error',err)
                    return;
                }
                console.log('getprofile_response', response)
            });
            let getImgUrlRequest = new GetProfileImageUploadUrlRequest()
            client.getProfileImageUploadUrl(getImgUrlRequest, metadata, (err, response) => {
                if(err) {
                    console.error('error',err)
                    return;
                }
                console.log('getProfileImageUploadUrl', response)
            });
        }
        fetchData();
    }, [loggedIn])


    return(
        <>
            <div className='profile-container'>
                <div className='main-container'>
                    <div className='top-panel'>
                        <div className='header'>
                            <div className='header-logo'>
                                <img src="/img/admin-logo.svg" />
                            </div>
                            <div className='header-text'>
                                <p className='main-caption'>{t('refreshPost')}</p>
                            </div>
                            <div className='cursor-pointer' onClick={()=>{history.push('/setting')}}><img src='/img/setting.svg'></img></div>
                        </div>
                        <div className={isLoading?'refresh-ment':'d-hidden refresh-ment'}>
                            <p>{t('refreshMent')}</p>
                        </div>
                    </div>
                    <div className='sub-container'>
                        <div className='refresh-container' >
                            <div className={isLoading?'refresh-box color-change':'refresh-box'} onClick={handleRefresh}>
                                <img src='/img/refresh-spin.svg' className={isLoading?'img-rotate':''}></img>
                                {t('refresh')}
                            </div>
                        </div>
                        <div className='domain-container'>
                            <div className='domain-box'>
                                trufflear.com/4foodie
                                <img src='/img/btn-copy.svg'></img>
                            </div>
                        </div>
                        <div className='profile-title'>
                            <div className='title-content'>
                                <span>{t('editProfile')}</span>
                                <img src='/img/btn-edit.svg'></img>
                            </div>
                        </div>
                        <div className='user-container'>
                            <div className='user-avatar'>
                                {/* <img src='/img/avatar.png'></img> */}
                                <p onClick={addPhoto}>{t('addPhoto')}</p>
                                <input type='file' id='photo-input' hidden onChange={uploadPhoto}></input>
                            </div>
                            <div className='user-info'>
                                <p className='user-name'>NAME</p>
                                <p className='user-influencer'>Trufflear Influencer</p>
                                <p className='user-about'>About</p>
                            </div>
                        </div>
                        <div className='copyright-container'>
                            <p className='copyright'>Copyright Trufflear2022</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}