/**
 * Created by Administrator on 2019/2/26 0026.
 */
import React, {Component} from 'react';
import {Route,Switch} from 'react-router-dom'
import Login from './pages/login'
// import Admin from './pages/admin'

class App extends Component {
  render () {
    return (
      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/' component={Login}/>
      </Switch>
    )
  }
}

export default App;