import request from '../utils/request.js'

export function getSwiper() {
    return request({
        url: '/home/swiper'
    })
}

export function getRentHouseGroup() {
    return request({
        url: '/home/groups',
        params: {
            area: '88cff55c-aaa4-e2e0'
        }
    })
}

export function getRentHouseNews() {
    return request({
        url: '/home/news',
        params: {
            area: '88cff55c-aaa4-e2e0'
        }
    })
}
