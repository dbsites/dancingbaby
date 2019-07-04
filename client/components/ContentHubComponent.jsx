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
import arrow from '../assets/svg/greyArrow.svg';


class ContentHubComponent extends Component
{
    constructor( props )
    {
        super( props );

        this.state = {

        }
    }

    componentDidMount()
    {
        this.openCloseHub();
    }

    componentDidUpdate()
    {
        this.openCloseHub();
    }

    openCloseHub()
    {
        const rotateTo = this.props.isHubOpen ? -180 : 0;
        const rotateStart = this.props.isHubOpen ? 0 : -180;

        TweenLite.fromTo( '#arrowBtn', .5, { rotation:rotateStart }, { rotation:rotateTo } );
    }

    render()
    {
        const classNames = `arrowBtn ${ this.props.isHubOpen ? 'arrowBtnOpen' : '' }`;

        return (
            <div className="contentHubComponent">

                <div className='hubTitle'>CONTENT HUB</div>

                <div className='hubContent' >

                    {/*<ContentPanelItem title='COPYRIGHTED CONTENT' data={null} />*/}
                    {/*<ContentPanelItem title='SUSPECTED CONTENT' data={null} />*/}

                    <div className='openCloseBtn' onClick={this.props.openCloseContentHub}>
                        <img id='arrowBtn' className={classNames} src={arrow} alt='arrow' />
                    </div>

                </div>
            </div>
        );
    }
}

const ContentPanelItem = ( props ) =>
{
    return (
        <div className='checkbox'>
            <div>

            </div>
        </div>
    )
};


export default ContentHubComponent;