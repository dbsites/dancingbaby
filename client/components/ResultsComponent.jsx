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
import dbLogo from '../assets/svg/db_logo_greenyellow.svg';
import resultGage from '../assets/svg/arrowAndGradient.svg';


const ResultsComponent = ( props ) =>
{

    const { titleSuspect, resultText, fairUse, infringement, resultInfringement, startOver, downloadReport } = props;

    const resultTitle = `${titleSuspect} exhibits a:`;
    const resultTextIndicator = <span><span className={resultText.color}>{resultText.txt}</span> indication of fair use.</span>;

    const factorsAgainst = `Number of factors AGAINST FAIR USE:${infringement}`;
    const factorsTowards = `Number of factors pointing towards FAIR USE:${fairUse}`;

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
                    <img src={resultGage} className='resultGageSVG' alt='logo' />
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
                <button className='downloadBtn' onClick={downloadReport} type='submit'>DOWNLOAD REPORT</button>
            </div>
        </div>
    );
};


export default ResultsComponent;