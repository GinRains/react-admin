import React, {useEffect} from "react";
import {connect} from 'react-redux'
import { Form, Select, Button } from "antd";

import {getAllCourse, getChapterInfo} from '../redux'
import "./index.less";

const { Option } = Select;

function SearchForm(props) {
  const [form] = Form.useForm();
  let page = 1,
    limit = 3

  const resetForm = () => {
    form.resetFields();
  };
  useEffect(() => {
    props.getAllCourse()
  }, [])
  // 查询列表
  function handleSubmit(form) {
    props.getChapterInfo(page, limit, form.courseId)
  }

  return (
    <Form layout="inline" form={form} onFinish={handleSubmit}>
      <Form.Item name="courseId" label="课程">
        <Select
          allowClear
          placeholder="课程"
          style={{ width: 250, marginRight: 20 }}>
          {props.allChapterList.map(item => <Option key={item._id} value={item._id}>{item.title}</Option>)}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ margin: "0 10px 0 30px" }}>
          查询课程章节
        </Button>
        <Button onClick={resetForm}>重置</Button>
      </Form.Item>
    </Form>
  );
}

export default connect(state => ({allChapterList: state.chapter.allChapterList}), {getAllCourse, getChapterInfo})(SearchForm);
