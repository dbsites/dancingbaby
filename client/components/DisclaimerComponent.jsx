/**
 * ************************************
 *
 * @module  DisclaimerComponent
 * @author  katzman
 * @date    06/04/2019
 * @description
 *
 * ************************************
 */


import React from 'react';
import dbLogo from '../assets/svg/db_logo_greenyellow.svg';
import checkmark from '../assets/svg/checkMark.svg';


const DisclaimerComponent = ( props ) =>
{
    const { openContact, handleSubmit, onSubmit } = props;

    return (
        <div className="disclaimerComponent">

            <div className='logoUpperRighContainer'>
                <img src={dbLogo} className='logoSmallUpperRight' alt='logo' />
            </div>

            <div className='titleContainer'>
                <div className='title'>DISCLAIMER</div>
            </div>

            <div className='disclaimerBox'>
                <div className='checkBoxContainer top'>
                    <CheckBox checked={true} />
                    <div>I understand that this assessment tool is for demonstration purposes only and does not constitute legal advice.</div>
                </div>
                <div className='checkBoxContainer middle'>
                    <CheckBox/>
                    <div>I understand that the information contained in this demonstration is confidential, copyrighted, may constitute trade secrets, and may not be shared with others without permission</div>
                </div>
                <div className='checkBoxContainer bottom'>
                    <CheckBox checked={false} />
                    <div>I have read and agree to the Terms of Use and Privacy Policy.</div>
                </div>
            </div>
        </div>
    );
};

const CheckBox = ( props ) =>
{
    const updateCheck = () =>
    {
        console.log( "UPDATE CHECK CLICKED" );
    };

    const checkMarkCls = props.checked ? 'checkMark' : 'checkMark hide';

    return (
        <div onClick={updateCheck} className='checkbox'>
            <div className={checkMarkCls}>
                <img src={checkmark} className='checkmark' alt='checkmark' />
            </div>
        </div>
    )
};


export default DisclaimerComponent;