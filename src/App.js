import React, { Component } from 'react'
import { Route, HashRouter as Router, Redirect, Switch } from 'react-router-dom'
// import { Button } from 'antd-mobile'
import Home from './pages/Home'
import CityList from './pages/CityList'
import Map from './pages/Map'
import NotFound from './pages/NotFound'
import './assets/fonts/iconfont.css'
export default class App extends Component {
  render() {
    return (
      <div className='app-wrapper'>
        {/* <Button type='primary'>按钮</Button> */}
        <Router>
          <Switch>
            <Route path='/' exact render={() => <Redirect to='/home' />} />
            <Route path='/home' component={Home} />
            <Route path='/citylist' component={CityList} />
            <Route path='/map' component={Map} />
            <Route path='*' component={NotFound} />
          </Switch>
        </Router>
      </div>
    )
  }
}
