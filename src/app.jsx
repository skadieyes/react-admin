import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'

//page
import Home from 'page/home/index.jsx';


class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
        <Route exact path='/' component = { Home }/>
        <Redirect from='*' to='/'/>
        </Switch>
      </Router>
    )
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('app')
);