import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'

import Structure from 'component/structure/index.jsx'
import './style.scss';
//page
import Home from 'page/home/index.jsx';
import Login from 'page/common/login/index.jsx';
import ErrorPage from 'page/common/error/index.jsx';
import UserList from 'page/user/index.jsx';
import CrudRouter from 'page/crud/router.jsx';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ed4b82',
      main: '#e91e63',
      contrastText: '#a31545',
    },
     secondary: {
      light: '#ffcf33',
      main: '#ffc400',
      contrastText: '#b28900',
    }, 
  },
});
import 'scss/index.scss';
class App extends React.Component {
  render() {
    let StructureRouter = (
      <Structure>
        <Switch>
          <Route exact path='/home' component={Home} />
          <Route path='/error' component={ErrorPage} />
          <Route path='/user/index' component={UserList} />
          <Route path="/crud"  component={CrudRouter}  />
          <Redirect exact from='/user' to='/user/index' />
          <Redirect from='*' to='/home' />
        </Switch>
      </Structure>
    );

    return (
      <MuiThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/' render={props => {
            return StructureRouter
          }} />
        </Switch>
      </Router>
      </MuiThemeProvider>
    )
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('app')
);