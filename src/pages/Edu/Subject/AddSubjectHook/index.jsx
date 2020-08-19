import React, {useState, useEffect} from 'react'
import {Button, Card, Divider, Form, Input, message, Select} from "antd";
import {ArrowLeftOutlined} from '@ant-design/icons'
import {Link} from "react-router-dom";

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
export default function AddSubject(props) {
  const [total, setTotal] = useState(0),
    [page, setPage] = useState(1),
    [items, setItems] = useState([])

  useEffect(() => { // componentDidMount || componentDidUpdate
    async function fetchDate() {
      const res = await reqGetSubject(page, 10)
      if(res.total) {
        const {total, items} = res
        setPage(page + 1)
        setTotal(total)
        setItems(items)
      }
    }

    fetchDate()
    return () => { // componentWillUnmount

    }
  }, [])


  async function onFinish(values) {
    const res = await reqAddSubject(values)
    if(res._id) {
      message.success("新增课程成功")
      props.history.push('/edu/subject/list')
    }
  }
  function onFinishFailed() {

  }
  async function loadMoreSubjectList() {
    const res = await reqGetSubject(page, 10)
    const newItems = [...items, ...res.items]
    setItems(newItems)

    setPage(page + 1)
  }

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
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
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
                      <Button type='link' onClick={loadMoreSubjectList}>
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
            {items.map(item => (
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
