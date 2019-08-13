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

    constructor( props )
    {
        super( props );

        this.fadingOut = false;
    }

    componentDidMount()
    {
        this.fadingOut = true;
        TweenLite.delayedCall( 5, this.hideBar )
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        this.fadingOut = true;
        TweenLite.delayedCall( 5, this.hideBar )
    }

    hideBar()
    {
        // if( !this.props.loadingOpen ) return null;
        TweenLite.to( '.messageBarComponent', .5, { autoAlpha:0, onComplete:this.clearBar });
    }

    clearBar = () =>
    {
        this.props.hideBar();
    };

    render()
    {
        if( !this.props.showMessage ) return null;

        return (
            <div className="messageBarComponent">
                <div className='messageTxt' >{this.props.message}...</div>
            </div>
        );
    }
}


export default MessageBarComponent;