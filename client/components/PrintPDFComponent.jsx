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
import dbLogo from '../assets/svg/db_logo_greenyellow.svg';
import * as strings from "../constants/strings";

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


export default class PrintPDFComponent extends Component
{

    componentDidUpdate()
    {
        this.exportPdf();
    }

    exportPdf = () =>
    {
        console.log( "EXPORT PDF CALLED: ", this.props.downloadPDF );

        if( !this.props.downloadPDF ) return null;

        const pdf = new jsPDF("p", "mm", "a4");
        // const divHeight = $('#printPDFComponent').height();
        // const divWidth = $('#printPDFComponent').width();
        // const ratio = divHeight / divWidth;

        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();
        // height = ratio * width;

        html2canvas( document.querySelector("#printPDFComponent")).then( canvas =>
        {
            // console.log( "EXPORT PDF CALLED: CANVAS: ", canvas );

            document.body.appendChild( canvas );  // if you want see your screenshot in body.

            const imgData = canvas.toDataURL('image/png');
            pdf.addImage( imgData, 'PNG', 0, 0, width, height );

            // console.log( "EXPORT PDF CALLED: PDF: ", pdf );
            pdf.save("download.pdf");

        });

    };

    render()
    {
        console.log( "PRINT PDF COMPONENT: ", this.props );

        const { suspectContent, resultText, fairUse, infringement } = this.props;
        const resultTitle = `${suspectContent[strings.ASSESSMENT_INFO_IDS.VIDEO_TITLE]} exhibits a:`;
        const resultTextIndicator = resultText ? <span><span className={resultText.color}>{resultText.txt}</span> indication of fair use.</span> : 'indication of fair use.';

        const factorsAgainst = `Number of factors AGAINST FAIR USE: ${infringement}`;
        const factorsTowards = `Number of factors pointing towards FAIR USE: ${fairUse}`;

        if( !this.props.downloadPDF ) return null;

        return (
            <div id='printPDFComponent' className="printPDFComponent">
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
            </div>
        );
    }
}