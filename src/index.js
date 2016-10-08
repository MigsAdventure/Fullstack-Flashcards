import React from 'react';
import {render} from 'react-dom';
import { IndexRoute, Router, Route, browserHistory } from 'react-router'

import Layout from './components/Layout';
import Home from './components/Home';


render(
  <Router history={browserHistory}>
    <Route path='/' component={Layout}>

      <IndexRoute component={Home}/>


    </Route>
  </Router>,
  document.getElementById('root')
  )



