import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'

import Structure from 'component/structure/index.jsx'
import './style.scss';
//page
import Home from 'page/home/index.jsx';
import Product from 'page/crud/index.jsx';
import Login from 'page/common/login/index.jsx';
import ErrorPage from 'page/common/error/index.jsx';
import UserList from 'page/user/index.jsx';
import 'scss/index.scss';
class App extends React.Component {
  render() {
    let StructureRouter =(
      <Structure>
                <Switch>
                  <Route exact path='/home' component={Home} />
                  <Route path='/crud-product' component={Product} />
                  <Route path='/error' component={ErrorPage} />
                  <Route path='/user/index' component={UserList} />
                  <Redirect exact from='/user' to='/user/index' />
                   <Redirect from='*' to='/home' />
                </Switch>
              </Structure>
    );
    return (
      <Router>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/' render={props => {
            return StructureRouter
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