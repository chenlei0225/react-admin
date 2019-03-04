import React, {Component} from 'react';
import {Layout} from 'antd'
import LeftNav from '../../components/admin-nav'
import Header from '../../components/admin-header'
import Footer from '../../components/admin-footer'
import './index.less'
import {Switch,Route,Redirect} from 'react-router-dom'
import Home from '../home'
import Category from '../category'
import Product from '../product/product'
import Role from '../role'
import User from '../user'
import Pie from '../charts/pie'
import Line from '../charts/line'
import Bar from '../charts/bar'
import MemoryUtils from '../../utils/memoryUtils'


const {
  Content,
  Sider,
} = Layout;
class Admin extends Component {
  render () {
    const user = MemoryUtils.user
    if(!user || !user._id){
      console.log(user)
      return <Redirect to='/login'/>
    }
    return (
      <Layout className="admin">
        <Sider style={{
          overflow: 'auto', height: '100vh', position: 'fixed', left: 0,
        }}>
          <LeftNav/>
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Header/>
          <Content className="content">
            <Switch>
              <Route path='/home' component={Home}/>
              <Route path='/category' component={Category}/>
              <Route path='/product' component={Product}/>
              <Route path='/role' component={Role}/>
              <Route path='/user' component={User}/>
              <Route path='/charts/pie' component={Pie}/>
              <Route path='/charts/line' component={Line}/>
              <Route path='/charts/bar' component={Bar}/>
              <Redirect to='/home'/>
            </Switch>
          </Content>
          <Footer/>
        </Layout>
      </Layout>
    )
  }
}

export default Admin;