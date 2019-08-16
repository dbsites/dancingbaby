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
import { TweenLite } from 'gsap';


class MessageBarComponent extends Component
{

    componentDidMount()
    {
        this.showBar();
    }

    componentDidUpdate()
    {
        this.showBar();
    }

    showBar()
    {
        TweenLite.killTweensOf('.messageBarComponent');
        TweenLite.set( '.messageBarComponent', { autoAlpha:1 });
        TweenLite.delayedCall( 5, this.hideBar )
    }

    hideBar()
    {
        TweenLite.to( '.messageBarComponent', .5, { autoAlpha:0 });
    }

    render()
    {
        if( !this.props.barMessage ) return null;

        return (
            <div className="messageBarComponent">
                <div className='messageTxt' >{this.props.barMessage}</div>
            </div>
        );
    }
}


export default MessageBarComponent;