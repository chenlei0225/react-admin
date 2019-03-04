import React, {Component} from 'react';
import {Card,Button,Icon,Table,message,Modal} from 'antd'
import {resCategory,resAddCategory,resUpdateCategory} from '../../api/ajax'
import AddCategoryForm from '../../components/category-add-form'
import MyButton from '../../components/my-button'
import UpdateCategoryForm from '../../components/update-category-form'


class Category extends Component {
  state={
    categories:[],
    isShowAdd:false,
    isShowUpdate:false,
    category:{},
    parentId:'0'
  }
  componentDidMount(){
    this.getCategory('0')
  }
  getForm=(form)=>{
    this.form=form
  }
  getCategory= async(parentId)=>{
    const result = await resCategory(parentId)
    // console.log(result);
    if(result.status===0){
      if(result.data.length!==0){
        this.setState({
          categories:result.data
        })
      }else {
        message.warning('该分类下无子品类')
      }

    }else {
      message.error('请求失败！')
    }
  }

  addCategory= async()=>{

    const {parentId,categoryName} = this.form.getFieldsValue()
    const result = await resAddCategory(parentId,categoryName)
    if(result.status===0){
      message.success('添加分类成功~')
      if(result.data.parentId==='0'){
        this.setState({
          isShowAdd:false,
          categories:[...this.state.categories,result.data]
        })

      }else {
        this.setState({
          isShowAdd:false
        })
        this.showChildrenCategory({_id:result.data.parentId})
      }
    }else {
      this.setState({
        isShowAdd:false
      })
      message.error('添加分类失败！')
    }
    this.form.resetFields()
  }

  updateCategory= async ()=>{
    const categoryName = this.form.getFieldValue('name')
    const {name,_id} = this.state.category
    if(categoryName===name){
      message.warning('请修改名称~')
    }else {
      message.success('更新分类成功~')
      const result=await resUpdateCategory(_id,categoryName)
      if(result.status===0){
        this.setState({
          isShowUpdate:false,
          categories:this.state.categories.map(item=>{
            if(_id===item._id){
              item.name=categoryName
            }
            return item
          })
        })
      }else {
        this.setState({
          isShowUpdate:false
        })
        message.error('更新分类失败~')
      }
    }
  }

  showChildrenCategory= (category)=>{
    this.getCategory(category._id)
    this.setState({
      parentId:category._id,
      category
    })
  }


  cardTitleClick=()=>{
    this.getCategory('0')
    this.setState({
      category:{},
      parentId:'0'
    })
  }

  render () {
    const columns = [{
      title: '品类名称',  //表头名称
      dataIndex: 'name',
    }, {
      title: '操作',
      width: 300,
      render: category => {
        // console.log(category);
        if(category.parentId === '0'){
          return <div>
            <MyButton onClick={()=>this.setState({isShowUpdate:true,category})} name="修改名称" /> &nbsp;&nbsp;&nbsp;
            <MyButton name="查看其子品类" onClick={()=>this.showChildrenCategory(category)}/>
          </div>
        }else {
          return <MyButton onClick={()=>this.setState({isShowUpdate:true,category})} name="修改名称" />
        }

      }
    }];

    const {categories,category,parentId} = this.state;
    const title = parentId==='0'? '一级分类列表':<div>
      <MyButton onClick={this.cardTitleClick}  name="一级分类"/>
      <Icon type="arrow-right" />&nbsp;<span>{category.name}</span>
    </div>
    return (
      <Card
        title={title}
        extra={<Button type="primary" onClick={()=>{this.setState({isShowAdd:true})}}><Icon type="plus"/>添加品类</Button>}
      >
        <Modal
          title="添加分类"
          visible={this.state.isShowAdd}
          onOk={this.addCategory}
          onCancel={()=>{this.setState({isShowAdd:false})}}
        >
          <AddCategoryForm categories={categories} getForm={this.getForm}/>
        </Modal>

        <Modal
          title="更新分类"
          visible={this.state.isShowUpdate}
          onOk={this.updateCategory}
          onCancel={()=>{this.setState({isShowUpdate:false})}}
          width={300}
        >
          <UpdateCategoryForm categoryName={category.name} getForm={this.getForm}/>
        </Modal>

        <Table
          dataSource={categories}
          columns={columns}
          pagination={{
            pageSize: 3,
            showSizeChanger: true,
            pageSizeOptions: ['3', '6', '9', '12'],
            showQuickJumper: true,
          }}
          rowKey='_id'
          bordered
          loading={categories.length===0}
        />
      </Card>
    )
  }
}

export default Category;