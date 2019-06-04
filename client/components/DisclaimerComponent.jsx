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


let DisclaimerComponent = ( props ) =>
{
    const { openContact, handleSubmit, onSubmit } = props;

    return (
        <div>
            <div className='title'>DISCLAIMER</div>
            <div className='disclaimerBox'>
                <div className='checkbox'></div>
            </div>
        </div>
    );
};


export default DisclaimerComponent;