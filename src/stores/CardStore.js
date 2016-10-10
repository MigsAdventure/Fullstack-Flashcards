import {EventEmitter} from 'events';
import AppDispatcher from '../AppDispatcher';
import _ from 'lodash';

let _deck = [];
let _randDeck = _deck;

class CardStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      let {type, payload} = action;
      switch(type) {
        case 'RECEIVE_DECK' : {
              _deck = payload.deck.data;
              this.emit('CHANGE');
              break;
        }
      } //end of switch
    })
  } //end of constructor

 startListening(cb) {
    this.on('CHANGE', cb);
  }

  stopListening(cb) {
    this.removeListener('CHANGE', cb);
  }

  getAll() {
    return _deck;
  }

  getRandomCard() {
      _randDeck = _.shuffle(_deck);
    return _randDeck.pop();
  }
}

export default new CardStore();