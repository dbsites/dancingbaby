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


import React from 'react';
import dbLogo from '../assets/svg/db_logo_greenyellow.svg';


const AssessmentQuestionsComponent = ( props ) =>
{

    const { questions, submitAssessmentQuestions } = props;
    const buttonCls = props.progress < 1 ? 'enterBtn disabled' : 'enterBtn';
    const questionsList = [];

    questions.forEach(( item, index ) =>
    {
       questionsList.push( <Question
           key={index}
           index={index}
           isAnswered={item.isAnswered}
           isSubQuestion={item.isSubQuestion}
           currentQuestionIndex={props.currentQuestionIndex}
           number={item.questionNumber}
           questionTxt={item.questionText}
           answerSelected={props.updateAssessment}
       />);
    });

    questionsList.push( <div key={questionsList.length} className='enterBtnContainer'><button className={buttonCls} onClick={submitAssessmentQuestions}>SUBMIT</button></div> );

    return (
        <div className="assessmentQuestionsComponent">

            <div className='logoUpperRighContainer'>
                <img src={dbLogo} className='logoSmallUpperRight' alt='logo' />
            </div>

            <div className='titleContainer'>ASSESSMENT</div>

            <ProgressBar currentProgress={props.progress}/>

            <div className='questionsBox'>
                { questionsList }
            </div>

        </div>
    );
};

const Question = ( props ) =>
{
    const { index, questionTxt, answerSelected, number, isSubQuestion, isAnswered } = props;

    const classNames = `questionBox ${ isSubQuestion ? 'subQuestionGrid' : 'questionGrid' } ${ isAnswered ? 'questionDone' : '' }}`;

    return (
        <div className={classNames}>
            <div className='questionNum'>{`${number}.`}</div>
            <div className='questionTxt'>{questionTxt}</div>
            <div className='questionBtns'>
                <div onClick={ () => answerSelected({ response:'no', index })} className={`questionBtn ${isAnswered === 'no' ? 'selected' : ''}`}>no</div>
                <div onClick={ () => answerSelected({ response:'unsure', index })} className={`questionBtn ${isAnswered === 'unsure' ? 'selected' : ''}`}>unsure</div>
                <div onClick={ () => answerSelected({ response:'yes', index })} className={`questionBtn ${isAnswered === 'yes' ? 'selected' : ''}`}>yes</div>
            </div>
        </div>
    )
};

const ProgressBar = ( props ) =>
{
    const { currentProgress } = props;
    const progressValue = Math.round(100*currentProgress);
    const progressTxt = `PROGRESS ${progressValue}%`;
    const progressWidth = { width:`${progressValue}%`};

    return (
        <div className='progressContainer'>
            <div style={progressWidth} className='progressBar'/>
            <div className='progressTxt' >{progressTxt}</div>
        </div>
    )
};


export default AssessmentQuestionsComponent;