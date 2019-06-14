/**
 * ************************************
 *
 * @module  AssessmentQuestionsComponent
 * @author  katzman
 * @date    06/07/2019
 * @description
 *
 * ************************************
 */


import React, {Component} from 'react';
import dbLogo from '../assets/svg/db_logo_greenyellow.svg';


const AssessmentQuestionsComponent = ( props ) =>
{

    const { questions, submitAssessmentQuestions } = props;

    const buttonCls = true ? '' : 'disabled';

    const answerSelected = ( value, index ) =>
    {
        console.log( "ANSWER SELECTED: ", value, index );
    };

    const questionsList = [];
    questions.forEach(( item, index ) =>
    {
       questionsList.push( <Question key={index} index={index+1} questionTxt={item.questionText} answerSelected={answerSelected} />);
    });


    questions.push( <div className={buttonCls} onClick={submitAssessmentQuestions}>SUBMIT</div> );

    return (
        <div className="assessmentQuestionsComponent">

            <div className='logoUpperRighContainer'>
                <img src={dbLogo} className='logoSmallUpperRight' alt='logo' />
            </div>

            <div className='titleContainer'>ASSESSMENT</div>

            <ProgressBar currentProgress={.5}/>

            <div className='questionsBox'>
                { questionsList }
            </div>

        </div>
    );
};

const Question = ( props ) =>
{
    const { index, questionTxt, answerSelected } = props;

    return (
        <div className='questionBox'>
            <div className='questionNum'>{`${index}.`}</div>
            <div className='questionTxt'>{questionTxt}</div>
            <div className='questionBtns'>
                <div onClick={ () => answerSelected( 'no', index )} className='questionBtn'>no</div>
                <div onClick={ () => answerSelected( 'unsure', index )} className='questionBtn'>unsure</div>
                <div onClick={ () => answerSelected( 'yes', index )} className='questionBtn'>yes</div>
            </div>
        </div>
    )
};

const ProgressBar = ( props ) =>
{
    const { currentProgress } = props;

    const progressTxt = `PROGRESS ${100*currentProgress}%`;

    return (
        <div className='progressContainer'>
            <div className='progressBar'/>
            <div className='progressTxt'>{progressTxt}</div>
        </div>
    )
};


export default AssessmentQuestionsComponent;