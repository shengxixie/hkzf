import React, { Component } from 'react'
import { Carousel, Flex } from 'antd-mobile';
import { getSwiper, getRentHouseGroup, getRentHouseNews } from '../../api'

import './index.scss'
import nav1 from '../../assets/images/nav-1.png'
import nav2 from '../../assets/images/nav-2.png'
import nav3 from '../../assets/images/nav-3.png'
import nav4 from '../../assets/images/nav-4.png'

const navData = [
    { imgSrc: nav1, title: '整租', path: '/home/house' },
    { imgSrc: nav2, title: '合租', path: '/home/house' },
    { imgSrc: nav3, title: '地图找房', path: '/map' },
    { imgSrc: nav4, title: '去出租', path: '/login' }
]
export default class Index extends Component {
    state = {
        swiperImgs: [],
        imgHeight: 212,
        groupData: [],
        news: []
    }
    componentDidMount() {
        this.getSwiper()
        this.getRentHouseGroup()
        this.getRentHouseNews()
    }
    handleJump(path) {
        this.props.history.push(path)
    }
    async getSwiper() {
        const { data: { body } } = await getSwiper()
        this.setState({ swiperImgs: body })
    }
    async getRentHouseGroup() {
        const { data: { body } } = await getRentHouseGroup()
        this.setState({ groupData: body })
    }
    async getRentHouseNews() {
        const { data: { body } } = await getRentHouseNews()
        this.setState({ news: body })
    }
    renderSwiper() {
        const { swiperImgs } = this.state
        if (swiperImgs.length) {
            return <div className='swiper-wrapper'>
                <Flex className='search-wrapper' align='center'>
                    <Flex className='search' align='center'>
                        <div className='location'>
                            广州<i className='iconfont icon-arrow' />
                        </div>
                        <div className='searchbar'>
                            <i className='iconfont icon-seach' />请输入小区或地址
                        </div>
                    </Flex>
                    <i className='iconfont icon-map' />
                </Flex>
                <Carousel
                    autoplay
                    infinite
                    autoplayInterval={1000}
                    className='swiper'
                >
                    {this.state.swiperImgs.map(val => (
                        <div key={val.id}>
                            <a href="#">
                                <img src={`http://localhost:8080${val.imgSrc}`} alt="" />
                            </a>
                        </div>
                    ))}
                </Carousel>
            </div>

        }
        return null
    }
    renderGroup() {
        return <Flex justify='between' wrap='wrap' className='content' alignContent='between'>
            {this.state.groupData.map(item =>
                <Flex justify='between' className='rent-item' key={item.id} >
                    <div>
                        <h5>{item.title}</h5>
                        {item.desc}
                    </div>
                    <img src={`http://localhost:8080${item.imgSrc}`} alt='' />
                </Flex>
            )}
        </Flex>
    }
    renderNews() {
        return this.state.news.map(item =>
            <Flex key={item.id} justify='between' className='news-item'>
                <img src={`http://localhost:8080${item.imgSrc}`} alt='' />
                <Flex direction='column' justify='between' className='content'>
                    <h5>{item.title}</h5>
                    <Flex justify='between' className='info'>
                        <span>{item.from}</span>
                        <span>{item.date}</span>
                    </Flex>
                </Flex>
            </Flex>
        )
    }
    render() {
        return (
            <div className='index'>
                <div>
                    {this.renderSwiper()}
                </div>
                <Flex justify='around' className='nav'>
                    {navData.map((item, index) =>
                        <Flex.Item key={index} onClick={this.handleJump.bind(this, item.path)}>
                            <img src={item.imgSrc} alt='' />
                            <p>{item.title}</p>
                        </Flex.Item>)}
                </Flex>
                <div className='rent-house-group'>
                    <Flex justify='between' className='rent-house-title'>
                        <h4>租房小组</h4> <span>更多</span>
                    </Flex>
                    {this.renderGroup()}
                </div>
                <div className='news'>
                    <h4>最新资讯</h4>
                    {this.renderNews()}
                </div>
            </div>
        )
    }
}
