import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Amplify, Auth, Hub } from 'aws-amplify';
import { useHistory } from 'react-router-dom'
import awsconfig from './aws-exports';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'

awsconfig.oauth.redirectSignIn = `${window.location.origin}/auth`;
awsconfig.oauth.redirectSignOut = `${window.location.origin}/auth`;

Amplify.configure(awsconfig);


ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <App />
  </I18nextProvider>
  ,document.getElementById('root')
);
