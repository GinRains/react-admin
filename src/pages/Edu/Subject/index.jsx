import React, { Component } from "react";

import {Button, Table, Tooltip} from 'antd'
import {connect} from 'react-redux'
import {PlusOutlined, FormOutlined, DeleteOutlined} from '@ant-design/icons'

import {getSubjectList, getSubjectListChild} from './redux'
import "./index.less"

const columns = [
  { title: '分类名称', dataIndex: 'title', key: 'title' },
  {
    title: '操作',
    width: 270,
    key: 'handle',
    render: () => (
      <>
        <Tooltip placement="top" title={"更新课程"}>
          <Button type={"primary"} size={"large"} style={{width: 50, height: 36, fontSize: 16, marginRight: 20}} icon={<FormOutlined />}/>
        </Tooltip>
        <Tooltip placement="top" title={"删除课程"}>
          <Button type={"danger"} size={"large"} style={{width: 50, height: 36, fontSize: 16,}} icon={<DeleteOutlined />}/>
        </Tooltip>
      </>
    ),
  },
];

@connect(state => ({subjectList: state.subjectList}), {getSubjectList, getSubjectListChild})
class Subject extends Component {
  componentDidMount() {
    this.props.getSubjectList(1, 3)
  }
  //处理页码跳转
  handleChange = (page, pageSize) => {
    this.props.getSubjectList(page, pageSize)
  }
  // 处理页数跳转
  handleShowSizeChange = (page, pageSize) => {
    page = 1
    this.props.getSubjectList(page, pageSize)
  }
  // 点击展开或者关闭时触发
  handleExpand = (expanded, record) => {
    if(expanded) {
      this.props.getSubjectListChild(record._id)
    }
  }

  render() {
    const {items, total} = this.props.subjectList

    return (
      <div style={{background: "#fff"}}>
        <div>
          <Button  className={'subject-btn'} size={'large'} type="primary" icon={<PlusOutlined />} style={{height: 40}}>
            新建
          </Button>
          <Table
            columns={columns}
            expandable={{
              onExpand: this.handleExpand
            }}
            dataSource={items}
            rowKey={'_id'}
            pagination={{
              total,
              defaultPageSize: 3,
              pageSizeOptions: ['3', '5', '10', '15'],
              showSizeChanger: true,
              showQuickJumper: true,
              onChange: this.handleChange,
              onShowSizeChange: this.handleShowSizeChange
            }}
          />
        </div>
      </div>
    )
  }
}

export default Subject
