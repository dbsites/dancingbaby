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


import React, {Component} from 'react';
import DBLogo from '../assets/svg/db_logo_greenyellow_animated.svg';
import { TweenLite } from 'gsap';


class LoadingComponent extends Component
{

    constructor( props )
    {
        super( props );

        this.fadingOut = false;
    }

    componentDidMount()
    {
        this.show();
    }

    componentDidUpdate()
    {
        this.show();
    }

    show = () =>
    {
        if( !this.props.showLoading ) return null;

        this.fadingOut = true;
        TweenLite.delayedCall( 4, this.hide );
    };

    hide = () =>
    {
        TweenLite.to( '.loadingComponent', .5, { autoAlpha:0, onComplete:this.clearLoading });
    };

    clearLoading = () =>
    {
        this.fadingOut = false;
    };

    render()
    {
        if( !this.props.showLoading ) return null;

        return (
            <div className="loadingComponent">
                <img src={DBLogo} className='logo' alt='logo' />
                <div className='loadingTxt' >{this.props.loadingMessage}...</div>
            </div>
        );
    }
}


export default LoadingComponent;