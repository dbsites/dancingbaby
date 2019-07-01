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
import actions from '../actions/actions';

const mapStateToProps = store => ({
  markets: store.cards.marketList,
  newLocation: store.cards.newLocation,
  totalCards: store.cards.totalCards,
  lastMarketId: store.cards.lastMarketId,
  location: store.cards.newLocation,
});

const mapDispatchToProps = dispatch => ({
  createMarket: (e, lastMarketId, location) => {
    dispatch(actions.createMarketThunk(lastMarketId, location))
  },

  updateLocation: (e) => {
    dispatch(actions.setNewLocation(e.target.value));
  },

  addCard: (e) => {
      console.log('addCard', e.target.name);
      dispatch(actions.addCardThunk(e.target.name));
  },

  deleteCard: (e) => {
      console.log('deleteCard', e.target.name);
      dispatch(actions.deleteCardThunk(e.target.name));
  },

  fetchMarketData: () => {   
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username: 'smozingo', password: 'password' }),
      headers: {'Content-Type': 'application/json'},
    })
    .then(res => {
      if(res.status === 200) {
        console.log('YO!');
      } else {
        console.log('in login - Server returned status', res.status)
      }
    })  
    .catch(err => console.log('Error in createMarketThunk fetch:', err));
  }
});

class MarketsContainer extends Component
{

  componentDidMount()
  {
    // fetch initial data from the database
    this.props.fetchMarketData();
  }

  render()
  {

      return(
      <div className="innerbox">
        <MarketCreator updateLocation={this.props.updateLocation}
                       createMarket={this.props.createMarket}
                       lastMarketId={this.props.lastMarketId}
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