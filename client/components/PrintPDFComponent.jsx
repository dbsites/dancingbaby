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
import * as strings from "../constants/strings";
import { TweenLite } from 'gsap';
import dbLogo from '../assets/images/dbLogo.png';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


export default class PrintPDFComponent extends Component
{

    componentDidUpdate()
    {
        this.setGauge();
        this.exportPdf();
    }

    setGauge()
    {
        const rotateTo = 180 * .5; // ( 1 - this.props.resultInfringement );
        TweenLite.set( '.resultGageArrow', {rotation:rotateTo, transformOrigin:"50% 50%" });
    }

    exportPdf = () =>
    {

        if( !this.props.downloadPDF ) return null;

        const pdf = new jsPDF( "p", "px", "a4", true );
        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();

        console.log( "EXPORT PDF CALLED: ", width, height );

        const pages = [document.getElementById('page_2'), document.getElementById('page_1')];
        const imageData = [];

        let imgData;

        pdf.scaleFactor = 2;

        // Create a new promise with the loop body
        let addPages = new Promise(( resolve, reject ) =>
        {
            pages.forEach((page, index) =>
            {
                html2canvas( page, { scale:2 })
                    .then( canvas =>
                    {
                        canvas.getContext('2d');
                        imgData = canvas.toDataURL('image/png');
                        imageData.push( imgData );
                        savePDF();
                    });
            });

        });

        const savePDF = () =>
        {
            if( imageData.length < pages.length ) return null;

            let data;

            for( let i = imageData.length -1; i > -1; i-- )
            {
                data = imageData[i];
                pdf.addImage( data, 'PNG', 0, 0, width, height, undefined, 'FAST' );
                if( i === imageData.length -1 ) pdf.addPage();
            }
            // imageData.forEach(( data, index ) =>
            // {
            //     pdf.addImage( data, 'PNG', 0, 0, width, height );
            //     if( index < imageData.length -1 ) pdf.addPage();
            // });

            pdf.save('ResultsPDF');
        };


        addPages.finally(() =>
        {
            console.log("Saving PDF");
            pdf.save('ResultsPDF');
        });
    };

    render()
    {
        // console.log( "PRINT PDF COMPONENT: ", this.props );

        const { suspectContent, resultText, fairUse, infringement } = this.props;
        const resultTitle = `${suspectContent[strings.ASSESSMENT_INFO_IDS.VIDEO_TITLE]} exhibits a:`;
        const resultTextIndicator = resultText ? <span><span className={resultText.color}>{resultText.txt}</span> indication of fair use.</span> : 'indication of fair use.';

        const preparedFor = `Prepared for Jane Doe`;
        const orgName = `ORGANIZATION NAME: Sample Company`;

        const factorsAgainst = `Number of factors AGAINST FAIR USE: ${infringement}`;
        const factorsTowards = `Number of factors pointing towards FAIR USE: ${fairUse}`;

        const determinedTxt = `Dancing Baby’s copyright fair use algorithm has determined that the suspected content, “Prince - Let’s Go Crazy #1” shows a MODERATE indication of fair use. There were several factors that led us to this conclusion. Among them were your answers to the questions`;

        if( !this.props.downloadPDF ) return null;

        return (
            <div id='printPDFComponent' className="printPDFComponent">

                <div id='page_1' className='page'>

                    <div className='date'>DATE: 00/00/00</div>
                    <div className='preparedFor'>{ preparedFor }</div>
                    <div className='orgName'>{ orgName }</div>

                    <div className='logoContainer'>
                        <img src={dbLogo} className='logo' alt='logo' />
                    </div>

                    <div className='algorithmTxt'>Dancing Baby™ Copyright Fair Use Algorithm</div>

                    <div className='profilesTitle' >CONTENT PROFILES:</div>
                    <div className='profiles panel'>
                        <div className='primaryContent'>
                            <div className='contentTitle'>Primary Content:</div>
                            <div className='title'>Title: PLACE HOLDER</div>
                            <div className='fileType'>File Type: PLACE HOLDER</div>
                            <div className='url'>URL: PLACE HOLDER</div>
                            <div className='contentDate'>Publish Date: PLACE HOLDER</div>
                            <div className='author'>Author: PLACE HOLDER</div>
                            <div className='count'>View Count: PLACE HOLDER</div>
                        </div>
                        <div className='secondaryContent'>
                            <div className='contentTitle'>Secondary Content:</div>
                            <div className='title'>Title: PLACE HOLDER</div>
                            <div className='fileType'>File Type: PLACE HOLDER</div>
                            <div className='url'>URL: PLACE HOLDER</div>
                            <div className='contentDate'>Publish Date: PLACE HOLDER</div>
                            <div className='author'>Author: PLACE HOLDER</div>
                            <div className='count'>View Count: PLACE HOLDER</div>
                        </div>
                    </div>

                    <div className='analysisTitle' >ANALYSIS:</div>
                    <div className='analysis panel'>
                        <div className='subTitleContainer'>Your input has been analyzed using the Dancing Baby™ Algorithm.</div>
                        <div className='resultTitle' >{ resultTitle }</div>
                        <div className='resultGage' >
                            <div className='resultGageImage' />
                            <div className='resultGageArrow' />
                        </div>
                        <div className='textIndicator'>{ resultTextIndicator }</div>
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

                <div id='page_2' className='page'>

                    <div className='date'>DATE: 00/00/00</div>
                    <div className='preparedFor'>{ preparedFor }</div>
                    <div className='orgName'>{ orgName }</div>

                    <div className='analysisTitlePage2' >ANALYSIS CONTINUED:</div>
                    <div className='analysisPage2 panel'>
                        <div className='determinedTxt'>{ determinedTxt }</div>

                        <div className='topThreeQuestionsContainer'>
                            <div className='question1'>
                                <div className='question'>"Does the borrowing work profit from the borrowing use?"</div>
                                <div className='answered'>(You answered "NO")</div>
                            </div>
                            <div className='question2'>
                                <div className='question'>"Does the borrowing work add new information, aesthetics, insights or understandings compared to the source work?"</div>
                                <div className='answered'>(You answered "YES")</div>
                            </div>
                            <div className='question3'>
                                <div className='question'>"Has the source work been published, displayed or performed prior to the borrowing work?"</div>
                                <div className='answered'>(You answered "YES")</div>
                            </div>
                        </div>

                        <div className='toAssistTxt'>To assist your review we include statutory references below.</div>
                    </div>

                    <div className=''>17 U.S. Code § 107. Limitations on exclusive rights: Fair use</div>
                    <div className='references1 panel'>
                        <p>
                            Notwithstanding the provisions of sections 106 and 106A, the fair use of a copyrighted work, including such
                            use by reproduction in copies or phonorecords or by any other means specified by that section, for purposes
                            such as criticism, comment, news reporting, teaching (including multiple copies for classroom use), scholarship,
                            or research, is not an infringement of copyright. In determining whether the use made of a work in any particular
                            case is a fair use the factors to be considered shall include—

                            (1) the purpose and character of the use, including whether such use is of a commercial nature or is for
                            nonprofit educational purposes;
                            (2) the nature of the copyrighted work;
                            (3) the amount and substantiality of the portion used in relation to the copyrighted work as a whole; and
                            (4) the effect of the use upon the potential market for or value of the copyrighted work.

                            The fact that a work is unpublished shall not itself bar a finding of fair use if such finding is made upon
                            consideration of all the above factors.
                        </p>
                    </div>

                    <div className=''>17 U.S. Code § 512 (c) (3) (A) (v) </div>
                    <div className='references2 panel'>
                        <p>
                            A takedown notice under the DMCA must include "a statement that the complaining party has a good faith belief
                            that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.”
                        </p>
                    </div>

                    <div className='companyName companyInfo'>Alsometric</div>
                    <div className='companyEmail companyInfo'>info@alsometric.com</div>
                    <div className='companyPhone companyInfo'>888-888-8888</div>
                    <div className='companyURL companyInfo'>alsometric.com</div>

                    <div className='disclaimerTxt'>
                        <p>
                            DISCLAIMER: I understand that this assessment tool is for demonstration purposes only and does not constitute legal advice. I understand
                            that the information contained in this demonstration is confidential, copyrighted, may constitute trade secrets, and may not be shared with
                            others without permission. I have read and agree to the Terms of Use and Privacy Policy.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}