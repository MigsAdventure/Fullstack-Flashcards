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
    axios.post('http://localhost:8000/cards/', newCard)
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
      API.fetchDeck();
    })
    .catch(err => {
      console.log('err: ', err);
    })
  },

  editCard(editedCard) {
    axios.put(`http://localhost:8000/cards/${editedCard.id}`, editedCard)
    .then(response => {
      API.fetchDeck();
      console.log('EditCard: ', response);
    }) 
  },

}

export default API;