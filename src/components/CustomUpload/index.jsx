import {Button, Upload} from 'antd'
import {UploadOutlined} from '@ant-design/icons'
import React, {Component} from 'react';
import {nanoid} from 'nanoid'
import * as qiniu from 'qiniu-js'
import {reqGetVideoToken} from "@api/edu/lesson"

class CustomUpload extends Component {
  constructor(props) {
    super(props);
    const videoTokenStr = localStorage.getItem("VIDEO_TOKEN_KEY")
    if(!videoTokenStr) {
      return void 0
    }
    this.videoToken = JSON.parse(localStorage.getItem("VIDEO_TOKEN_KEY"))
  }

  // 限制视频大小，并获取token
  handleBeforeUpload = (file, fileList) => {
    const MAX_LIMIT = 5 * 1024 * 1024
    return new Promise(async (resolve, reject) => {
      if(file.size > MAX_LIMIT) {
        return reject()
      }

      // local上有video_token且未过期
      if(this.videoToken && Date.now() < this.videoToken.expireTime) {
        return resolve()
      }
      const res = await reqGetVideoToken()
      res.expireTime = Date.now() + (res.expires - 300) * 1000
      this.videoToken = res
      localStorage.setItem("VIDEO_TOKEN_KEY", JSON.stringify(res))
      resolve()
    })
  }
  // 发送视频到七牛云
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
      }
    }
    const key = nanoid(10)
    const token = this.videoToken.uploadToken
    const config = { region: qiniu.region.z2 };
    const putExtra = { mimeType: "video/*", };

    const observable = qiniu.upload(file, key, token, putExtra, config)
    const subscription = observable.subscribe(observer) // 上传开始
    this.unsubscribe = subscription.unsubscribe // 上传取消
  }
  handleRemove = () => {
    this.props.onChange("")
  }
  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe()
  }

  render() {
    return (
      <Upload
        beforeUpload={this.handleBeforeUpload}
        onRemove={this.handleRemove}
        customRequest={this.handlePass}>
        <Button>
          <UploadOutlined /> 点击上传
        </Button>
      </Upload>
    );
  }
}

export default CustomUpload;

