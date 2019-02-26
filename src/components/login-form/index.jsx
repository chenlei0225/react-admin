import React, {Component} from 'react';
import {
  Form, Icon, Input, Button,message
} from 'antd';

const Item = Form.Item
class LoginForm extends Component {
  handleSubmit=(e)=>{
    e.preventDefault();
    const {validateFields, resetFields} = this.props.form;

    //检查当前表单项是否通过校验
    validateFields((error, values) => {
      console.log(error, values);
      if (!error) {
        //校验通过
        console.log('收集的表单数据：', values);
        //发送ajax请求

      } else {
        //校验失败
        //重置密码
        resetFields(['password']);
        //收集错误信息
        /*
         Object.values(obj) 将对象中每一个值，添加到一个数组中并返回数组
         arr.reduce()  统计错误信息
         */
        const errMsg = Object.values(error).reduce((prev, curr) => prev + curr.errors[0].message + ' ', '')
        //提示错误
        message.error(errMsg);
      }

    })
  }
  render () {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Item>
          {getFieldDecorator('username', {
            rules: [
              { required: true, message: '请输入用户名！' },
              { max:11, message: '用户名长度不能超过11位' },
              { min:4, message: '用户名长度不能小于4位' },
              { pattern:/^[a-zA-Z0-9_-]+$/, message: '用户名必须是（字母，数字，下划线，减号）' },
              ],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
          )}
        </Item>
        <Item>
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: '请输入密码!' },
              { max:16, message: '密码长度不能超过16位' },
              { min:6, message: '密码长度不能小于6位' },
              { pattern:/^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/, message: '密码必须包括：至少1个大写字母，1个小写字母，1个数字，1个特殊字符' },
              ],
          })(
            <Input type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="密码" />
          )}

        </Item>
        <Item>
          <Button type="primary" htmlType="submit" className="login-form-button" >登录</Button>
        </Item>
      </Form>
    )
  }
}

const MsgForm = Form.create()(LoginForm);

export default MsgForm;