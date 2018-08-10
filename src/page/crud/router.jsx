import React from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'
import ProductList from 'page/crud/product/index.jsx';
import ProductSave from 'page/crud/product/save.jsx';
import ProductDetail from 'page/crud/product/detail.jsx';
class CrudRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route path='/crud/product/save/:pid?' component={ProductSave} />
                <Route path='/crud/product/detail/:pid?' component={ProductDetail} />
                <Route path='/crud/product' component={ProductList} />
                <Redirect exact from='/crud' to='/crud/product' />
            </Switch>
        )
    }
}

export default CrudRouter;