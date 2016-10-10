import React, {Component} from 'react';
import {Link} from 'react-router';
import classNames from 'classnames';
import CardActions from '../actions/CardActions';

export default class Layout extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    CardActions.fetchDeck();
  }


  render() {
    let path = this.props.location.pathname;
    return(
      <div className="container">
        <h1 className="text-center">Flashcards</h1>
         <ul className="nav nav-tabs">
          <li role="presentation" className={classNames({ active: path === '/'})}>
            <Link to='/'>Home</Link>
          </li>
          <li role='presentation' className={classNames({active: path === '/deck'})}>
            <Link to='/deck'>Deck</Link>
          </li>
          <li role='presentation' className={classNames({active: path === '/test'})}>
            <Link to='/test'>Test</Link>
          </li>
        </ul>
        {this.props.children}
      </div>
      )
  }
}