import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'

import Structure from 'component/structure/index.jsx'
import './style.scss';
//page
import Home from 'page/home/index.jsx';
import Product from 'page/crud/index.jsx';
import Login from 'page/common/login/index.jsx';
import 'scss/index.scss';
class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/' render={props => {
            return <Structure>
              <Switch>
                <Route exact path='/home' component={Home} />
                <Route path='/crud-product' component={Product} />
                <Redirect from='*' to='/home' />
              </Switch>
            </Structure>
          }} />
        </Switch>
      </Router>
    )
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('app')
);