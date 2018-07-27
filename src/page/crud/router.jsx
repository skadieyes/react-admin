import React from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'
import  ProductList  from 'page/crud/index.jsx';

class CrudRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route path='/crud/product' component={ProductList} />
                <Redirect exact from='/crud' to='/crud/product' />
            </Switch>
        )
    }
}

export default CrudRouter;