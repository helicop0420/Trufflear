import React from 'react';
import './index.scss'

export default function Error1(){
    return(
        <>
            <div className='error-container'>
                <div className='error-box'>
                    <div>
                        <div className='img-cover'>
                            <img className='error-img' src='/img/login-logo.png'></img>
                        </div>
                        <p className='error-text'>The page you’re looking for doesn’t exist.</p>
                    </div>
                </div>
            </div>
        </>
    )
}