import React from 'react';
import dbLogo from '../assets/svg/db_logo_greenyellow.svg';


const MobileComponent = ( props ) =>
{
    const { contactPath } = props;

    return (
        <div className='mobileComponent'>

            <div className='logoContainer'>
                <img src={dbLogo} className='logo' alt='logo' />
            </div>

            <div className='contactLink' id='contact'><a className='urlLink' href={contactPath} target='blank'>contact</a></div>

            <div className='text text1' >Dancing Baby beta is not configured for mobile devices.</div>

            <div className='text text2' >Please visit on a desktop / laptop.</div>

        </div>
    );
};


export default MobileComponent;