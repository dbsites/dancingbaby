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
import MobileComponent from '../components/MobileComponent';
import ModalComponent from '../components/ModalComponent';
import DisclaimerComponent from '../components/DisclaimerComponent';
import AssessmentInfoComponent from '../components/AssessmentInfoComponent';
import LoadingComponent from '../components/LoadingComponent';
import MessageBarComponent from '../components/MessageBarComponent';
import AssessmentQuestionsComponent from '../components/AssessmentQuestionsComponent';
import ResultsComponent from '../components/ResultsComponent';

import userActions from '../actions/userActions';
import * as assessmentActions from '../actions/assessmentActions';
import * as screenActions from '../actions/screenActions';
import * as strings from '../constants/strings';
import Utils from "../js/Utils";


const contactPath = 'http://www.google.com';

const mapStateToProps = store =>
({
    currentScreen:store.screens.currentScreen,
    showModal:store.screens.showModal,
    showLoading:store.screens.showLoading,
    loadingMessage:store.screens.loadingMessage,
    barMessage:store.screens.barMessage,
    barUpdateStamp:store.screens.barUpdateStamp,

    // questions component
    isHubOpen: store.assessment.isHubOpen,
    questions: store.assessment.questions,
    currentQuestions: store.assessment.currentQuestions,
    questionsUpdated: store.assessment.questionsUpdated,
    currentQuestionIndex: store.assessment.currentQuestionIndex,
    progress: store.assessment.progress,

    // results component
    resultInfringement: store.assessment.resultInfringement,
    resultText: store.assessment.resultText,
    resultMatrix: store.assessment.resultMatrix,

    fairUse: store.assessment.fairUse,
    infringement: store.assessment.infringement,

    assessmentInfo: store.assessment.assessmentInfo,

    assessmentForm: store.form.assessmentForm
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

    submitCompletedAssessment: ( data ) =>
    {
        dispatch(assessmentActions.submitCompletedAssessment( data ));
    },

    showHideModal: ( modal ) =>
    {
        dispatch(screenActions.showModal( modal ));
    },

    downloadReport: () =>
    {
        dispatch(assessmentActions.downloadReport());
    },

    startOver: () =>
    {
        dispatch(screenActions.startOver());
    },

    hideLoading: () =>
    {
        dispatch(screenActions.hideLoading());
    },

    hideBar: () =>
    {
        dispatch(screenActions.hideBar());
    },

    nextScreen: () =>
    {
        dispatch(screenActions.nextScreen());
    }
});


class MainContainer extends Component
{

    constructor( props )
    {
        super( props );

        this.state = {
            isMobile:false
        }
    }

    componentDidMount()
    {
        this.handleWindowSizeChange();
    }

    componentWillMount()
    {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentWillUnmount()
    {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () =>
    {
        const isMobile = Utils.isMobile();

        if( isMobile !== this.state.isMobile )
        {
            this.setState({ isMobile });
        }
    };

    getCurrentScreen = () =>
    {

        switch( this.props.currentScreen )
        {
            case strings.SCREEN_LOGIN.screen:
                return <LoginComponent
                    contactPath={ contactPath }
                    onSubmit={ this.props.submitLogin }
                />;

            case strings.SCREEN_DISCLAIMER.screen:
                return <DisclaimerComponent
                    nextScreen={ this.props.nextScreen }
                    showHideModal={ this.props.showHideModal }
                />;

            case strings.SCREEN_ASSESSMENT_GETINFO.screen:
                return <AssessmentInfoComponent
                    assessmentInfo={ this.props.assessmentInfo }
                    assessmentForm={ this.props.assessmentForm }
                    onSubmit={ this.props.submitAssessmentInfo }
                />;

            case strings.SCREEN_ASSESSMENT_QUESTIONS.screen:
                return <AssessmentQuestionsComponent

                    questions={ this.props.currentQuestions }
                    isHubOpen={ this.props.isHubOpen }
                    progress={ this.props.progress }
                    questionsUpdate={ this.props.questionsUpdated }
                    currentQuestionIndex={ this.props.currentQuestionIndex }
                    assessmentInfo={ this.props.assessmentInfo }

                    openCloseContentHub={ this.props.openCloseContentHub }
                    submitAssessmentQuestions={ this.props.submitAssessmentQuestions }
                    updateAssessment={ this.props.updateAssessment }
                    startOver={ this.props.startOver }
                />;

            case strings.SCREEN_ASSESSMENT_RESULTS.screen:
                return <ResultsComponent

                    resultInfringement={ this.props.resultInfringement }
                    resultText={ this.props.resultText }
                    resultMatrix={ this.props.resultMatrix }
                    assessmentInfo={ this.props.assessmentInfo }

                    fairUse={ this.props.fairUse }
                    infringement={ this.props.infringement }

                    submitCompletedAssessment={ this.props.submitCompletedAssessment }
                    downloadReport={ this.props.downloadReport }
                    startOver={ this.props.startOver }
                />;

        }
    };

    render()
    {
        if( this.state.isMobile )
        {
            return <MobileComponent contactPath={ contactPath } />;
        }

        return(
          <div className="container">
            <div className="outerBox">
                <ModalComponent showHideModal={ this.props.showHideModal } modalData={ this.props.showModal } />
                <LoadingComponent showLoading={ this.props.showLoading } loadingMessage={ this.props.loadingMessage } />
                <MessageBarComponent barMessage={ this.props.barMessage } barUpdateStamp={ this.props.barUpdateStamp } />
                { this.getCurrentScreen() }
            </div>
          </div>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
