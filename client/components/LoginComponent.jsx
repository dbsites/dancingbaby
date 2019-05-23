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


const LoginComponent = props =>
{
    const { openContact, handleSubmit } = props;

    return (
        <div>
            <div onClick={openContact} id="contact">CONTACT</div>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="userName">USERNAME</label>
                    <Field name="userName" component="input" type="text" />
                </div>
                <div>
                    <label htmlFor="password">PASSWORD</label>
                    <Field name="password" component="input" type="text" />
                </div>
                <button type="submit">ENTER</button>
            </form>
        </div>
    );
};

export default MarketCreator;