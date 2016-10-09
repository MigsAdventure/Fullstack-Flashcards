import React, {Component} from 'react';
import CardActions from '../actions/CardActions';
import uuid from 'uuid'

export default class InputForm extends Component {
  constructor() {
    super();

  }

  submit(e) {
    e.preventDefault();
    let {categoryInput,questionInput,answerInput} = this.refs;
    let newCard = {
      category: categoryInput.value,
      question: questionInput.value,
      answer: answerInput.value,
      id: uuid()
    }
    CardActions.sendNewCard(newCard);
  }

  render() {
    return (
      <form onSubmit={this.submit.bind(this)}>
        <input className='form-control newCardInput' ref='categoryInput' type="text" placeholder="Category"/>
        <input className='form-control newCardInput' ref='questionInput' type="text" placeholder="Question"/>
        <input className='form-control newCardInput' ref='answerInput' type="text" placeholder="Answer"/>
        <button className="btn btn-primary">Create</button>
      </form>
      )
  }
}