import React, { Component } from 'react'
import { Carousel } from 'antd-mobile';
import { getSwiper } from '../../api'
export default class Index extends Component {
    state = {
        swiperImgs: [],
        imgHeight: 212,
    }
    async componentDidMount() {
        const result = await getSwiper()
        this.setState({ swiperImgs: result.data.body })
    }
    render() {
        return (
            <div>
                {this.state.swiperImgs.length ? <Carousel
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
                                style={{ width: '100%', verticalAlign: 'top' }}
                            />
                        </a>
                    ))}
                </Carousel> : null}
            </div>
        )
    }
}
