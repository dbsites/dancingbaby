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
import { change, Field, reduxForm } from 'redux-form';
import * as strings from '../constants/strings';
import dbLogo from '../assets/svg/db_logo_text.svg';
import arrow from '../assets/svg/arrow.svg';
import Utils from '../js/Utils';


const youTube = 'youtube';

const primaryContent = 'primary';
const secondaryContent = 'secondary';


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
        const { url_id, title_id, fileType_id } = this.props;

        const name = e.currentTarget.name.toLowerCase();
        const contentType = name.indexOf(primaryContent) > -1 ? primaryContent : secondaryContent;

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
                            id={url_id}
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
                            id={title_id}
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
                            id={fileType_id}
                            className={`fileTypeSelectField inputDisabled`}
                            onFocus={this.inputOnFocus}
                            name={fileType_id}
                            component="select">
                            <option value=''>Select File Type</option>
                            <option value="typeVideo">{strings.FILETYPE_OPTIONS.typeVideo}</option>
                            <option value="typeAudio">{strings.FILETYPE_OPTIONS.typeAudio}</option>
                            <option value="typeImage">{strings.FILETYPE_OPTIONS.typeImage}</option>
                            <option value="typeText">{strings.FILETYPE_OPTIONS.typeText}</option>
                        </Field>
                    </div>
                </div>
            </div>
        )
    }
}


const inputIds = [
    strings.ASSESSMENT_INFO_IDS.FIRST_NAME,
    strings.ASSESSMENT_INFO_IDS.LAST_NAME,
    strings.ASSESSMENT_INFO_IDS.ORG_NAME,

    strings.ASSESSMENT_INFO_IDS.URL_PRIMARY,
    strings.ASSESSMENT_INFO_IDS.TITLE_PRIMARY,
    strings.ASSESSMENT_INFO_IDS.FILETYPE_PRIMARY,

    strings.ASSESSMENT_INFO_IDS.URL_SECONDARY,
    strings.ASSESSMENT_INFO_IDS.TITLE_SECONDARY,
    strings.ASSESSMENT_INFO_IDS.FILETYPE_SECONDARY,
];


class AssessmentInfoComponent extends React.Component
{
    componentDidUpdate()
    {
        this.inputUpdated();
    }

    resetFields = ( formName, fieldsObj ) =>
    {
        Object.keys(fieldsObj).forEach(fieldKey =>
        {
            this.props.dispatch( change( formName, fieldKey, fieldsObj[fieldKey] ));
        });
    };

    inputUpdated = () =>
    {
        const btn = document.getElementById('startBtn');

        let inputValue = null;
        let inputCount = 0;

        const getValue = ( id ) =>
        {
            if( !this.props.assessmentForm.values ) return false;
            return this.props.assessmentForm.values[id];
        };

        inputIds.forEach(( id ) =>
        {

            inputValue = getValue( id );

            if( inputValue )
            {
                if( id === strings.ASSESSMENT_INFO_IDS.URL_PRIMARY || id === strings.ASSESSMENT_INFO_IDS.URL_SECONDARY )
                {
                    inputCount+=2;
                }
                else
                {
                    inputCount++;
                }
            }
        });

        if( inputCount >= 7 )
        {
            Utils.removeClass( btn, 'disabled');
        }
        else
        {
            Utils.addClass( btn, 'disabled');
        }
    };

    render()
    {
        const { handleSubmit, onSubmit } = this.props;

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
                            id={strings.ASSESSMENT_INFO_IDS.FIRST_NAME}
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
                            id={strings.ASSESSMENT_INFO_IDS.LAST_NAME}
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
                            id={strings.ASSESSMENT_INFO_IDS.ORG_NAME}
                            className='inputField'
                            name={strings.ASSESSMENT_INFO_IDS.ORG_NAME}
                            component='input'
                            type='text'
                            placeholder=""
                        />
                    </div>

                    <div className='contentBoxes'>
                        <ContentBox
                            resetFields={this.resetFields}
                            contentType={primaryContent}
                            url_id={strings.ASSESSMENT_INFO_IDS.URL_PRIMARY}
                            title_id={strings.ASSESSMENT_INFO_IDS.TITLE_PRIMARY}
                            fileType_id={strings.ASSESSMENT_INFO_IDS.FILETYPE_PRIMARY}
                            title='PRIMARY CONTENT'
                        />
                        <ContentBox
                            resetFields={this.resetFields}
                            contentType={secondaryContent}
                            url_id={strings.ASSESSMENT_INFO_IDS.URL_SECONDARY}
                            title_id={strings.ASSESSMENT_INFO_IDS.TITLE_SECONDARY}
                            fileType_id={strings.ASSESSMENT_INFO_IDS.FILETYPE_SECONDARY}
                            title='SECONDARY CONTENT'
                        />
                    </div>

                    <button className='disabled' id='startBtn' type='submit'>
                        <span>START ANALYSIS</span>
                        <img src={arrow} className='arrow' alt='arrow' />
                    </button>

                </form>
            </div>
        );
    }
}


AssessmentInfoComponent = reduxForm({ form: 'assessmentForm', keepDirtyOnReinitialize:true, enableReinitialize:true, destroyOnUnmount:false })( AssessmentInfoComponent );

export default AssessmentInfoComponent;