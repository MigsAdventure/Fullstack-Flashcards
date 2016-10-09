import API from '../API';

const CardActions = {
  fetchDeck() {
    API.fetchDeck();
  },

  sendNewCard(newCard) {
    API.sendNewCard(newCard);
  },

  deleteCard(delCard) {
    API.deleteCard(delCard);
  },

}

export default CardActions;