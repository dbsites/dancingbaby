/**
 * ************************************
 *
 * @module  LoginComponent
 * @author  katzman
 * @date    05/22/2019
 * @description
 *
 * ************************************
 */


import React from 'react';
import { Field, reduxForm } from 'redux-form';
import dbLogo from '../assets/svg/db_logo_greenyellow.svg';


let LoginComponent = ( props ) =>
{
    const { openContact, handleSubmit, onSubmit } = props;

    return (
        <div className='loginComponent'>

            <div className='logoContainer'>
                <img src={dbLogo} className='logo' alt='logo' />
            </div>

            <div className='contactLink' onClick={openContact} id='contact'>contact</div>

            <form className='loginForm' onSubmit={handleSubmit( onSubmit )}>

                <div className='loginFieldLeft'>
                    <label htmlFor='username'>USERNAME</label>
                    <Field
                        className='inputField'
                        name='username'
                        component='input'
                        type='text'
                        placeholder="USERNAME"
                    />
                </div>

                <div className='loginField'>
                    <label htmlFor='password'>PASSWORD</label>
                    <Field
                        className='inputField'
                        name='password'
                        component='input'
                        type='password'
                        placeholder="PASSWORD"
                    />
                </div>

                <div className='submitBtnContainer'>
                    <button type='submit'>ENTER</button>
                </div>

            </form>
        </div>
    );
};

LoginComponent = reduxForm({ form: 'login' })( LoginComponent );

export default LoginComponent;