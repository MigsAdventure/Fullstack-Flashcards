import React, {Component} from 'react';
import InputForm from './InputForm';

export default class Home extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <h2>Create a new flashcard</h2>
        <InputForm/>
      </div>
      )
  }
}
