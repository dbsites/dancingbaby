/**
 * ************************************
 *
 * @module  MainContainer
 * @author
 * @date
 * @description stateful component that renders TotalsDisplay and MarketsContainer
 *
 * ************************************
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';

import LoginComponent from '../components/LoginComponent';
import DisclaimerComponent from '../components/DisclaimerComponent';
import AssessmentInfoComponent from '../components/AssessmentInfoComponent';
import AssessmentQuestionsComponent from '../components/AssessmentQuestionsComponent';
import ResultsComponent from '../components/ResultsComponent';

import userActions from '../actions/userActions';
import * as assessmentActions from '../actions/assessmentActions';
import * as screenActions from '../actions/screenActions';
import * as strings from '../constants/strings';


const mapStateToProps = store =>
({
    currentScreen:store.screens.currentScreen,

    // questions component
    isHubOpen: store.assessment.isHubOpen,
    questions: store.assessment.questions,
    questionsUpdated: store.assessment.questionsUpdated,
    currentQuestionIndex: store.assessment.currentQuestionIndex,
    progress: store.assessment.progress,

    // results component
    resultInfringement: store.assessment.resultInfringement,
    resultText: store.assessment.resultText,

    fairUse: store.assessment.fairUse,
    infringement: store.assessment.infringement,

    titleCopyright: store.assessment[strings.ASSESSMENT_INFO_IDS.TITLE_COPYRIGHTED],
    titleSuspect: store.assessment[strings.ASSESSMENT_INFO_IDS.TITLE_SUSPECTED],

    assessmentInfo: store.assessment.assessmentInfo
});


const mapDispatchToProps = dispatch =>
({
    submitLogin: ( loginData ) =>
    {
        dispatch(userActions.userLoginRoute( loginData ));
    },

    submitAssessmentInfo: ( data ) =>
    {
        dispatch(assessmentActions.setAssessmentInfo( data ));
    },

    updateAssessment: ( question ) =>
    {
        dispatch( assessmentActions.updateAssessment( question ))
    },

    openCloseContentHub: ( question ) =>
    {
        dispatch( assessmentActions.openCloseContentHub( question ))
    },

    submitAssessmentQuestions: ( data ) =>
    {
        dispatch(assessmentActions.submitAssessmentQuestions( data ));
    },

    downloadReport: () =>
    {
        dispatch(assessmentActions.downloadReport());
    },

    startOver: () =>
    {
        dispatch(assessmentActions.startOver());
    },

    nextScreen: () =>
    {
        dispatch(screenActions.nextScreen());
    }
});


class MainContainer extends Component
{

    openContact = ( e ) =>
    {
        console.log( "OPEN CONTACT CLICKED" );
    };

    getCurrentScreen = () =>
    {
        switch( this.props.currentScreen )
        {
            case strings.SCREEN_LOGIN:
                return <LoginComponent
                    onSubmit={ this.props.submitLogin }
                    openContact={ this.openContact }
                />;

            case strings.SCREEN_DISCLAIMER:
                return <DisclaimerComponent
                    nextScreen={ this.props.nextScreen }
                />;

            case strings.SCREEN_ASSESSMENT_GETINFO:
                return <AssessmentInfoComponent
                    onSubmit={ this.props.submitAssessmentInfo }
                />;

            case strings.SCREEN_ASSESSMENT_QUESTIONS:
                return <AssessmentQuestionsComponent

                    questions={ this.props.questions }
                    isHubOpen={ this.props.isHubOpen }
                    progress={ this.props.progress }
                    questionsUpdate={ this.props.questionsUpdated }
                    currentQuestionIndex={ this.props.currentQuestionIndex }
                    assessmentInfo={ this.props.assessmentInfo }

                    openCloseContentHub={ this.props.openCloseContentHub }
                    submitAssessmentQuestions={ this.props.submitAssessmentQuestions }
                    updateAssessment={ this.props.updateAssessment }
                />;

            case strings.SCREEN_ASSESSMENT_RESULTS:
                return <ResultsComponent

                    resultInfringement={ this.props.resultInfringement }
                    resultText={ this.props.resultText }

                    titleCopyright={ this.props.titleCopyright }
                    titleSuspect={ this.props.titleSuspect }

                    fairUse={ this.props.fairUse }
                    infringement={ this.props.infringement }

                    downloadReport={ this.props.downloadReport }
                    startOver={ this.props.startOver }
                />;

        }
    };

    render()
    {
        return(
          <div className="container">
            <div className="outerBox">
                { this.getCurrentScreen() }
            </div>
          </div>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
