import React, { Component } from "react";

import {Button, Table, Tooltip} from 'antd'
import {PlusOutlined, FormOutlined, DeleteOutlined} from '@ant-design/icons'
import "./index.less"

const columns = [
  { title: '分类名称', dataIndex: 'name', key: 'name' },
  {
    title: '操作',
    width: 270,
    dataIndex: '',
    key: 'x',
    render: () => (
      <>
        <Tooltip placement="top" title={"编辑"}>
          <Button type={"primary"} size={"large"} style={{width: 50, height: 36, fontSize: 16, marginRight: 20}} icon={<FormOutlined />}/>
        </Tooltip>
        <Tooltip placement="top" title={"删除"}>
          <Button type={"danger"} size={"large"} style={{width: 50, height: 36, fontSize: 16,}} icon={<DeleteOutlined />}/>
        </Tooltip>
      </>
    ),
  },
];

const data = [
  {
    key: 1,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  },
  {
    key: 3,
    name: 'Not Expandable',
    age: 29,
    address: 'Jiangsu No. 1 Lake Park',
    description: 'This not expandable',
  },
  {
    key: 4,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
  },
];

export default class Subject extends Component {
  render() {
    return (
      <div style={{background: "#fff"}}>
        <div>
          <Button  className={'subject-btn'} size={'large'} type="primary" icon={<PlusOutlined />} style={{height: 40}}>
            新建
          </Button>
          <Table
            columns={columns}
            expandable={{
              expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
              rowExpandable: record => record.name !== 'Not Expandable',
            }}
            dataSource={data}
          />
        </div>
      </div>
    )
  }
}
