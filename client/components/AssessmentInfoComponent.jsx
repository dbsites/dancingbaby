/**
 * ************************************
 *
 * @module  AssessmentInfoComponent
 * @author  katzman
 * @date    05/22/2019
 * @description
 *
 * ************************************
 */


import React from 'react';
import { change, untouch, Field, reduxForm } from 'redux-form';
import * as strings from '../constants/strings';
import dbLogo from '../assets/svg/db_logo_text.svg';
import arrow from '../assets/svg/arrow.svg';
import Utils from '../js/Utils';


const youTube = 'youtube';
const nonYouTube = 'nonYoutube';

const copyrightedContent = 'copyright';
const suspectedContent = 'suspected';


class ContentBox extends React.Component
{
    constructor( props )
    {
        super( props );

        this.state = {
            activeInput:youTube
        }
    }

    inputOnFocus = ( e ) =>
    {

        const { url_id, title_id, fileType_id, title } = this.props;

        const name = e.currentTarget.name.toLowerCase();
        const contentType = name.indexOf(copyrightedContent) > -1 ? copyrightedContent : suspectedContent;

        const containerElement = document.querySelector( `.${contentType}` );
        const urlElement = containerElement.querySelector( '.urlInputField' );
        const titleElement = containerElement.querySelector( '.titleInputField' );
        const selectorElement = containerElement.querySelector( '.fileTypeSelectField' );

        if( name.indexOf('url') > -1 )
        {
            Utils.addClass( titleElement, 'inputDisabled' );
            Utils.addClass( selectorElement, 'inputDisabled' );
            Utils.removeClass( urlElement, 'inputDisabled' );

            this.props.resetFields( 'assessmentForm', {
                [title_id]: '',
                [fileType_id]: '',
            });
        }
        else
        {
            Utils.removeClass( titleElement, 'inputDisabled' );
            Utils.removeClass( selectorElement, 'inputDisabled' );
            Utils.addClass( urlElement, 'inputDisabled' );

            this.props.resetFields( 'assessmentForm', {
                [url_id]: '',
            });
        }
    };


    render()
    {
        const { url_id, title_id, fileType_id, title, contentType } = this.props;

        return (
            <div className='contentBox'>
                <div className='title'>{title}</div>
                <div className={`inputFields ${contentType}`}>
                    <div className='urlField'>
                        <label htmlFor={url_id}>URL:</label>
                        <Field
                            className={`urlInputField`}
                            onFocus={this.inputOnFocus}
                            name={url_id}
                            component='input'
                            type='text'
                            placeholder="Video URL"
                        />
                    </div>

                    <div className='or'>OR</div>

                    <div className='contentTitleField'>
                        <label htmlFor={title_id}>Content Title:</label>
                        <Field
                            className={`titleInputField inputDisabled`}
                            onFocus={this.inputOnFocus}
                            name={title_id}
                            component='input'
                            type='text'
                            placeholder="Title"
                        />
                    </div>

                    <div className='fileTypeField'>
                        <label htmlFor={fileType_id}>File Type:</label>
                        <Field
                            className={`fileTypeSelectField inputDisabled`}
                            onFocus={this.inputOnFocus}
                            name={fileType_id}
                            component="select">
                            <option value=''>Select File Type</option>
                            <option value="typeVideo">Video File</option>
                            <option value="typeAudio">Audio File</option>
                            <option value="typeImage">Image File</option>
                            <option value="typeText">Text File</option>
                        </Field>
                    </div>
                </div>
            </div>
        )
    }
}


let AssessmentInfoComponent = ( props ) =>
{
    const { handleSubmit, onSubmit, assessmentInfo } = props;

    const resetFields = ( formName, fieldsObj ) =>
    {
        Object.keys(fieldsObj).forEach(fieldKey =>
        {
            //reset the field's value
            props.dispatch( change( formName, fieldKey, fieldsObj[fieldKey] ));
        });
    };

    const showCurrentInfo = () =>
    {
        if( assessmentInfo[strings.ASSESSMENT_INFO_IDS.FIRST_NAME] )
        {
            const suspectedContent = assessmentInfo[strings.ASSESSMENT_INFO_IDS.SUSPECTED_CONTENT];
            const copyrightedContent = assessmentInfo[strings.ASSESSMENT_INFO_IDS.COPYRIGHTED_CONTENT];

            resetFields( 'assessmentForm', {
                [strings.ASSESSMENT_INFO_IDS.FIRST_NAME]: assessmentInfo[strings.ASSESSMENT_INFO_IDS.FIRST_NAME],
                [strings.ASSESSMENT_INFO_IDS.LAST_NAME]: assessmentInfo[strings.ASSESSMENT_INFO_IDS.LAST_NAME],
                [strings.ASSESSMENT_INFO_IDS.ORG_NAME]: assessmentInfo[strings.ASSESSMENT_INFO_IDS.ORG_NAME],
                [strings.ASSESSMENT_INFO_IDS.URL_COPYRIGHT]: copyrightedContent[strings.ASSESSMENT_INFO_IDS.VIDEO_URL],
                [strings.ASSESSMENT_INFO_IDS.TITLE_COPYRIGHT]: copyrightedContent[strings.ASSESSMENT_INFO_IDS.VIDEO_TITLE],
                [strings.ASSESSMENT_INFO_IDS.FILETYPE_COPYRIGHT]: copyrightedContent[strings.ASSESSMENT_INFO_IDS.FILETYPE],
                [strings.ASSESSMENT_INFO_IDS.URL_SUSPECTED]: suspectedContent[strings.ASSESSMENT_INFO_IDS.VIDEO_URL],
                [strings.ASSESSMENT_INFO_IDS.TITLE_SUSPECTED]: suspectedContent[strings.ASSESSMENT_INFO_IDS.VIDEO_TITLE],
                [strings.ASSESSMENT_INFO_IDS.FILETYPE_SUSPECTED]: suspectedContent[strings.ASSESSMENT_INFO_IDS.FILETYPE],
            });
        }
    };

    showCurrentInfo();

    return (
        <div className='assessmentInfoComponent'>

            <div className='logoContainer'>
                <img src={dbLogo} className='logo' alt='logo' />
            </div>

            <div className='subHead'>Copyright Fair Use Algorithm</div>

            <form className='assessmentForm' onSubmit={handleSubmit( onSubmit )}>

                <div className='firstName'>
                    <label htmlFor={strings.ASSESSMENT_INFO_IDS.FIRST_NAME}>FIRST NAME</label>
                    <Field
                        className='inputField'
                        name={strings.ASSESSMENT_INFO_IDS.FIRST_NAME}
                        component='input'
                        type='text'
                        placeholder=""
                    />
                </div>

                <div className='lastName'>
                    <label htmlFor={strings.ASSESSMENT_INFO_IDS.LAST_NAME}>LAST NAME</label>
                    <Field
                        className='inputField'
                        name={strings.ASSESSMENT_INFO_IDS.LAST_NAME}
                        component='input'
                        type='text'
                        placeholder=""
                    />
                </div>

                <div className='orgName'>
                    <label htmlFor={strings.ASSESSMENT_INFO_IDS.ORG_NAME}>ORGANIZATION NAME</label>
                    <Field
                        className='inputField'
                        name={strings.ASSESSMENT_INFO_IDS.ORG_NAME}
                        component='input'
                        type='text'
                        placeholder=""
                    />
                </div>

                <div className='contentBoxes'>
                    <ContentBox
                        resetFields={resetFields}
                        contentType={copyrightedContent}
                        url_id={strings.ASSESSMENT_INFO_IDS.URL_COPYRIGHT}
                        title_id={strings.ASSESSMENT_INFO_IDS.TITLE_COPYRIGHT}
                        fileType_id={strings.ASSESSMENT_INFO_IDS.FILETYPE_COPYRIGHT}
                        title='PRIMARY CONTENT'
                    />
                    <ContentBox
                        resetFields={resetFields}
                        contentType={suspectedContent}
                        url_id={strings.ASSESSMENT_INFO_IDS.URL_SUSPECTED}
                        title_id={strings.ASSESSMENT_INFO_IDS.TITLE_SUSPECTED}
                        fileType_id={strings.ASSESSMENT_INFO_IDS.FILETYPE_SUSPECTED}
                        title='SECONDARY CONTENT' />
                </div>

                <button type='submit'>
                    <span>START ANALYSIS</span>
                    <img src={arrow} className='arrow' alt='arrow' />
                </button>

            </form>
        </div>
    );
};


AssessmentInfoComponent = reduxForm({ form: 'assessmentForm' })( AssessmentInfoComponent );

export default AssessmentInfoComponent;