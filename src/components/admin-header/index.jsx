import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import './index.less'
import {Row,Col,Modal,message} from 'antd'
import MemoryUtils from '../../utils/memoryUtils'
import {removeItem} from '../../utils/storageUtils'
import menuList from '../../config/menuConfig'
import {resWeather} from '../../api/ajax'
import dayjs from 'dayjs'
import MyButton from '../../components/my-button'


class Header extends Component {
  state={
    time:dayjs().format('YYYY-MM-DD HH:mm:ss'),
    dayPictureUrl: 'http://api.map.baidu.com/images/weather/day/qing.png',
    weather: '晴11'
  }
  componentDidMount(){
    this.updataTime()
    this.getWeather()
  }
  getWeather=()=>{
    resWeather('北京')
      .then((res)=>{
        this.setState({
          dayPictureUrl:res.dayPictureUrl,
          weather:res.weather
        })
      })
      .catch(err=>{
        message.error(err)
      })
  }
  updataTime=()=>{
    this.timer=setInterval(()=> {
      this.setState({
        time:dayjs().format('YYYY-MM-DD HH:mm:ss')
      })
    },1000)
  }
  componentWillUnmount(){
    clearInterval(this.timer)
  }
  logOut=()=>{
    Modal.confirm({
      title: '您确认退出登录吗?',
      okText: '确认',
      cancelText: '取消',
      onOk:()=> {
        removeItem()
        MemoryUtils.user={}
        this.props.history.replace('/login')
      }
    });
  }

  getTitle=(menu)=>{
    let {pathname} = this.props.location
    if(pathname.indexOf('/product')===0){
      pathname='/product'
    }
    for (let i = 0; i < menu.length; i++) {
      let item = menu[i]
      if(item.children){
        let title=this.getTitle(item.children)
        if(title){
          return title
        }
      }else {
        if(item.key===pathname){
          return item.title
        }
      }
    }
  }
  render () {
    const {username} = MemoryUtils.user
    const title=this.getTitle(menuList)
    const {weather,dayPictureUrl,time} = this.state
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎，{username}</span>
          <MyButton name="退出" onClick={this.logOut} />
        </div>
        <Row className="header-bottom">
          <Col span={4} className="header-title">{title}</Col>
          <Col span={20} className="weather">
            <span className="date">{time}</span>
            <span className="weather-img">
              <img src={dayPictureUrl} alt="weather"/>
            </span>
            <span className="weather-detail">{weather}</span>
          </Col>
        </Row>
      </div>
    )
  }
}

export default withRouter(Header);