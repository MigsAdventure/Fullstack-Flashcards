import AppDispatcher from '../AppDispatcher';

const ServerActions = {
  receiveDeck(deck) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_DECK',
      payload: {deck},
    })
  },
}

export default ServerActions;