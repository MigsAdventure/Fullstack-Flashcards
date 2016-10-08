import React, {Component} from 'react';
import {Link} from 'react-router';
import classNames from 'classnames';

export default class Layout extends Component {
  constructor() {
    super();
  }

  render() {
    let path = this.props.location.pathname;
    return(
      <div className="container">
        <h1 className="text-center">Flashcards</h1>
        {this.props.children}
      </div>
      )
  }
}