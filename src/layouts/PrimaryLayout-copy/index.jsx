import React, { Component, Suspense } from 'react'
import { Layout, Breadcrumb } from 'antd'
import {
  GlobalOutlined,
} from '@ant-design/icons'
import {withRouter, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'

import SiderMenu from '../SiderMenu'
import logo from '@assets/images/logo.png'
import {defaultRoutes} from '@conf/routes'
import RouteList from '@conf/asyncComps'
import './index.less'

const { Header, Content, Footer, Sider } = Layout

@withRouter
@connect(state => ({user: state.user}))
class PrimaryLayout extends Component {
  state = {
    collapsed: false
  }

  onCollapse = collapsed => {
    this.setState({ collapsed })
  }

  renderRoute = (routes, path) => {
    return routes && routes.map(route => {
      const Comp = RouteList[route.component] && RouteList[route.component]()

      if(route.component) {
        return <Route path={path ? path + route.path : route.path} component={Comp} key={route.path} exact/>
      }
      if(route.children && route.children.length) {
        return this.renderRoute(route.children, route.path)
      }
    })
  }

  render() {
    const {name, avatar, permissionList} = this.props.user
    const {pathname} = this.props.location
    const pathnameArr = pathname.match(/\/[A-z]*/g)
    const firPathname = pathnameArr[0]
    const secPathname = pathnameArr[1]
    const thiPathname = pathnameArr[2] || ''
    let firName
    let secName
    permissionList && permissionList.forEach(item => {
      if(firPathname === item.path) {
        firName = item.name
        item.children.length && item.children.forEach(secItem => {
          if(secItem.path === secPathname + thiPathname) {
            secName = secItem.name
          }
        })
      }
    })

    return (
      <Layout className='layout'>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} >
          <div className='logo'>
            <img src={logo} alt='' />
            {!this.state.collapsed && <h1>硅谷教育管理系统</h1>}
          </div>
          <SiderMenu/>
        </Sider>
        <Layout className='site-layout'>
          <Header className='layout-header'>
            <img src={avatar} alt='' />
            <span>{name}</span>
            <GlobalOutlined />
          </Header>
          <Content>
            <div className='layout-nav' style={{marginBottom: 20}}>
              {!secPathname ? <div>首页</div> :
                (<Breadcrumb>
                  <Breadcrumb.Item>{firName}</Breadcrumb.Item>
                  <Breadcrumb.Item>{secName}</Breadcrumb.Item>
                </Breadcrumb>

                )}
              <h1 style={{marginTop: 10}}>{secName}</h1>
            </div>

            <Suspense fallback={<h1>正在加载中...</h1>}>
              <Switch>
                {this.renderRoute(defaultRoutes)}
                {this.renderRoute(permissionList)}
              </Switch>
            </Suspense>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default PrimaryLayout
