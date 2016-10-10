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
      category: '',
      question: '',
      answer: ''
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

  deleteCard (id) {
    CardActions.deleteCard(id);
  }

  setEditId(card) {
    this.setState({
      category: card.category,
      question: card.question,
      answer: card.answer, 
      editId: card.id
    })
  }

  getCategory(e) {
    this.setState({
      category: e.target.value
    })
  }

  getQuestion(e) {
     this.setState({
      question: e.target.value
    })
  }

  getAnswer(e) {
     this.setState({
      answer: e.target.value
    })
  }

  updateCard() {
    let {editId, category, question, answer} = this.state;
    let editedCard = {
      category: category,
      question: question,
      answer:   answer,
      id: editId
    }

    CardActions.editCard(editedCard);
  }



  render() {
    let {deck, category, question, answer} = this.state;
    console.log('Deck.js: ', deck)
    return (
      <div>

        <h1>Deck</h1>
        <h4>Double Click on a Card to Edit</h4>
        <div>
          {
            deck.map((card, i) => {
              let del = `mod${card.id}`;

              return (
                <div className='flashCard'>
                  <div key={uuid()}  id={card.id} data-toggle="modal" data-target={`.mod${card.id}`} onClick={this.setEditId.bind(this, card)}>
                    <h3>{card.category}</h3>
                    <h4>{card.question}</h4>
                    <h5>{card.answer}</h5>
                  </div>

                  <div className={`modal fade mod${card.id}`}  tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                          <h4 className="modal-title" id="myModalLabel">Edit Flashcard</h4>
                        </div>
                        <div className="modal-body">
                          <label htmlFor="">Category</label>
                          <input type="text" ref='editCategory' placeholder='Category' value={this.state.category} onChange={this.getCategory.bind(this)}/>
                          <label htmlFor="">Question</label>
                          <input type="text" ref='editQuestion' placeholder='Question' value={this.state.question} onChange={this.getQuestion.bind(this)}/>
                          <label htmlFor="">Answer</label>
                          <input type="text" ref='editAnswer' placeholder='Answer'     value={this.state.answer}   onChange={this.getAnswer.bind(this)}/>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                          <button className='btn btn-danger' data-dismiss="modal" onClick={this.deleteCard.bind(this, card.id)}>Delete Card</button>
                          <button type="button" className="btn btn-primary" data-dismiss="modal" onClick = {this.updateCard.bind(this)}>Save Changes</button>
                        </div>
                      </div>
                    </div>
                  </div>


                </div>
                )
            })
          }
        </div>
      </div>
      )
  }
}