import React from 'react';
import {render} from 'react-dom';
import { IndexRoute, Router, Route, browserHistory } from 'react-router'

import Layout from './components/Layout';
import Home from './components/Home';
import Deck from './components/Deck';
import Test from './components/Test';


render(
  <Router history={browserHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={Home}/>
      <Route path='/deck' component={Deck}/>
      <Route path='/test' component={Test}/>
    </Route>
  </Router>,
  document.getElementById('root')
  )



