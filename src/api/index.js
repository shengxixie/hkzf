import request from '../utils/request.js'

export function getSwiper() {
    return request({
        url: '/home/swiper'
    })
}