import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import ProductList from './inventoryList.jsx';
import inventoryEdit from './inventoryEdit.jsx';
import ProductImage from './productImage.jsx';

const NotFound = () => <h1>Page Not Found</h1>;

export default function Contents() {
  return (
    <Switch>
      <Redirect exact from="/" to="/home" />
      <Route path="/home" component={ProductList} />
      <Route path="/myProducts" component={ProductList} />
      <Route path="/edit/:id" component={inventoryEdit} />
      <Route path="/img/:id" component={ProductImage} />
      <Route component={NotFound} />>
    </Switch>
  );
}
