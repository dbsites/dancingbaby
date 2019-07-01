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
import arrow from '../assets/svg/greyArrow.svg';


class ContentHubComponent extends Component
{
    constructor( props )
    {
        super( props );

        this.state = {

        }
    }

    render()
    {
        return (
            <div className="contentHubComponent">

                <div className='hubTitle'>CONTENT HUB</div>

                <div className='hubContent' >

                    <ContentPanelItem title='COPYRIGHTED CONTENT' data={null} />
                    <ContentPanelItem title='SUSPECTED CONTENT' data={null} />

                    <div className='openCloseBtn' onClick={this.props.nextScreen}>
                        <img className='arrowBtn' src={arrow} alt='arrow' />
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