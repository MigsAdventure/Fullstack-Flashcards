import React, {Component} from 'react';
import CardStore from '../stores/CardStore';
import _ from 'lodash';

export default class Test extends Component {
  constructor() {
    super();

    this.state = {
      card: CardStore.getRandomCard(),
      answer: ''
    }

    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    CardStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    CardStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({
      card: CardStore.getRandomCard()
    })
  }

  getRandCard() {
    let {card} = this.state;
    
  }

  checkAnswer() {
    let {card} = this.state;
    let {answerInput} = this.refs;
    if(answerInput.value.toLowerCase() === card.answer.toLowerCase()) {
      this.setState({
        answer: 'Congrats! You got it right!'
      })
    } else {
      this.setState({
        answer: `Wrong! The correct answer was ${card.answer}`
      })
    }
    this._onChange;
  }

  render() {
    let {card, answer} = this.state;
    return (
      <div>
        <h1>Test</h1>
        <div className='randomCard'>
          <h2>{card.category}</h2>
          <h3>{card.question}</h3>
          <h4>{answer}</h4>
          <input ref='answerInput'/>
          <button className='btn btn-primary' onClick={this.checkAnswer.bind(this)}>submit</button>
        </div>
        <button className='btn btn-success' onClick={this.getRandCard.bind(this)}>Next</button>
      </div>
      ) 
  }
}
