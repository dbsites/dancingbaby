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
import moment from 'moment';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Utils from "../js/Utils";


export default class PrintPDFComponent extends Component
{

    componentDidUpdate()
    {
        this.setGauge();
        this.exportPdf();
    }

    setGauge()
    {
        const rotateTo = 180 * ( 1 - this.props.resultInfringement );
        TweenLite.set( '.resultGageArrow', {rotation:rotateTo, transformOrigin:"50% 50%" });
    }

    exportPdf = () =>
    {

        if( !this.props.downloadPDF ) return null;

        const pdf = new jsPDF( "p", "px", "a4", true );
        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();

        const pages = [document.getElementById('page_2'), document.getElementById('page_1')];
        const imageData = [];

        let imgData;

        pdf.scaleFactor = 2;

            pages.forEach((page, index ) =>
            {
                html2canvas( page, { scaleFactor:2 })
                    .then( canvas =>
                    {
                        canvas.getContext('2d');
                        imgData = canvas.toDataURL('image/png');
                        imageData.push( imgData );
                        savePDF();
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

            pdf.save('ResultsPDF');
        };
    };

    getResultsQuestions()
    {
        const { resultMatrix } = this.props;

        if( !resultMatrix ) return null;

        const questions = [];
        const Question = ( data, index ) =>
        {
            return (
                <div key={index} className={`question question_${index}`}>
                    <div className='questionTxt'><span>&bull;</span> {data.questionText}</div>
                    <div className='answered'>(You answered "{data.isAnswered.toUpperCase()}")</div>
                </div>
            )
        };

        for( let i = 0; i < 3; i++ )
        {
            if( !resultMatrix[i] ) continue;
            questions.push( new Question( resultMatrix[i], i ))
        }

        return (
            <div className='topThreeQuestionsContainer'>
                { questions }
            </div>
        )
    }

    getDate( date )
    {
        return !date || date === 'n/a' ? 'n/a' : moment(date).format('ll');
    }

    getTitle( secondaryContent )
    {
        const publisher = secondaryContent[strings.ASSESSMENT_INFO_IDS.PUBLISHER] && secondaryContent[strings.ASSESSMENT_INFO_IDS.PUBLISHER] !== 'n/a' ? `${secondaryContent[strings.ASSESSMENT_INFO_IDS.PUBLISHER]} - ` : '';
        const title = secondaryContent[strings.ASSESSMENT_INFO_IDS.TITLE] && secondaryContent[strings.ASSESSMENT_INFO_IDS.TITLE] !== 'n/a' ? secondaryContent[strings.ASSESSMENT_INFO_IDS.TITLE] : '';
        return `${publisher} ${title} exhibits a:`;
    }

    render()
    {
        if( !this.props.downloadPDF ) return null;

        const { resultText, fairUse, infringement, assessmentInfo } = this.props;

        const primaryContent = assessmentInfo[strings.ASSESSMENT_INFO_IDS.PRIMARY_CONTENT];
        const secondaryContent = assessmentInfo[strings.ASSESSMENT_INFO_IDS.SECONDARY_CONTENT];

        const date = moment().format('ll');
        const resultTextIndicator = resultText ? <span><span className={resultText.color}>{resultText.txt}</span> indication of fair use.</span> : 'indication of fair use.';

        const preparedFor = `Prepared for ${assessmentInfo[strings.ASSESSMENT_INFO_IDS.FIRST_NAME]} ${assessmentInfo[strings.ASSESSMENT_INFO_IDS.LAST_NAME]}`;
        const orgName = `ORGANIZATION NAME: ${assessmentInfo[strings.ASSESSMENT_INFO_IDS.ORG_NAME]}`;

        const primaryDate = this.getDate( primaryContent[strings.ASSESSMENT_INFO_IDS.PUBLISH_DATE] );
        const secondaryDate = this.getDate( secondaryContent[strings.ASSESSMENT_INFO_IDS.PUBLISH_DATE] );

        const determinedTxt = `Dancing Baby’s copyright fair use algorithm has determined that the secondary content, “${secondaryContent[strings.ASSESSMENT_INFO_IDS.PUBLISHER]} - ${secondaryContent[strings.ASSESSMENT_INFO_IDS.TITLE]}” shows a ${resultText.txt} indication of fair use. There were several factors that led us to this conclusion. Among them were your answers to the questions`;

        return (
            <div id='printPDFComponent' className="printPDFComponent">

                <div id='page_1' className='page'>

                    <div className='date'>DATE: {date}</div>
                    <div className='preparedFor'>{ preparedFor }</div>
                    <div className='orgName'>{ orgName }</div>

                    <div className='logoContainer'>
                        <img src={dbLogo} className='logo' alt='logo' />
                    </div>

                    <div className='algorithmTxt'>Dancing Baby™ Copyright Fair Use Algorithm</div>

                    <div className='profilesContainer' >
                        <div className='profilesTitle' >CONTENT PROFILES:</div>
                        <div className='profiles panel'>
                            <div className='primaryContent'>
                                <div className='contentTitle'>Primary Content:</div>
                                <div className='title'><span>Title:</span> {primaryContent[strings.ASSESSMENT_INFO_IDS.TITLE] || 'n/a' }</div>
                                <div className='fileType'><span>File Type:</span> {primaryContent[strings.ASSESSMENT_INFO_IDS.FILETYPE] || 'n/a' }</div>
                                <div className='url'><span>URL:</span> {primaryContent[strings.ASSESSMENT_INFO_IDS.URL] || 'n/a' }</div>
                                <div className='contentDate'><span>Publish Date:</span> {primaryDate}</div>
                                <div className='author'><span>Author:</span> {primaryContent[strings.ASSESSMENT_INFO_IDS.PUBLISHER] || 'n/a' }</div>
                                <div className='count'><span>View Count:</span> {Utils.formatNumber( primaryContent[strings.ASSESSMENT_INFO_IDS.VIEW_COUNT] ) || 'n/a' }</div>
                            </div>
                            <div className='secondaryContent'>
                                <div className='contentTitle'>Secondary Content:</div>
                                <div className='title'><span>Title:</span> {secondaryContent[strings.ASSESSMENT_INFO_IDS.TITLE] || 'n/a' }</div>
                                <div className='fileType'><span>File Type:</span> {secondaryContent[strings.ASSESSMENT_INFO_IDS.FILETYPE] || 'n/a' }</div>
                                <div className='url'><span>URL:</span> {secondaryContent[strings.ASSESSMENT_INFO_IDS.URL] || 'n/a' }</div>
                                <div className='contentDate'><span>Publish Date:</span> {secondaryDate}</div>
                                <div className='author'><span>Author:</span> {secondaryContent[strings.ASSESSMENT_INFO_IDS.PUBLISHER] || 'n/a' }</div>
                                <div className='count'><span>View Count:</span> {Utils.formatNumber( secondaryContent[strings.ASSESSMENT_INFO_IDS.VIEW_COUNT] ) || 'n/a' }</div>
                            </div>
                        </div>
                    </div>

                    <div className='analysisContainer' >
                        <div className='analysisTitle' >ANALYSIS:</div>
                        <div className='analysis panel'>
                            <div className='subTitleContainer'>Your input has been analyzed using the Dancing Baby™ Algorithm.</div>
                            <div className='resultTitle' >{ this.getTitle(secondaryContent) }</div>
                            <div className='resultGage' >
                                <div className='resultGageImage' />
                                <div className='resultGageArrow' />
                            </div>
                            <div className='textIndicator'>{ resultTextIndicator }</div>
                            <div className='factorsContainer'>
                                <div className='factorsAgainst'>
                                    <span>Number of factors</span> AGAINST FAIR USE: { infringement || 'n/a' }
                                </div>
                                <div className='factorsTowards'>
                                    <span>Number of factors pointing towards</span> FAIR USE: { fairUse || 'n/a' }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id='page_2' className='page'>

                    <div className='date'>DATE: {date}</div>
                    <div className='preparedFor'>{ preparedFor }</div>
                    <div className='orgName'>{ orgName }</div>

                    <div className='analysisContinuedContainer' >
                        <div className='analysisTitle' >ANALYSIS CONTINUED:</div>
                        <div className='babyFaceContainer' >
                            <div className='babyFace'/>
                        </div>
                        <div className='analysisPage2 panel'>
                            <div className='determinedTxt'>{ determinedTxt }</div>
                            { this.getResultsQuestions() }

                            <div className='toAssistTxt'>To assist your review we include statutory references below.</div>
                        </div>

                        <div className='codes'>17 U.S. Code § 107. Limitations on exclusive rights: Fair use</div>
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

                        <div className='codes'>17 U.S. Code § 512 (c) (3) (A) (v) </div>
                        <div className='references2 panel'>
                            <p>
                                A takedown notice under the DMCA must include "a statement that the complaining party has a good faith belief
                                that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.”
                            </p>
                        </div>
                    </div>

                    <div className='infoGroup' >
                        <div className='companyName companyInfo'>Alsometric</div>
                        <div className='companyEmail companyInfo'>info@alsometric.com</div>
                        <div className='companyPhone companyInfo'>888-888-8888</div>
                        <div className='companyURL companyInfo'>alsometric.com</div>
                    </div>

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