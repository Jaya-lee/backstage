import React, { Component } from 'react';
import { Menu, Icon } from 'antd';

import '../css/main.css'

import store from '../redux/store'
import {Provider} from 'react-redux'

import Add from './Add'

const SubMenu = Menu.SubMenu;

class App extends Component {
  state = {
    current: '1',
    openKeys: [],
  }
  handleClick (e){
    this.setState({ current: e.key })
  }
  onOpenChange = (openKeys) => {
    const state = this.state;
    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    this.setState({ openKeys: nextOpenKeys });
  }
  getAncestorKeys = (key) => {
    const map = {
      sub3: ['sub2'],
    };
    return map[key] || [];
  }
  render() {
    let shops=store.getState()
    return (
      <Provider store={store}>
      <div className='back'>
        <Menu className='aside'
          mode="inline"
          openKeys={this.state.openKeys}
          selectedKeys={[this.state.current]}
          onOpenChange={this.onOpenChange}
          onClick={this.handleClick.bind(this)}
        >
          <SubMenu key="sub1" title={
            <span>
              <Icon type="mail" />
              <span>商铺信息</span>
            </span>}>
            {shops.map(item =>
                <Menu.Item key={item.id}>{item.title}</Menu.Item>
            )}

          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
              <Menu.Item key="5">Option 5</Menu.Item>
              <Menu.Item key="6">Option 6</Menu.Item>
              <SubMenu key="sub3" title="Submenu">
                <Menu.Item key="7">Option 7</Menu.Item>
                <Menu.Item key="8">Option 8</Menu.Item>
              </SubMenu>
          </SubMenu>
          <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Navigation Three</span></span>}>
              <Menu.Item key="9">Option 9</Menu.Item>
              <Menu.Item key="10">Option 10</Menu.Item>
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
        </Menu>
        <div className='article'>
          <div className='top'>
            {shops.filter(item => item.id===this.state.current)[0].title}
          </div>
          <Add/>
        </div>
      </div>
    </Provider>
    )
  }
}

export default App
