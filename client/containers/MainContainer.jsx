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

import actions from '../actions/actions';
import userActions from '../actions/userActions';
import * as strings from '../constants/strings';


const mapStateToProps = store =>
({
    currentScreen:store.screens.currentScreen
});


const mapDispatchToProps = dispatch =>
({
    submitLogin: ( loginData ) =>
    {
        dispatch(userActions.userLoginRoute( loginData ));
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
                return <LoginComponent onSubmit={this.props.submitLogin} openContact={this.openContact}/>;

            case strings.SCREEN_DISCLAIMER:
                return <DisclaimerComponent/>;

            case strings.SCREEN_ASSESSMENT_GETINFO:
                return <DisclaimerComponent/>;

            case strings.SCREEN_ASSESSMENT_QUESTIONS:
                return <DisclaimerComponent/>;

            case strings.SCREEN_ASSESSMENT_RESULTS:
                return <DisclaimerComponent/>;

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
