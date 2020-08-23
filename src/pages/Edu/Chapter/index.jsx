import React, { Component } from "react";
import Player from 'griffith'
import { Button, message, Tooltip, Modal, Alert, Table } from "antd";
import {
  FullscreenOutlined,
  RedoOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  FormOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";

import { connect } from "react-redux";
import SearchForm from "./SearchForm";
import {getLessonInfo, DelMoreChapter, DelMoreLesson} from './redux'

import "./index.less";

dayjs.extend(relativeTime);

@connect(
  (state) => ({
    chapterInfo: state.chapter.chapterInfo
  }),
  { getLessonInfo, DelMoreChapter, DelMoreLesson }
)
class Chapter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchLoading: false,
      previewVisible: false,
      previewImage: "",
      selectedRowKeys: [],
      play_url: ""
    };
  }


  showImgModal = (img) => {
    return () => {
      this.setState({
        previewVisible: true,
        previewImage: img,
      });
    };
  };

  handleImgModal = () => {
    this.setState({
      previewVisible: false,
    });
  };

  componentDidMount() {
    // const { page, limit } = this.state;
    // this.handleTableChange(page, limit);
  }

  handleTableChange = (page, limit) => {
    this.setState({
      tableLoading: true,
    });

    this.getcourseList({ page, limit }).finally(() => {
      this.setState({
        tableLoading: false,
        page,
        limit,
      });
    });
  };

  getcourseList = ({ page, limit, Coursename, nickName }) => {
    return this.props
      .getcourseList({ page, limit, Coursename, nickName })
      .then((total) => {
        if (total === 0) {
          message.warning("暂无用户列表数据");
          return;
        }
        message.success("获取用户列表数据成功");
      });
  };
  // 表格多选框处理
  onSelectChange = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys,
    });
  };
  // 渲染二级章节
  handleExpand = (isExpand, record) => {
    isExpand && this.props.getLessonInfo(record._id)
  }
  // 跳转新增课时页面
  jumpAddLesson = data => () => {
    this.props.history.push("/edu/chapter/addlesson", data._id)
  }
  // 视频预览
  handlePreview = video => () => {
    this.setState({
      previewVisible: true,
      play_url: video
    })
  }
  // 批量删除
  delMore = async () => {
    const selectedRowKeys = this.state.selectedRowKeys
    const chapterList = this.props.chapterInfo.items
    const chapterIdList = []

    chapterList.forEach(item => {
      if(selectedRowKeys.includes(item._id)) {
        chapterIdList.push(item._id)
      }
    })
    const lessonIdList = selectedRowKeys.filter(item => !chapterIdList.includes(item))

    const res_1 = await this.props.DelMoreChapter(chapterIdList)
    const res_2 = await this.props.DelMoreLesson(lessonIdList)
    if(res_1.code === 200 && res_2.code === 200) {
      message.success("批量删除成功")
    }
  }

  render() {
    const { previewVisible, previewImage, selectedRowKeys } = this.state,
      {items} = this.props.chapterInfo,
      columns = [
      {
        title: "章节名称",
        dataIndex: "title",
      },
      {
        title: "是否免费",
        dataIndex: "free",
        render: (isFree) => {
          return isFree === true ? "是" : isFree === false ? "否" : "";
        },
      },
      {
        title: "预览",
        render: (record) => {
          return record.free ? <Button onClick={this.handlePreview(record.video)}>视频预览</Button> : ""
        },
      },
      {
        title: "操作",
        width: 300,
        fixed: "right",
        render: (data) => {
          return (
            <div>
              <Tooltip title="新增课时">
                <Button type={"primary"} onClick={this.jumpAddLesson(data)}>
                  <PlusOutlined />
                </Button>
              </Tooltip>
              <Tooltip title="更新课时">
                <Button type="primary" style={{ margin: "0 10px" }}>
                  <FormOutlined />
                </Button>
              </Tooltip>
              <Tooltip title="删除课时">
                <Button type="danger">
                  <DeleteOutlined />
                </Button>
              </Tooltip>
            </div>
          );
        },
      },
    ],
      sources = {
        hd: {
          play_url: this.state.play_url,
          bitrate: 1,
          duration: 1000,
          format: '',
          height: 500,
          size: 160000,
          width: 500
        }
      },
      rowSelection = {
        selectedRowKeys,
        onChange: this.onSelectChange
    };

    return (
      <div>
        <div className="course-search">
          <SearchForm />
        </div>
        <div className="course-table">
          <div className="course-table-header">
            <h3>课程章节列表</h3>
            <div>
              <Tooltip title={"新增章节"}>
                <Button type="primary" style={{ marginRight: 10 }}>
                  <PlusOutlined />
                  <span>新增</span>
                </Button>
              </Tooltip>
              <Tooltip title={"批量删除章节"}>
                <Button type="danger" style={{ marginRight: 10 }} onClick={this.delMore}>
                  <span>批量删除</span>
                </Button>
              </Tooltip>
              <Tooltip title="全屏" className="course-table-btn">
                <FullscreenOutlined />
              </Tooltip>
              <Tooltip title="刷新" className="course-table-btn">
                <RedoOutlined />
              </Tooltip>
              <Tooltip title="设置" className="course-table-btn">
                <SettingOutlined />
              </Tooltip>
            </div>
          </div>
          <Alert
            message={
              <span>
                <InfoCircleOutlined
                  style={{ marginRight: 10, color: "#1890ff" }}/>
                {`已选择 ${selectedRowKeys.length} 项`}
              </span>
            }
            type="info"
            style={{ marginBottom: 20 }}/>
          <Table
            rowSelection={rowSelection}
            expandable={{onExpand: this.handleExpand}}
            columns={columns}
            dataSource={items}
            rowKey="_id"/>
        </div>

        <Modal
          title={"视频预览"}
          destroyOnClose={true}
          visible={previewVisible}
          footer={null}
          onCancel={this.handleImgModal}>
          <Player sources={sources} id={"playerId"}
                  cover={"http://localhost:3000/logo512.png"} duration={3000}/>
        </Modal>
      </div>
    );
  }
}

export default Chapter;
