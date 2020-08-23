import React, { useState, useEffect } from "react";
import { Form, Input, Select, Cascader, Button } from "antd";

import {reqGetAllSubject, reqGetSubjectChild} from "@api/edu/subject";
import {reqGetAllTeacherList} from "@api/edu/teacher";
import "./index.less";

const { Option } = Select;

function SearchForm() {
  const [form] = Form.useForm();
  const [subjectList, setSubjectList] = useState([])
  const [teacherList, setTeacherList] = useState([])
  const [options, setOptions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const [subject, teacher] = await Promise.all([reqGetAllSubject(), reqGetAllTeacherList()])
      const options = subject.map(item => ({value: item._id, label: item.title, isLeaf: false}))

      setOptions(options)
      setSubjectList(subject)
      setTeacherList(teacher)
    }
    fetchData()
  }, [])
  const onChange = (value, selectedOptions) => {

  };

  const loadData = async selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    const res = await reqGetSubjectChild(targetOption.value)
    targetOption.loading = false
    if(res.items.length) {
      targetOption.children = res.items.map(item => (
        {value: item._id, label: item.title}
        ))
    }else {
      targetOption.isLeaf = true
    }

    setOptions([...options]);
  };

  const resetForm = () => {
    form.resetFields();
  };

  return (
    <Form layout="inline" form={form}>
      <Form.Item name="title" label="标题">
        <Input placeholder="课程标题" style={{ width: 250, marginRight: 20 }} />
      </Form.Item>
      <Form.Item name="teacherId" label="讲师">
        <Select
          allowClear
          placeholder="课程讲师"
          style={{ width: 250, marginRight: 20 }}
        >
          {teacherList.map(item => (
            <Option key={item._id} value={item._id}>{item.name}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="subject" label="分类">
        <Cascader
          style={{ width: 250, marginRight: 20 }}
          options={options}
          loadData={loadData}
          onChange={onChange}
          changeOnSelect
          placeholder="课程分类"
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ margin: "0 10px 0 30px" }}
        >
          查询
        </Button>
        <Button onClick={resetForm}>重置</Button>
      </Form.Item>
    </Form>
  );
}

export default SearchForm;
