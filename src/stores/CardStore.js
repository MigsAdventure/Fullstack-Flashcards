import {EventEmitter} from 'events';
import AppDispatcher from '../AppDispatcher';

let _deck = '' || [];

class CardStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      let {type, payload} = action;
      switch(type) {
        case 'RECEIVE_DECK' : {
              console.log('deck Store:', payload.deck.data)
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
    this.removeListener('CHANGE', cb)
  }

  getAll() {
    return _deck;
  }
}

export default new CardStore();