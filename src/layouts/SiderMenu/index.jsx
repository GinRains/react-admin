import React, {Component} from 'react';
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {Menu} from "antd";

import icons from '@conf/icons'
import {defaultRoutes} from '@conf/routes'

const { SubMenu } = Menu

@withRouter
@connect(state => ({permissionList: state.user.permissionList}))
class SiderMenu extends Component {
  renderMenu = (routes) => {
    return routes && routes.map(route => {
      if(route.hidden) return void 0

      const Icon = icons[route.icon]
      if(route.children && route.children.length) {
        return (
          <SubMenu key={route.path} icon={<Icon />} title={route.name}>
            {route.children.map(secItem => {
              if(secItem.hidden) return void 0
              return (
                <Menu.Item key={`${route.path}${secItem.path}`}>
                  <Link to={`${route.path}${secItem.path}`}>{secItem.name}</Link>
                </Menu.Item>
              )
            })}
          </SubMenu>
        )
      }else {
        return (
          <Menu.Item key={route.path} icon={<Icon />}>
            <Link to={route.path}>{route.name}</Link>
            {/*{route.path === '/' ? <Link to={route.path}>{route.name}</Link> : route.name}*/}
          </Menu.Item>
        )
      }
    })
  }

  render() {
    const routeActive = this.props.location.pathname
    const openKeyArr = routeActive.match(/\/[A-z]+/)
    const openKey = openKeyArr && openKeyArr[0]
    return (
      <div>
        <Menu theme='dark' defaultSelectedKeys={[routeActive]} defaultOpenKeys={[openKey]} mode='inline'>
          {this.renderMenu(defaultRoutes)}
          {this.renderMenu(this.props.permissionList)}
        </Menu>
      </div>
    );
  }
}

export default SiderMenu;
