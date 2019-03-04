import React, {Component} from 'react';
import {Route,Switch,Redirect} from 'react-router-dom'
import SaveUpdate from './saveupdate'
import ProductList from './index'



class Product extends Component {
  render () {
    return (
      <Switch>
        <Route path='/product/index' component={ProductList}/>
        <Route path='/product/saveupdate' component={SaveUpdate}/>
        <Redirect to='/product/index'/>
      </Switch>
    )
  }
}

export default Product;