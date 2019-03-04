import React, {Component} from 'react';
import './index.less'
import img from '../../assets/images/logo.png'
import { Menu, Icon } from 'antd';
import {NavLink,withRouter} from 'react-router-dom'
import menuList from '../../config/menuConfig'

const SubMenu = Menu.SubMenu;
const Item = Menu.Item

class LeftNav extends Component {

  componentWillMount(){
    this.menu=this.createMenu(menuList)
  }

  createMenu=(menu)=>{
    return menu.map(item=>{
      if(item.children){
        let {pathname} = this.props.location
        if(pathname.indexOf('/product')===0){
          pathname='/product'
        }
        const result = item.children.find(item=>item.key===pathname)
        if(result){
          this.openKey=item.key
        }

        return  <SubMenu key={item.key} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
                {
                  this.createMenu(item.children)
                }
                </SubMenu>
      }else {
        return (
          <Item key={item.key}>
            <NavLink to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </NavLink>
          </Item>
        )
      }
    })

  }

  render () {
    let {pathname} = this.props.location
    if(pathname.indexOf('/product')===0){
      pathname='/product'
    }
    return (
        <div className="nav">
        <div >
          <NavLink to="/home" className="logo">
            <img src={img} alt="logo"/>
            <h2>硅谷后台</h2>
          </NavLink>
        </div>
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[pathname]}
          defaultOpenKeys={[ this.openKey]}
        >
          {
            this.menu
          }
        </Menu>
      </div>
    )
  }
}

export default withRouter(LeftNav);