import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Row, Col, Tabs } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MobileOutlined,
  MailOutlined,
  GithubOutlined,
  WechatOutlined,
  QqOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {reqGetVerifyCode} from "@api/acl/oath";
import { login, mobileLogin } from "@redux/actions/login";
import "./index.less";

const { TabPane } = Tabs;
const validator = (rule, value) => {
  const pwd = value && value.trim()
  return new Promise((resolve, reject) => {
    if(!pwd) {
      return reject("请输入密码！")
    }
    if(pwd.length < 6) {
      return reject("密码长度最短为6位")
    }
    if(pwd.length > 16) {
      return reject("密码最长为16")
    }
    if(/^\w+&/.test(pwd)) {
      return reject("请输入合法的密码")
    }

    return resolve()
  })
}

// 存储Tab标签页key
let tabFlag = 'user'
// 存储自动登录是否选中
let isChecked = true
function LoginForm (props) {
  // 可以看出函数组将只要更新了setState中的数据，整个函数组件都会重新执行
  // console.log(tabFlag)
  const [form] = Form.useForm()
  let [countDown, setCountDown] = useState(5)
  const [isShowCount, setIsShowCount] = useState(false)
  const onFinish = () => {
    if(tabFlag === 'user') {
      form.validateFields(["username", "password"])
        .then(res => {
          const {username, password} = res
          props.login(username, password).then((token) => {
            isChecked && localStorage.setItem("user_token", token);
            props.history.replace("/");
          })
          .catch(() => {});
        })
    }else {
      form.validateFields(["phone", "verify"])
        .then(res => {
          const {phone, verify} = res
          props.mobileLogin(phone, verify).then((token) => {
            isChecked && localStorage.setItem("user_token", token);
            props.history.replace("/");
          })
            .catch(() => {});
        })
    }
  };
  const getVerifyCode = () => {
    // validateFields(["phone"]) 表示只针对 phone 字段校验规则
    form.validateFields(["phone"])
      .then(async res => {
        await reqGetVerifyCode(res.phone)
        setIsShowCount(true)

        const timerId = setInterval(() => {
          setCountDown(--countDown)

          if(countDown < 1) {
            clearInterval(timerId)
            setCountDown(5)
            setIsShowCount(false)
          }
        }, 1000)
      })
      .catch(() => {})
  }
  // tab标签切换时触发
  const onChange = (key) => {
    tabFlag = key
  }
  // 自动登录是否选中
  const changeCheckbox = (event) => {
    isChecked = event.target.checked
  }
  // git 第三方登录
  const gitLogin = () => {
    window.location.href = 'https://github.com/login/oauth/authorize?client_id=ee65c2754273658e517d'
  }

  return (
    <>
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
      >
        <Tabs
          defaultActiveKey="user"
          tabBarStyle={{ display: "flex", justifyContent: "center" }}
          onChange={onChange}
        >
          <TabPane tab="账户密码登陆" key="user">
            <Form.Item name="username" rules={[
              {
                required: true,
                message: "请输入用户名"
              },
              {
                min: 4,
                message: "用户名长度最短为4"
              },
              {
                max: 16,
                message: "用户名长度最长为16"
              },
              {
                pattern: /^\w+$/,
                message: "用户名不合法"
              }
            ]}>
              <Input
                prefix={<UserOutlined className="form-icon" />}
                placeholder="用户名: admin"
              />
            </Form.Item>
            <Form.Item name="password" rules={[
              {validator}
            ]}>
              <Input
                prefix={<LockOutlined className="form-icon" />}
                type="password"
                placeholder="密码: 111111"
              />
            </Form.Item>
          </TabPane>
          <TabPane tab="手机号登陆" key="phone">
            <Form.Item name="phone" rules={[
              {
                required: true,
                message: "请输入手机号"
              },
              {
                pattern: /^1\d{10}$/,
                message: "请输入合法的手机号"
              }
            ]}>
              <Input
                prefix={<MobileOutlined className="form-icon" />}
                placeholder="手机号"
              />
            </Form.Item>

            <Row justify="space-between">
              <Col span={16}>
                <Form.Item name="verify" rules={[
                  {
                    required: true,
                    message: "请输入验证码"
                  },
                  {
                    pattern: /^[\d]{6}$/,
                    message: "请输入有效的验证码"
                  }
                ]}>
                  <Input
                    prefix={<MailOutlined className="form-icon" />}
                    placeholder="验证码"
                  />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Button className="verify-btn" onClick={getVerifyCode} disabled={isShowCount}>
                  {isShowCount ? `${countDown}s后再获取` : "获取验证码"}
                </Button>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
        <Row justify="space-between">
          <Col span={7}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox onChange={changeCheckbox} checked={isChecked}>自动登陆</Checkbox>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Button type="link">忘记密码</Button>
          </Col>
        </Row>
        <Form.Item>
          <Button
            type="primary"
            onClick={onFinish}
            className="login-form-button"
          >
            登陆
          </Button>
        </Form.Item>
        <Form.Item>
          <Row justify="space-between">
            <Col span={16}>
              <span>
                其他登陆方式
                <GithubOutlined className="login-icon" onClick={gitLogin} />
                <WechatOutlined className="login-icon" />
                <QqOutlined className="login-icon" />
              </span>
            </Col>
            <Col span={3}>
              <Button type="link">注册</Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </>
  );
}

export default withRouter(connect(null, {login, mobileLogin})(LoginForm));
