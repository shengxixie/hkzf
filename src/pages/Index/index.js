import React, { Component } from 'react'
import { Carousel, Flex } from 'antd-mobile';
import { getSwiper, getRentHouseGroup } from '../../api'

import './index.scss'
import nav1 from '../../assets/images/nav-1.png'
import nav2 from '../../assets/images/nav-2.png'
import nav3 from '../../assets/images/nav-3.png'
import nav4 from '../../assets/images/nav-4.png'

const navData = [
    { imgSrc: nav1, title: '整租' },
    { imgSrc: nav2, title: '合租' },
    { imgSrc: nav3, title: '地图找房' },
    { imgSrc: nav4, title: '去出租' }
]
export default class Index extends Component {
    state = {
        swiperImgs: [],
        imgHeight: 212,
        groupData: []
    }
    componentDidMount() {
        this.getSwiper()
        this.getRentHouseGroup()
    }
    async getSwiper() {
        const { data: { body } } = await getSwiper()
        this.setState({ swiperImgs: body })
    }
    async getRentHouseGroup() {
        const { data: { body } } = await getRentHouseGroup()
        this.setState({ groupData: body })
    }
    renderSwiper() {
        const { swiperImgs } = this.state
        if (swiperImgs.length) {
            return <Carousel
                autoplay
                infinite
                autoplayInterval={1000}
            >
                {this.state.swiperImgs.map(val => (
                    <a
                        key={val.id}
                        href="http://www.alipay.com"
                        style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                    >
                        <img
                            src={`http://localhost:8080${val.imgSrc}`}
                            alt=""
                            style={{ width: '100%', height: this.state.imgHeight, verticalAlign: 'top' }}
                        />
                    </a>
                ))}
            </Carousel>
        }
        return null
    }
    render() {
        return (
            <div className='index'>
                <div>
                    {this.renderSwiper()}
                </div>
                <Flex justify='around' className='nav'>
                    {navData.map((item, index) =>
                        <Flex.Item key={index}><img src={item.imgSrc} alt='' /><p>{item.title}</p></Flex.Item>)}
                </Flex>
                <div className='rent-house-group'>
                    <Flex justify='between' className='rent-house-title'>
                        <h4>租房小组</h4> <span>更多</span>
                    </Flex>
                    <Flex justify='between' wrap='wrap' className='content' alignContent='between'>
                        {this.state.groupData.map(item =>
                            <Flex justify='between' className='rent-item' key={item.id}>
                                <div>
                                    <h5>{item.title}</h5>
                                    {item.desc}
                                </div>
                                <img src={`http://localhost:8080${item.imgSrc}`} alt='' />
                            </Flex>
                        )}
                    </Flex>
                </div>
            </div>
        )
    }
}
