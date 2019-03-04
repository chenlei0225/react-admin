import React, {Component} from 'react';
import img from '../../assets/images/logo.png'
import './index.less'
import LoginForm from '../../components/login-form'
import {resLogin} from '../../api/ajax'
import {setItem} from '../../utils/storageUtils'
import MemoryUtils from '../../utils/memoryUtils'

class Login extends Component {
  state={
    err:''
  }
  login= async (values)=>{
    const result = await resLogin(values)
    console.log(result);
    if(result.status===0){
      setItem(result.data)
      MemoryUtils.user=result.data
      this.props.history.replace('/');
    }else {
      this.setState({
        err:result.msg
      })
    }

  }
  render () {
    let height = this.state.err? 30:0
    return (
      <div className="login">
        <header className="login-header">
          <img src={img} alt="logo"/>
          <h1>React:后台管理系统</h1>
        </header>
        <section className="login-content">
          <div className="err-form" style={{height}}>{this.state.err}</div>
          <h2>用户登录</h2>
          <LoginForm login={this.login}/>
        </section>
      </div>
    )
  }
}

export default Login;