import React, {Component} from 'react';
import {Card, Form, Button, Input, Switch, message} from 'antd'
import {Link} from 'react-router-dom'
import {ArrowLeftOutlined} from '@ant-design/icons'
import CustomUpload from "@comps/Upload";
import {reqAddLesson} from '@api/edu/lesson'

const layout = {
  // antd把一个宽度分为24份
  // 表单文字描述部分
  labelCol: {
    span: 3
  },
  // 表单项部分
  wrapperCol: {
    span: 6
  }
}
class AddLesson extends Component {
  onFinish = async (values) => {
    const data = {
      ...values,
      chapterId: this.props.location.state
    }
      reqAddLesson(data).then(res => {
      message.success("新增课时成功")
      this.props.history.replace("/edu/chapter/list")
    })
  }

  render() {
    return (
      <Card
        title={
          <>
            <Link to='/edu/chapter/list'>
              <ArrowLeftOutlined />
            </Link>
            <span className='title' style={{marginLeft: 20}}>新增课时</span>
          </>
        }>
        <Form
          {...layout}
          name='subject'
          onFinish={this.onFinish}
          initialValues={{
            free: true
          }}>
          <Form.Item
            label='课时名称'
            name='title'
            rules={[
              {
                required: true,
                message: '请输入课时名称!'
              }
            ]}>
            <Input autoFocus={true} />
          </Form.Item>

          <Form.Item className="Item"
             valuePropName={"checked"}
             label='是否免费'
             name='free'
             rules={[
               {
                 required: true,
                 message: '请输入课时名称!'
               }
             ]}>
            <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
          </Form.Item>

          <Form.Item className="Item"
           label='上传视频'
           name='video'
           rules={[
             {
               required: true,
               message: '请上传视频!'
             }
           ]}>
            <CustomUpload/>
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default AddLesson;
