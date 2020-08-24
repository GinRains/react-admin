import React, { useState, useEffect } from "react";
import { Form, Input, Select, Cascader, Button } from "antd";
import {connect} from 'react-redux'
import {FormattedMessage, useIntl} from 'react-intl'

import {reqGetAllSubject, reqGetSubjectChild} from "@api/edu/subject";
import {reqGetAllTeacherList} from "@api/edu/teacher";
import {getAllCourseList} from '../redux'
import "./index.less";

const { Option } = Select;

function SearchForm(props) {
  const [form] = Form.useForm();
  const intl = useIntl()
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

  function onFinish() {
    props.getAllCourseList()
  }

  return (
    <Form layout="inline" form={form} onFinish={onFinish}>
      <Form.Item name="title" label={<FormattedMessage id={'title'}/>}>
        <Input placeholder={intl.formatMessage({
          id: "subjectTitle"
        })} style={{ width: 250, marginRight: 20 }} />
      </Form.Item>
      <Form.Item name="teacherId" label={<FormattedMessage id={'teacher'}/>}>
        <Select
          allowClear
          placeholder={intl.formatMessage({
            id: "subjectTeacher"
          })}
          style={{ width: 250, marginRight: 20 }}>
          {teacherList.map(item => (
            <Option key={item._id} value={item._id}>{item.name}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="subject" label={<FormattedMessage id={'category'}/>}>
        <Cascader
          style={{ width: 250, marginRight: 20 }}
          options={options}
          loadData={loadData}
          onChange={onChange}
          changeOnSelect
          placeholder={intl.formatMessage({
            id: "subjectCategory"
          })}/>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ margin: "0 10px 0 30px" }}>
          <FormattedMessage id={'searchBtn'}/>
        </Button>
        <Button onClick={resetForm}><FormattedMessage id={'resetBtn'}/></Button>
      </Form.Item>
    </Form>
  );
}

export default connect(null, {getAllCourseList})(SearchForm);
