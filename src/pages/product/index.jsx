import React, {Component} from 'react';
import {Card, Table, Button, Icon, Input, Select} from 'antd'
import {reqProducts,searchProducts} from '../../api/ajax'
import MyButton from '../../components/my-button'

const Option = Select.Option
class ProductList extends Component {
  state={
    products:[],
    total:0,
    searchValue:'',
    searchType:'productName'
  }

  componentWillMount(){
    this.columns = [{
      title: '商品名称',  //表头名称
      dataIndex: 'name',
    }, {
      title: '商品描述',
      dataIndex: 'desc'
    }, {
      title: '价格',
      dataIndex:'price'
    }, {
      title: '状态',
      render:()=>{
        return <div>
          <Button type='primary'>下架</Button>&nbsp;&nbsp;
          在售
        </div>
      }
    }, {
      title: '操作',
      render:product => {
        return <div>
          <MyButton onClick={() => {}} name="详情"/> &nbsp;
          <MyButton name="修改" onClick={() => this.props.history.push('/product/saveupdate',{product})}/>
        </div>
      }
    }]
  }

  getProducts= async (pageNum,pageSize)=>{
    const {searchType,searchValue} = this.state
    let result;
    if(searchValue){
      result = await searchProducts(searchType,searchValue,pageNum,pageSize)
    }else {
      result = await reqProducts(pageNum,pageSize)
    }
    if(result.status===0){
      this.setState({
        products:result.data.list,
        total:result.data.total
      })
    }
  }

  componentDidMount(){
    this.getProducts(1,3)
  }

  handleChange=(name,value)=>{
    this.setState({
      [name]:value
    })
  }

  render() {
    const {products,total} = this.state
    return (
      <Card
        title={
          <div>
            <Select defaultValue="productName" onChange={(value)=>this.handleChange('searchType',value)}>
              <Option value='productName'>根据商品名称</Option>
              <Option value='productDesc'>根据商品描述</Option>
            </Select>
            <Input placeholder="关键字" onChange={(e)=>this.handleChange('searchValue',e.target.value)} style={{width:200,marginLeft:10,marginRight:10}}/>
            <Button type='primary' onClick={()=>this.getProducts(1,3)}>搜索</Button>
          </div>
        }
        extra={<Button type="primary" onClick={()=>this.props.history.push('/product/saveupdate')}><Icon type="plus"/>添加产品</Button>}
      >
      <Table
        dataSource={products}
        columns={this.columns}
        pagination={{
          defaultPageSize: 3,
          showSizeChanger: true,
          pageSizeOptions: ['3', '6', '9', '12'],
          showQuickJumper: true,
          total,
          onChange:this.getProducts,
          onShowSizeChange:this.getProducts
        }}
        rowKey='_id'
        bordered
        loading={false}
      />
      </Card>
    )
  }
}

export default ProductList;