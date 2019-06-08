/**
 * ************************************
 *
 * @module  LoginComponent
 * @author  katzman
 * @date    05/22/2019
 * @description
 *
 * ************************************
 */


import React from 'react';
import { Field, reduxForm } from 'redux-form';
import * as strings from '../constants/strings';
import dbLogo from '../assets/svg/db_logo_text.svg';


class ContentBox extends React.Component
{
    constructor( props )
    {
        super( props );
    }

    render()
    {
        const { url_id, title_id, fileType_id, title } = this.props;

        return (
            <div>
                <div>{title}</div>
                <div className='urlField'>
                    <label htmlFor={url_id}>URL</label>
                    <Field
                        className='inputField'
                        name={url_id}
                        component='input'
                        type='text'
                        placeholder="Enter Video Link"
                    />
                </div>

                <div>OR</div>

                <div className='contentTitleField'>
                    <label htmlFor={title_id}>Content Title</label>
                    <Field
                        className='inputField'
                        name={title_id}
                        component='input'
                        type='text'
                        placeholder="Content Title"
                    />
                </div>

                <div className='fileTypeField'>
                    <label htmlFor={fileType_id}>File Type</label>
                    <Field
                        name={fileType_id}
                        component="select">
                        <option value="">Select File Type</option>
                        <option value="ff0000">Red</option>
                        <option value="00ff00">Green</option>
                        <option value="0000ff">Blue</option>
                    </Field>
                </div>
            </div>
        )
    }
}


let AssessmentInfoComponent = ( props ) =>
{
    const { handleSubmit, onSubmit } = props;

    return (
        <div >

            <div className='logoContainer'>
                <img src={dbLogo} className='logo' alt='logo' />
            </div>

            <div>Copyright Fair Use Algorithm</div>

            <form className='loginForm' onSubmit={handleSubmit( onSubmit )}>

                <div className='fieldieldLeft'>
                    <label htmlFor={strings.ASSESSMENT_INFO_IDS.FIRST_NAME}>FIRST NAME</label>
                    <Field
                        className='inputField'
                        name={strings.ASSESSMENT_INFO_IDS.FIRST_NAME}
                        component='input'
                        type='text'
                        placeholder="FIRST NAME"
                    />
                </div>

                <div className='fieldMiddle'>
                    <label htmlFor={strings.ASSESSMENT_INFO_IDS.LAST_NAME}>LAST NAME</label>
                    <Field
                        className='inputField'
                        name={strings.ASSESSMENT_INFO_IDS.LAST_NAME}
                        component='input'
                        type='text'
                        placeholder="LAST NAME"
                    />
                </div>

                <div className='fieldRight'>
                    <label htmlFor={strings.ASSESSMENT_INFO_IDS.ORG_NAME}>ORGANIZATION NAME</label>
                    <Field
                        className='inputField'
                        name={strings.ASSESSMENT_INFO_IDS.ORG_NAME}
                        component='input'
                        type='text'
                        placeholder="ORGANIZATION NAME"
                    />
                </div>

                <div>
                    <ContentBox
                        url_id={strings.ASSESSMENT_INFO_IDS.URL_COPYRIGHTED}
                        title_id={strings.ASSESSMENT_INFO_IDS.TITLE_COPYRIGHTED}
                        fileType_id={strings.ASSESSMENT_INFO_IDS.FILETYPE_COPYRIGHTED}
                        title='COPYRIGHTED CONTENT'
                    />
                    <ContentBox
                        url_id={strings.ASSESSMENT_INFO_IDS.URL_SUSPECTED}
                        title_id={strings.ASSESSMENT_INFO_IDS.TITLE_SUSPECTED}
                        fileType_id={strings.ASSESSMENT_INFO_IDS.FILETYPE_SUSPECTED}
                        title='SUSPECTED CONTENT' />
                </div>

                <button type='submit'>START ANALYSIS</button>

            </form>
        </div>
    );
};


AssessmentInfoComponent = reduxForm({ form: 'login' })( AssessmentInfoComponent );

export default AssessmentInfoComponent;