/**
 * ************************************
 *
 * @module  MarketsContainer
 * @author  smozingo
 * @date    11/12/17
 * @description
 *
 * ************************************
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import MarketCreator from '../components/MarketCreator.jsx';
import MarketsDisplay from "../components/MarketsDisplay.jsx";
import * as actions from '../actions/actions';

const mapStateToProps = store => ({
  markets: store.cards.marketList,
  newLocation: store.cards.newLocation,
  totalCards: store.cards.totalCards,
});

const mapDispatchToProps = dispatch => ({
  createMarket: (e) => {
    console.log('In createMarket');
    dispatch(actions.createMarket())
  },

  updateLocation: (e) => {
    console.log('OnChange', e.target.value);
    dispatch(actions.setNewLocation(e.target.value));
  },

  addCard: (e) => {
      console.log('addCard', e.target.name);
      dispatch(actions.addCard(e.target.name));
  },

  deleteCard: (e) => {
      console.log('deleteCard', e.target.name);
      dispatch(actions.deleteCard(e.target.name));
  }

});

class MarketsContainer extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return(
      <div className="innerbox">
        <MarketCreator updateLocation={this.props.updateLocation}
                       createMarket={this.props.createMarket}
                       newLocation={this.props.newLocation}
        />
        <hr/>
        <MarketsDisplay markets={this.props.markets}
                        totalCards={this.props.totalCards}
                        addCard={this.props.addCard}
                        deleteCard={this.props.deleteCard} />
      </div>
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(MarketsContainer);