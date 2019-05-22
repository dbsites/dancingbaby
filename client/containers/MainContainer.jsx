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
import TotalsDisplay from '../components/TotalsDisplay.jsx';
import MarketsContainer from './MarketsContainer.jsx';

import SVGLib from '../constants/svgLib';


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
        SVGLib.addSVGByID('header', SVGLib.GREEN_BABY_STATIC );
    };

    render()
    {
        return(
          <div className="container">
            <div className="outerBox">
              <h1 id="header">DANCING BABY!</h1>
              <TotalsDisplay totalCards={this.props.totalCards} totalMarkets={this.props.totalMarkets}/>
              <MarketsContainer/>
            </div>
          </div>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
