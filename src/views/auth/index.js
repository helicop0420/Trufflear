import { Amplify, Hub, Auth } from 'aws-amplify';
import React, { useEffect, useContext, useState } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './index.scss'
import { useHistory } from 'react-router-dom'

const {InfluencerAccountServiceClient} = require('../../network/services/influencer_account_service_grpc_web_pb');

const {SignupRequest} = require('../../network/services/influencer_account_service_pb');

var client = new InfluencerAccountServiceClient('https://api.trufflear.com:8080/', null, null);
var isSign = false;

export default function AuthPage({ signOut, user }) {
  const history = useHistory();

  useEffect(() => {
    Hub.listen("auth", async ({ payload: { event, data } }) => {
      console.log(data);
      switch (event) {
        case "signIn":
          console.log("signin=========")
          getUser()
          break;
        case 'signUp':
          console.log('signup occur')
          //console.log( await Auth.currentUserInfo());
          break;
      }
    });

    getUser()

  }, []);

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then(async(userData) => {
        let curretSession = await Auth.currentSession();
        let token = curretSession.getIdToken().getJwtToken();
        let request = new SignupRequest()
        var metadata = {'id-token': token};
        console.log('token', token)
        client.signup(request, metadata, (err, res)=>{
          if(err) {
            if(err.code == 6) {
              localStorage.setItem('trufflear-token', token)
              history.push('/board/?code=sdfsdfsdffdff')
            } else {
              console.log('not sign')
            }
          }
          localStorage.setItem('trufflear-token', token)
          history.push('/board/?code=sfsfdfs')
        })

      })
      .catch(() => console.log('Not signed in'));
  }
  
  return (
    <>
    <div className='auth-panel'>
      <div className='main-container'>

          <div className='header'>
              <div className='header-logo'>
                  <img src="/img/admin-logo.svg" />
              </div>
              <div className='header-text'>
                  <p className='main-caption'>Trufflear</p>
              </div>
          </div>
          <Authenticator>
            {({ signOut, user }) => {
              return (<div></div>)
            }}
          </Authenticator>
        </div>
    </div>
    </>
  );
}
