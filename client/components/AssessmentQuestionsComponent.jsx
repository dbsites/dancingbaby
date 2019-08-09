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
import ContentHubComponent from './ContentHubComponent';
import dbLogo from '../assets/svg/db_logo_greenyellow.svg';
import arrow from '../assets/svg/backBtn.svg';
import greenArrow from '../assets/svg/arrow.svg';
import { TweenLite } from 'gsap';


export default class AssessmentQuestionsComponent extends React.Component
{
    constructor( props )
    {
        super( props );

        this.hubState = this.props.isHubOpen;
    }

    componentDidUpdate()
    {
        this.openCloseHub();
    }

    openCloseHub()
    {
        if( this.hubState === this.props.isHubOpen ) return null;
        this.hubState = this.props.isHubOpen;

        const startWidth = this.props.isHubOpen ? 4 : 30;
        const endWidth = this.props.isHubOpen ? 30 : 4;
        const target = document.getElementById('assessmentQuestionsComponent');

        const targetObj = {};
        targetObj.target = target;
        targetObj.count = startWidth;

        const updateFired = () =>
        {
            target.style.gridTemplateColumns = `${targetObj.count}vw 1fr`
        };

        TweenLite.to( targetObj, .5, { count:endWidth, onUpdate:updateFired } );
    }

    getQuestions()
    {
        // const buttonCls = 'enterBtn';
        const buttonCls = this.props.progress < 1 ? 'enterBtn disabled' : 'enterBtn';
        const questionsList = [];

        this.props.questions.forEach(( item, index ) =>
        {
            questionsList.push( <Question
                key={index}
                index={index}
                isAnswered={item.isAnswered}
                isSubQuestion={item.isSubQuestion}
                currentQuestionIndex={this.props.currentQuestionIndex}
                parentIndex={item.parentIndex}
                number={item.questionNumber}
                questionTxt={item.questionText}
                answerSelected={this.props.updateAssessment}
            />);
        });

        questionsList.push( <div key={questionsList.length} className='enterBtnContainer'>
            <button className={buttonCls} onClick={this.props.submitAssessmentQuestions}>
                <span>SUBMIT</span>
                <img src={greenArrow} className='greenArrow' alt='arrow' />
            </button>
        </div> );

        return questionsList;
    }

    render()
    {
        const classNames = `contentHub ${ this.props.isHubOpen ? 'hubOpen' : 'hubClosed' }`;
        const parentClassNames = `assessmentQuestionsComponent parentHubOpen`; // ${this.props.isHubOpen ? 'parentHubOpen' : 'parentHubClosed'}`;

        return (
            <div id='assessmentQuestionsComponent' className={parentClassNames}>

                <div className='logoUpperRighContainer'>
                    <img src={dbLogo} className='logoSmallUpperRight' alt='logo'/>
                </div>

                <button className='backBtn' onClick={this.props.startOver}>
                    <span>BACK</span>
                    <img src={arrow} className='arrow' alt='arrow' />
                </button>

                <div className={ classNames } >
                    <ContentHubComponent
                        openCloseContentHub={ this.props.openCloseContentHub }
                        isHubOpen={ this.props.isHubOpen }
                        assessmentInfo={ this.props.assessmentInfo }
                    />
                </div>

                <div className='titleContainer'>ASSESSMENT</div>

                <ProgressBar currentProgress={this.props.progress}/>

                <div className='questionsBox'>
                    { this.getQuestions() }
                </div>

            </div>
        );
    }
};


const Question = ( props ) =>
{
    const { index, questionTxt, answerSelected, number, isSubQuestion, currentQuestionIndex, isAnswered, parentIndex } = props;
    const classNames = `questionBox ${ isSubQuestion ? 'subQuestionGrid' : 'questionGrid' } ${ currentQuestionIndex < index ? 'questionDisabled' : '' }`;
    const questionData = { number, parentIndex, index };

    return (
        <div className={classNames}>
            <div className='questionNum'>{`${number}.`}</div>
            <div className='questionTxt'>{questionTxt}</div>
            <div className='questionBtns'>
                <div onClick={ () => answerSelected({ response:'no', questionData })} className={`questionBtn ${isAnswered === 'no' ? 'selected' : ''}`}>no</div>
                <div onClick={ () => answerSelected({ response:'unsure', questionData })} className={`questionBtn ${isAnswered === 'unsure' ? 'selected' : ''}`}>unsure</div>
                <div onClick={ () => answerSelected({ response:'yes', questionData })} className={`questionBtn ${isAnswered === 'yes' ? 'selected' : ''}`}>yes</div>
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
            <div className='progressBarHolder'>
                <div style={progressWidth} className='progressBar'/>
                <div className='progressTxt' >{progressTxt}</div>
            </div>
        </div>
    )
};