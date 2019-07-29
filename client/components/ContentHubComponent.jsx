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
import moment from 'moment';
import YouTube from 'react-youtube';
import { TweenLite } from 'gsap';
import arrow from '../assets/svg/greyArrow.svg';
import * as strings from '../constants/strings';


const videoOptions = {
    height: '157',
    width: '265',
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

        };

        this.youTubeVideos = [];
    }

    componentDidMount()
    {
        this.openCloseHub();
    }

    componentDidUpdate()
    {
        this.openCloseHub();
    }

    videoReady = ( event ) =>
    {
        this.youTubeVideos.push( event.target );
    };

    openCloseHub()
    {
        const rotateTo = this.props.isHubOpen ? -180 : 0;
        const rotateStart = this.props.isHubOpen ? 0 : -180;

        const opacityStart = this.props.isHubOpen ? 0 : 1;
        const opacityEnd = this.props.isHubOpen ? 1 : 0;

        TweenLite.to( '#arrowBtn', .5, { rotation:rotateTo } );
        TweenLite.to( '.panelItem', .5, { opacity:opacityEnd } );

        this.youTubeVideos.forEach(( video ) =>
        {
            video.pauseVideo();
        });
    }

    render()
    {
        const classNames = `arrowBtn ${ this.props.isHubOpen ? 'arrowBtnOpen' : '' }`;

        const suspectContent = this.props.assessmentInfo[strings.ASSESSMENT_INFO_IDS.SUSPECTED_CONTENT];
        const copyrightContent = this.props.assessmentInfo[strings.ASSESSMENT_INFO_IDS.COPYRIGHTED_CONTENT];

        const copyrightId = copyrightContent ? copyrightContent[strings.ASSESSMENT_INFO_IDS.VIDEO_ID] : null;
        const suspectId = suspectContent ? suspectContent[strings.ASSESSMENT_INFO_IDS.VIDEO_ID] : null;

        return (
            <div className="contentHubComponent">

                <div className='hubTitle'>CONTENT HUB</div>

                <div className='hubContent' >

                    <ContentPanelItem
                        title='PRIMARY CONTENT'
                        id={copyrightId}
                        info={copyrightContent}
                        videoReady={ this.videoReady }
                    />

                    <div className='openCloseBtn' onClick={this.props.openCloseContentHub}>
                        <img id='arrowBtn' className={classNames} src={arrow} alt='arrow' />
                    </div>

                    <ContentPanelItem
                        title='SECONDARY CONTENT'
                        id={suspectId}
                        info={suspectContent}
                        videoReady={ this.videoReady }
                    />

                </div>
            </div>
        );
    }
}

const ContentPanelItem = ( props ) =>
{

    console.log( ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> CONTENT PANEL ITEM: ", props );

    const info = props && props.info ? props.info : {};

    const title     = info[strings.ASSESSMENT_INFO_IDS.VIDEO_TITLE] || 'n/a';
    const publisher = info[strings.ASSESSMENT_INFO_IDS.VIDEO_PUBLISHER] || 'n/a';
    const viewCount = info[strings.ASSESSMENT_INFO_IDS.VIDEO_VIEW_COUNT] || 'n/a';
    const date      = info[strings.ASSESSMENT_INFO_IDS.VIDEO_PUBLISH_DATE] || 'n/a';
    const url       = info[strings.ASSESSMENT_INFO_IDS.VIDEO_URL] || 'n/a';

    const getContent = () =>
    {
        if( !props.id && info[strings.ASSESSMENT_INFO_IDS.VIDEO_URL] )
        {
            return <div>REGULAR VIDEO</div>
        }

        if( !props.id && !info[strings.ASSESSMENT_INFO_IDS.VIDEO_URL] )
        {
            return <div>NO VIDEO CONTENT</div>
        }

        return (
            <div className='videoContainer'>
                <YouTube
                    videoId={ props.id }
                    opts={videoOptions}
                    className="youtubeModalVideo"
                    onReady={ props.videoReady }
                />
            </div>
        )
    };

    return (
        <div className='panelItem'>

            <div className='panelItemTitle'>{props.title}</div>

            { getContent() }

            <div className='panelItemInfo'>
                <div className='itemTitle'>Title: {title}</div>
                <div className='itemURL'><a className='urlLink' href={url} target='blank'>URL</a></div>
                <div className='itemDate'>Publish Date: {moment( date ).format('ll')}</div>
                <div className='itemPublisher'>Author: {publisher}</div>
                <div className='itemCount'>View Count: {viewCount}</div>
            </div>
        </div>
    )
};


export default ContentHubComponent;