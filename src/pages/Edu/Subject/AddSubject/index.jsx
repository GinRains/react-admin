import React, {Component} from 'react';
import {Card, Form, Select, Button, Input, Divider, message} from 'antd'
import {Link} from 'react-router-dom'
import {ArrowLeftOutlined} from '@ant-design/icons'
import {reqGetSubject, reqAddSubject} from '@api/edu/subject'

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
class AddSubject extends Component {
  constructor(props) {
    super(props);
    this.page = 1
  }
  state = {
    total: 0,
    items: []
  }
  async componentDidMount() {
    const res = await reqGetSubject(this.page++, 10)
    this.setState(res)
  }
  loadMoreSubjectList = async () => {
    const res = await reqGetSubject(this.page++, 10)
    const newItems = [...this.state.items, ...res.items]
    this.setState({
      items: newItems
    })
  }

  onFinish = async (values) => {
    const res = await reqAddSubject(values)
    if(res._id) {
      message.success("新增课程成功")
      this.props.history.push('/edu/subject/list')
    }
  }
  onFinishFailed = () => {

  }

  render() {
    const {total, items} = this.state

    return (
      <Card
        title={
          <>
            <Link to='/edu/subject/list'>
              <ArrowLeftOutlined />
            </Link>
            <span className='title' style={{marginLeft: 20}}>新增课程</span>
          </>
        }
      >
        <Form
          {...layout}
          name='subject'
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}>
          <Form.Item
            label='课程分类名称'
            name='subjectname'
            rules={[
              {
                required: true,
                message: '请输入课程分类!'
              }
            ]}>
            <Input autoFocus={true} />
          </Form.Item>

          <Form.Item
            label='父级分类id'
            name='parentid'
            rules={[
              {
                required: true,
                message: '请选择分类id'
              }
            ]}>
            <Select
              dropdownRender={menu => {
                return (
                  <div>
                    {menu}
                    <Divider>
                      {total <= items.length ? (
                        <span style={{color: '#ccc', fontSize: 14, cursor: 'pointer'}}>没有更多数据了</span>
                      ) : (
                        <Button type='link' onClick={this.loadMoreSubjectList}>
                          加载更多数据~
                        </Button>
                      )}
                    </Divider>
                  </div>
                )
              }}>
              <Select.Option  value={0} key={0}>
                {'一级菜单'}
              </Select.Option>
              {this.state.items.map(item => (
                <Select.Option value={item._id} key={item._id}>{item.title}</Select.Option>
              ))}
            </Select>
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

export default AddSubject;
