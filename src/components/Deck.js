import React, {Component} from 'react';
import CardStore from '../stores/CardStore'
import CardActions from '../actions/CardActions'
import uuid from 'uuid';


export default class Deck extends Component {
  constructor() {
    super();

    this.state = {
      deck: CardStore.getAll(),
      editId: '',
      category: 'cat',
      question: 'ques',
      answer: 'ans'
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

  _onChange(card) {
    this.setState({
      deck: CardStore.getAll(),
    })
  }

  deleteCard () {
    let {editId} = this.state;
    console.log('delete card: ', editId);
    CardActions.deleteCard(editId);
  }

  updateCard() {
    let {editId, category, question, answer} = this.state;
    let {editCategory, editQuestion, editAnswer} = this.refs;

    let editedCard = {
      category: editCategory.value,
      question: editQuestion.value,
      answer: editAnswer.value,
      id: editId
    }

    CardActions.editCard(editedCard);
  }

  setEditId(card) {

    this.setState({
      category: card.category,
      question: card.question,
      answer: card.answer, 
      editId: card.id
    })
  }

  render() {
    let {deck, category, question, answer} = this.state;
    console.log('Deck.js: ', deck)
    return (
      <div>

        <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title" id="myModalLabel">Edit Flashcard</h4>
              </div>
              <div className="modal-body">
                <input type="text" ref='editCategory' placeholder='Category' defaultValue={category}/>
                <input type="text" ref='editQuestion' placeholder='Question' defaultValue={question}/>
                <input type="text" ref='editAnswer' placeholder='Answer' defaultValue={answer}/>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button className='btn btn-danger' data-dismiss="modal" onClick={this.deleteCard.bind(this)}>Delete Card</button>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick = {this.updateCard.bind(this)}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>

        <h1>Deck</h1>
        <h4>Double Click on a Card to Edit</h4>
        <div>
          {
            deck.map(card => {
              return (
                <div className='flashCard' key={uuid()} id={card.id} data-toggle="modal" data-target="#myModal" onClick={this.setEditId.bind(this, card)}>
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