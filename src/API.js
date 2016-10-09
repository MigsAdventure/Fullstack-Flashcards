import axios from 'axios';
import ServerActions from './actions/ServerActions';

const API = {
  fetchDeck() {
    axios.get('http://localhost:8000/cards')
    .then(response => {
     ServerActions.receiveDeck(response);
    })
    .catch(err => {
      console.log('err: ', err);
    })
  },

  sendNewCard(newCard){
    axios.post('http://localhost:8000/cards', newCard)
    .then(response => {
      console.log('newCard: ', response);
    })
    .catch( err => {
      console.log('err:', err);
    })
  },

  deleteCard(delCard) {
    axios.delete(`http://localhost:8000/cards/${delCard}`)
    .then(response => {
      console.log('delete card: ', response);
    })
    .catch(err => {
      console.log('err: ', err);
    })
  }

}

export default API;