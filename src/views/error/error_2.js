import React from 'react';
import './index.scss'

export default function Error2(){
    return(
        <>
            <div className='error-container'>
                <div className='error-box'>
                    <div>
                        <div className='img-cover'>
                            <img className='error-img' src='/img/login-logo.png'></img>
                        </div>
                        <p className='error-text'>The profile you’re looking for is not live.</p>
                    </div>
                </div>
            </div>
        </>
    )
}