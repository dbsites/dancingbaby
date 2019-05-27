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


const mapStateToProps = store =>
({
    totalCards:   store.cards.totalCards,
    totalMarkets: store.cards.totalMarkets
});


const mapDispatchToProps = dispatch => ({});


class MainContainer extends Component
{
    componentDidMount()
    {
        // SVGLib.addSVGByID('header', SVGLib.GREEN_BABY_STATIC );
        console.log( "COMPONENT MOUNTED" );
    };

    openContact = ( e ) =>
    {
        if( e ) e.stopImmediatePropagation();
        console.log( "OPEN CONTACT CLICKED" );
    };

    submit = ( e ) =>
    {
        if( e ) e.stopImmediatePropagation();
        console.log( "SUBMIT CLICKED" );
    };

    render()
    {
        return(
          <div className="container">
            <div className="outerBox">
                <LoginComponent submit={this.submit} openContact={this.openContact}/>
            </div>
          </div>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
