import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Layout from './HOC/Layout/Layout';
import BurgerBuilder from '../src/containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import OrderContaineer from './containers/Orders/order';




class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={OrderContaineer} />
            <Route path="/"  exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
