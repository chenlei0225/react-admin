import React, {Component} from 'react';
import img from './logo.png'
import './index.less'
import LoginForm from '../../components/login-form'

class Login extends Component {
  render () {
    return (
      <div className="login">
        <header className="login-header">
          <img src={img} alt="logo"/>
          <h1>React:后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登录</h2>
          <LoginForm/>
        </section>
      </div>
    )
  }
}

export default Login;