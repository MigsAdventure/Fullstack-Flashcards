import React, {Component} from 'react';
import CardStore from '../stores/CardStore'
import CardActions from '../actions/CardActions'
import uuid from 'uuid';

export default class Deck extends Component {
  constructor() {
    super();

    this.state = {
      deck: CardStore.getAll()
    }

    this._onChange = this._onChange.bind(this);
  }

  componentWillMount(){
    CardActions.fetchDeck();
    CardStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    CardStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({
      deck: CardStore.getAll()
    })
  }

  render() {
    let {deck} = this.state;
    console.log('Deck.js: ', deck)
    return (
      <div>
        <h1>Deck</h1>
        <div>
          {
            deck.map(card => {
              return (
                <div className='flashCard' key={uuid()} id={uuid()}>
                  <h3>{card.category}</h3>
                  <h4>{card.question}</h4>
                  <h5>{card.answer}</h5>
                </div>
                )
              
            })
          }
        </div>
      </div>
      )
  }
}