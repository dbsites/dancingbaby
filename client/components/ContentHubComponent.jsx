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
import YouTube from 'react-youtube';
import { TweenLite } from 'gsap';
import arrow from '../assets/svg/greyArrow.svg';
import * as strings from '../constants/strings';


const videoOptions = {
    height: '236',
    width: '420',
    playerVars: {
        autoplay: 0,
        modestbranding: 1
    }
};


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

        const opacityStart = this.props.isHubOpen ? 0 : 1;
        const opacityEnd = this.props.isHubOpen ? 1 : 0;

        TweenLite.fromTo( '#arrowBtn', .5, { rotation:rotateStart }, { rotation:rotateTo } );
        TweenLite.fromTo( '.panelItem', .5, { opacity:opacityStart }, { opacity:opacityEnd } );
    }

    render()
    {
        const classNames = `arrowBtn ${ this.props.isHubOpen ? 'arrowBtnOpen' : '' }`;
        const copyrightId = this.props.assessmentInfo[strings.ASSESSMENT_INFO_IDS.YOUTUBE_COPYRIGHTED_VIDEO_ID];
        const suspectId = this.props.assessmentInfo[strings.ASSESSMENT_INFO_IDS.YOUTUBE_SUSPECTED_VIDEO_ID];

        console.log( "CONTENT HUB VIDEO IDS: ", copyrightId, suspectId, this.props );

        return (
            <div className="contentHubComponent">

                <div className='hubTitle'>CONTENT HUB</div>

                <div className='hubContent' >

                    <ContentPanelItem title='COPYRIGHTED CONTENT' id={copyrightId} info={null} />

                    <div className='openCloseBtn' onClick={this.props.openCloseContentHub}>
                        <img id='arrowBtn' className={classNames} src={arrow} alt='arrow' />
                    </div>

                    <ContentPanelItem title='SUSPECTED CONTENT' id={suspectId} info={null} />

                </div>
            </div>
        );
    }
}

const ContentPanelItem = ( props ) =>
{
    return (
        <div className='panelItem'>

            <div className='panelItemTitle'>{props.title}</div>

            <YouTube
                videoId={ props.id }
                opts={videoOptions}
                className="youtubeModalVideo"
            />

            <div className='panelItemInfo'>

            </div>
        </div>
    )
};


export default ContentHubComponent;