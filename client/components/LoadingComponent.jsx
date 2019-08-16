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

        TweenLite.killTweensOf('.messageBarComponent');
        TweenLite.delayedCall( 4, this.hide );
    };

    hide = () =>
    {
        TweenLite.to( '.loadingComponent', .5, { autoAlpha:0 });
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