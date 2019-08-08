/**
 * ************************************
 *
 * @module  ResultsComponent
 * @author  katzman
 * @date    06/18/2019
 * @description
 *
 * ************************************
 */


import React from 'react';
import { TweenLite, Sine } from 'gsap';
import * as strings from '../constants/strings';
import dbLogo from '../assets/svg/db_logo_greenyellow.svg';
import Utils from "../js/Utils";
import PrintPDFComponent from './PrintPDFComponent';
import arrow from "../assets/svg/arrow.svg";
import backBtnArrow from '../assets/svg/backBtn.svg';


export default class ResultsComponent extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            downloadPDF: false
        }
    }

    componentDidMount()
    {
        this.animateGauge();
        this.setLegendElementBold();
    }

    animateGauge()
    {
        const rotateTo = 180 * ( 1 - this.props.resultInfringement );
        TweenLite.to( '.resultGageArrowSVG', 3, {rotation:rotateTo, transformOrigin:"50% 50%", ease:Sine.easeInOut});
    }

    setLegendElementBold()
    {
        if( !this.props.resultText ) return;

        const element = document.querySelector( `.${this.props.resultText.legendClass}` );
        Utils.addClass( element, 'currentLegendElement' );
    }

    downloadReport = () =>
    {
        this.setState({ downloadPDF:true });
    };

    render()
    {
        const { assessmentInfo, resultText, fairUse, infringement, resultInfringement, startOver } = this.props;
        const suspectedContent = assessmentInfo[strings.ASSESSMENT_INFO_IDS.SECONDARY_CONTENT] || {};

        const resultTitle = `${suspectedContent[strings.ASSESSMENT_INFO_IDS.PUBLISHER] || 'n/a'} - ${suspectedContent[strings.ASSESSMENT_INFO_IDS.TITLE] || 'n/a' } exhibits a:`;
        const resultTextIndicator = resultText ? <span><span className={resultText.color}>{resultText.txt}</span> indication of fair use.</span> : 'indication of fair use.';

        const factorsAgainst = `Number of factors AGAINST FAIR USE: ${infringement}`;
        const factorsTowards = `Number of factors pointing towards FAIR USE: ${fairUse}`;

        return (

            <div className="resultsComponent">

                <div className='logoUpperRighContainer'>
                    <img src={dbLogo} className='logoSmallUpperRight' alt='logo' />
                </div>

                <div className='titleContainer'>RESULTS</div>

                <div className='subTitleContainer'>Your input has been analyzed using the Dancing Baby™ Algorithm.</div>

                <div className='resultsContent' >
                    <div className='resultTitle' >{resultTitle}</div>
                    <div className='resultGage' >
                        <div className='resultGageSVG' />
                        <div className='resultGageArrowSVG' />
                    </div>
                    <div className='resultColorLegend' >
                        <div className='veryStrong'>VERY STRONG Indication of Fair Use</div>
                        <div className='strong'>STRONG Indication of Fair Use</div>
                        <div className='moderate'>MODERATE Indication of Fair Use</div>
                        <div className='weak'>WEAK Indication of Fair Use</div>
                        <div className='noEvidence'>No Evidence of Fair Use</div>
                    </div>
                    <div className='textIndicatorContainer'>
                        <div className='textIndicator'>
                            { resultTextIndicator }
                        </div>
                    </div>
                    <div className='factorsContainer'>
                        <div className='factorsAgainst'>
                            { factorsAgainst }
                        </div>
                        <div className='factorsTowards'>
                            { factorsTowards }
                        </div>
                    </div>
                </div>

                <div className='downloadBtnContainer'>
                    <button className='downloadBtn' onClick={this.downloadReport} type='submit'>
                        <span>DOWNLOAD REPORT</span>
                        <img src={arrow} className='arrow' alt='arrow' />
                    </button>
                </div>

                <div className='restartBtnContainer'>
                    <button className='restartBtn' onClick={this.props.startOver}>
                        <span>START OVER</span>
                        <img src={backBtnArrow} className='backBtnArrow' alt='backBtnArrow' />
                    </button>
                </div>

                <PrintPDFComponent {...this.props} downloadPDF={this.state.downloadPDF} />
            </div>
        );
    }
}