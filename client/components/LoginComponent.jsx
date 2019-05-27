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
    const { openContact, submit } = props;

    return (
        <div>

            <div className='logoContainer'>
                <img src={dbLogo} className='logo' alt='logo' />
            </div>

            <div className='contactLink' onClick={openContact} id='contact'>contact</div>

            <form className='loginForm' onSubmit={submit}>

                <div className='loginFieldLeft'>
                    <label htmlFor='userName'>USERNAME</label>
                    <Field
                        className='inputField'
                        name='userName'
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
                        type='text'
                        placeholder="PASSWORD"
                    />
                </div>

                {/*<button type='submit'>ENTER</button>*/}

            </form>
        </div>
    );
};

LoginComponent = reduxForm({
    // a unique name for the form
    form: 'login'
})(LoginComponent);

export default LoginComponent;