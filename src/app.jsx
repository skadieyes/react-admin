import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'

import Structure from 'component/structure/index.jsx'
import './style.scss';
//page
import Home from 'page/home/index.jsx';


class App extends React.Component {
  render() {
    return (
      <Router>
        <Structure>
        <Switch>
          <Route exact path='/' component={Home} />
          <Redirect from='*' to='/' />
        </Switch>
        </Structure>
      </Router>
    )
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('app')
);