import {Button, Upload} from 'antd'
import {UploadOutlined} from '@ant-design/icons'
import React, {Component} from 'react';
import * as qiniu from 'qiniu-js'
import { nanoid } from 'nanoid'

import {reqGetUploadToken} from '@api/edu/lesson'

class CustomUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowUpload: true
    }

    const videoToken = localStorage.getItem("VIDEO_TOKEN_KEY")
    if(!videoToken) {
      return void 0
    }

    this.videoToken = JSON.parse(localStorage.getItem("VIDEO_TOKEN_KEY"))
  }

  handleBeforeUpload = (file, fileList) => {
    const MAX_LIMIT = 5 * 1024 * 1024
    return new Promise(async (resolve, reject) => {
      if(file.size > MAX_LIMIT) {
        return reject()
      }

      const videoToken = this.videoToken
      // 第二次发送请求，且有效时间未过期
      if(videoToken && videoToken.expires && videoToken.expireTime > Date.now()) {
        return resolve()
      }
      const res = await reqGetUploadToken()
      res.expireTime = Date.now() + (res.expires - 300) * 1000
      this.videoToken = res // 第一次需存入组件实例
      localStorage.setItem("VIDEO_TOKEN_KEY", JSON.stringify(res))
      resolve()
    })
  }
  handlePass = ({file, onProgress, onError, onSuccess}) => {
    const observer = {
      next(res){
        onProgress({percent: res.total.percent})
      },
      error(err){
        onError(err)
      },
      complete: (res) => {
        onSuccess(res)

        this.props.onChange(`http://qfeie8vm8.hn-bkt.clouddn.com/${res.key}`)
        this.setState({
          isShowUpload: false
        })
      }
    }
    const key = nanoid(10)
    const token = this.videoToken.uploadToken;
    const putExtra = { mimeType: "video/*" };
    const config = { region: qiniu.region.z2 };
    const observable = qiniu.upload(file, key, token, putExtra, config)
    const subscription = observable.subscribe(observer) // 开始上传
    this.unsubscribe = subscription.unsubscribe // 取消上传
  }
  handleRemove = () => {
    this.props.onChange("")
    this.setState({
      isShowUpload: true
    })
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe()
  }

  render() {
    return (
      <Upload
        accept={"video/*"}
        beforeUpload={this.handleBeforeUpload}
        customRequest={this.handlePass} onRemove={this.handleRemove}>
        {
          this.state.isShowUpload && (
            <Button>
              <UploadOutlined /> 点击上传
            </Button>
          )
        }
      </Upload>
    );
  }
}

export default CustomUpload;
