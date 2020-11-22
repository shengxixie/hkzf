import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { TabBar } from 'antd-mobile';
import Index from '../Index'
import Profile from '../Profile'
import House from '../House'
import News from '../News'

import './home.css'

const tabBarData = [
    { title: '首页', icon: 'ind', path: '/home' },
    { title: '找房', icon: 'findHouse', path: '/home/house' },
    { title: '资讯', icon: 'infom', path: '/home/news' },
    { title: '我的', icon: 'my', path: '/home/my' },
]
export default class Home extends Component {
    render() {
        return (
            <div className='home'>
                <Route path='/home' exact component={Index} />
                <Route path='/home/house' component={House} />
                <Route path='/home/my' component={Profile} />
                <Route path='/home/news' component={News} />

                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#21b97a"
                    barTintColor="white"
                    noRenderContent
                >
                    {tabBarData.map((item, index) => (
                        <TabBar.Item
                            title={item.title}
                            key={item.path}
                            icon={<i className={`iconfont icon-${item.icon}`} />}
                            selectedIcon={<i className={`iconfont icon-${item.icon}`} />}
                            selected={this.props.location.pathname === item.path}
                            onPress={() => {
                                this.props.history.push(item.path)
                            }}
                        />
                    ))}
                </TabBar>
            </div>

        )
    }
}
