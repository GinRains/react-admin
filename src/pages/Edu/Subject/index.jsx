import React, { Component } from "react";

import {Button, Input, Table, Tooltip, message, Modal} from 'antd'
import {connect} from 'react-redux'
import {PlusOutlined, FormOutlined, DeleteOutlined, ExclamationCircleOutlined} from '@ant-design/icons'

import {getSubjectList, getSubjectListChild, updateSubject, deleteSubject} from './redux'
import "./index.less"

@connect(state => ({subjectList: state.subjectList}), {getSubjectList, getSubjectListChild, updateSubject, deleteSubject})
class Subject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentId: '',
      title: ''
    }
    this.page = 1
    this.limit = 3
  }

  componentDidMount() {
    this.props.getSubjectList(this.page, this.limit)
  }
  //处理页码跳转
  handleChange = (page, pageSize) => {
    this.page = page
    this.props.getSubjectList(page, pageSize)
  }
  // 处理页数跳转
  handleShowSizeChange = (page, pageSize) => {
    this.page = page
    this.props.getSubjectList(page, pageSize)
  }
  // 点击展开或者关闭时触发
  handleExpand = (expanded, record) => {
    if(expanded) {
      this.props.getSubjectListChild(record._id)
    }
  }
  // 跳转新增逻辑
  handleJumpAdd = () => {
    this.props.history.push('/edu/subject/add')
  }
  // 处理更新课程按钮
  handleUpdate = record => () => {
    this.setState({
      currentId: record._id,
      title: record.title
    })
  }
  // 处理更新菜单功能
  handleChangeValue = (e) => {
    this.setState({
      title: e.target.value
    })
  }
  // 更新确认
  handleUpdateConfirm = async () => {
    const {currentId: id, title} = this.state
    // 空串判断
    if(!title.trim()) {
      message.warning("输入有误，请重新输入！")
      return void 0
    }
    // 重名
    if(this.props.subjectList.items.some(item => item.title === title.trim())) {
      message.warning("该课程名重复，请重新输入！")
      return void 0
    }
    const res = await this.props.updateSubject(id, title)
    if(res.code === 200) {
      message.success("课程修改成功！")

      this.setState({
        title: '',
        currentId: ''
      })
    }
  }
  // 更新取消
  handleUpdateCancel = () => {
    this.setState({
      currentId: ''
    })
  }
  // 删除课程
  handleDelete = record => () => {
    const {confirm} = Modal
    const {deleteSubject, getSubjectList} = this.props

    confirm({
      title: `此操作将永久删除${record.title}课程，是否继续?`,
      icon: <ExclamationCircleOutlined />,
      content: '危险操作!',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async() => {
        // 优化用户体验
        const res = await deleteSubject(record._id)
        if(res.code === 200) {
          const {subjectList} = this.props
          message.success(`已删除${record.title}课程`)

          // 优化删除逻辑
          record.parentId === "0" && getSubjectList(this.page, this.limit)
          if(subjectList.items.length <= 0 && record.parentId === "0" && this.page > 1) {
            getSubjectList(--this.page, this.limit)
            return void 0
          }
        }
      },
      onCancel() {
        message.success("已取消操作")
      },
    });
  }

  render() {
    const {items, total} = this.props.subjectList,
      {currentId, title} = this.state,
      columns = [
      { title: '分类名称', key: 'title',
        render: record => {
          if(record._id === currentId) {
            return <Input autoFocus={true} style={{width: 250}} value={title} onChange={this.handleChangeValue}/>
          }
          return record.title
        }
      },
      {
        title: '操作',
        width: 270,
        key: 'handle',
        render: record => {
          if(currentId === record._id) {
            return (
              <>
                <Button style={{marginRight: 20}} type={"primary"} onClick={this.handleUpdateConfirm}>确认</Button>
                <Button onClick={this.handleUpdateCancel}>取消</Button>
              </>
            )
          }else {
            return (
              <>
                <Tooltip placement="top" title={"更新课程"}>
                  <Button type={"primary"} size={"large"}
                          style={{width: 50, height: 36, fontSize: 16, marginRight: 20}}
                          icon={<FormOutlined />} onClick={this.handleUpdate(record)}/>
                </Tooltip>
                <Tooltip placement="top" title={"删除课程"}>
                  <Button type={"danger"} size={"large"}
                          style={{width: 50, height: 36, fontSize: 16,}}
                          icon={<DeleteOutlined/>} onClick={this.handleDelete(record)}/>
                </Tooltip>
              </>
            )
          }
        },
      },
    ];

    return (
      <div style={{background: "#fff"}}>
        <div>
          <Button onClick={this.handleJumpAdd} className={'subject-btn'} size={'large'} type="primary" icon={<PlusOutlined />} style={{height: 40}}>
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
              current: this.page,
              defaultCurrent: 1,
              defaultPageSize: this.limit,
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
