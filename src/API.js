import {get} from 'axios';
import ServerActions from './actions/ServerActions';

const API = {
  fetchDeck() {
    get('http://localhost:8000/cards')
    .then(response => {
     ServerActions.receiveDeck(response);
    })
    .catch(err => {
      console.log('err: ', err);
    })
  },
}

export default API;