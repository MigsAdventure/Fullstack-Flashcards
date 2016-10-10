import AppDispatcher from '../AppDispatcher';

const ServerActions = {
  receiveDeck(deck) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_DECK',
      payload: {deck},
    })
  },

  deleteCard(card) {
    AppDispatcher.dispatch({
      type: 'DELETE_CARD',
      payload: {card}
    })
  },

}

export default ServerActions;