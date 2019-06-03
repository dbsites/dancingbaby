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

import LoginComponent from '../components/LoginComponent.jsx';
import actions from '../actions/actions';
import userActions from '../actions/userActions';


const mapStateToProps = store =>
({
    // totalCards:   store.cards.totalCards,
    // totalMarkets: store.cards.totalMarkets
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


    render()
    {
        return(
          <div className="container">
            <div className="outerBox">
                <LoginComponent onSubmit={this.props.submitLogin} openContact={this.openContact}/>
            </div>
          </div>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
