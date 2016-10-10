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

  editCard(editedCard)  {
    API.editCard(editedCard);
  },
  
}

export default CardActions;