import React, {Component} from 'react';
import {Form,Input} from 'antd'
import PropTypes from 'prop-types'


const Item = Form.Item
class UpdateCategory extends Component {
  static propTypes={
    categoryName:PropTypes.string.isRequired,
    getForm:PropTypes.func.isRequired
  }
  componentWillMount(){
    this.props.getForm(this.props.form)
  }

  render () {
    const {getFieldDecorator} = this.props.form
    return (
      <Form>
        <Item>
          {getFieldDecorator(
            'name',
            {
              initialValue:this.props.categoryName
            }
          )(
            <Input />
          )}

        </Item>
      </Form>
    )
  }
}

export default Form.create()(UpdateCategory);