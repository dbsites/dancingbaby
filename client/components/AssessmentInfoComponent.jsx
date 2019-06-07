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
import dbLogo from '../assets/svg/db_logo_text.svg';


class ContentBox extends React.Component
{
    constructor( props )
    {
        super( props );
    }

    render()
    {
        const { id, title } = this.props;

        return (
            <div>
                <div>{title}</div>
                <div className='urlField'>
                    <label htmlFor={`url_${id}`}>URL</label>
                    <Field
                        className='inputField'
                        name={`url_${id}`}
                        component='input'
                        type='text'
                        placeholder="Enter Video Link"
                    />
                </div>

                <div>OR</div>

                <div className='contentTitleField'>
                    <label htmlFor={`contentTitle_${id}`}>Content Title</label>
                    <Field
                        className='inputField'
                        name={`contentTitle_${id}`}
                        component='input'
                        type='text'
                        placeholder="Content Title"
                    />
                </div>

                <div className='fileTypeField'>
                    <label htmlFor={`fileType_${id}`}>File Type</label>
                    <Field
                        name={`fileType_${id}`}
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
                    <label htmlFor='firstName'>FIRST NAME</label>
                    <Field
                        className='inputField'
                        name='firstName'
                        component='input'
                        type='text'
                        placeholder="FIRST NAME"
                    />
                </div>

                <div className='fieldMiddle'>
                    <label htmlFor='lastName'>LAST NAME</label>
                    <Field
                        className='inputField'
                        name='lastName'
                        component='input'
                        type='text'
                        placeholder="LAST NAME"
                    />
                </div>

                <div className='fieldRight'>
                    <label htmlFor='orgName'>ORGANIZATION NAME</label>
                    <Field
                        className='inputField'
                        name='orgName'
                        component='input'
                        type='text'
                        placeholder="ORGANIZATION NAME"
                    />
                </div>

                <div>
                    <ContentBox id='copyrighted' title='COPYRIGHTED CONTENT' />
                    <ContentBox id='suspected' title='SUSPECTED CONTENT' />
                </div>

                <button type='submit'>START ANALYSIS</button>

            </form>
        </div>
    );
};


AssessmentInfoComponent = reduxForm({ form: 'login' })( AssessmentInfoComponent );

export default AssessmentInfoComponent;