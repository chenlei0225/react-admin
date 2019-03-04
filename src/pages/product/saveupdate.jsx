import React, {Component} from 'react';
import {Form,Input,InputNumber,Icon,Cascader,Button} from 'antd'


const Item = Form.Item
class SaveUpdate extends Component {
  state={
    options:[]
  }

  render () {

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };

    const options = [
      {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [{
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [{
            value: 'xihu',
            label: 'West Lake',
          }],
        }],
      },
      {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [{
          value: 'nanjing',
          label: 'Nanjing',
          children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          }],
        }],
      }
    ];

    const {form,location} = this.props

    const {getFieldDecorator} = form

    const {state} = location

    const product = state?state.product:false

    return (
      <div style={{padding:20}}>
        <Icon type="arrow-left" style={{fontSize:25}} onClick={()=>this.props.history.goBack()}/>&nbsp;&nbsp;
        <span style={{fontSize:25}}>{product?'编辑商品':'添加商品'}</span>
        <Form style={{marginTop:20}}>
          <Item
            label="商品名称"
            {...formItemLayout}
          >
            {
              getFieldDecorator(
                'name',
                {
                  initialValue:''
                }
              )(
                <Input placeholder="请输入商品名称"/>
              )
            }
          </Item>
          <Item
            label="商品描述"
            {...formItemLayout}
          >
            {
              getFieldDecorator(
                'name',
                {
                  initialValue:''
                }
              )(
                <Input placeholder="请输入商品名称"/>
              )
            }
          </Item>
          <Item
            label="所属分类"
            labelCol={{span:2}}
            wrapperCol={{span:5}}
          >
            {
              getFieldDecorator(
                'name',
                {
                  initialValue:''
                }
              )(
                <Cascader placeholder='请选择分类' options={options}/>
              )
            }
          </Item>
          <Item
            label="商品价格"
            {...formItemLayout}
          >
            {
              getFieldDecorator(
                'name',
                {
                  initialValue:''
                }
              )(
                <InputNumber
                  style={{width:150}}
                  formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\D+/g, '')}
                />
              )
            }

          </Item>
          <Item
            label="商品图片"
            {...formItemLayout}
          >
            zzz
          </Item>
          <Item
            label="商品详情"
            {...formItemLayout}
          >
            xxx
          </Item>
          <Item>
            {
              getFieldDecorator(
                'name',
                {
                  initialValue:''
                }
              )(
                <Button type='primary'>提交</Button>
              )
            }
          </Item>
        </Form>
      </div>
    )
  }
}

export default Form.create()(SaveUpdate);