import request from '../utils/request.js'

export function getSwiper() {
    return request({
        url: '/home/swiper'
    })
}

export function getRentHouseGroup(area) {
    return request({
        url: '/home/groups',
        params: {
            area
        }
    })
}

export function getRentHouseNews(area) {
    return request({
        url: '/home/news',
        params: {
            area
        }
    })
}

export function getCityInfo(city) {
    return request({
        url: '/area/info',
        params: { name: city }
    })
}

export function getCityList() {
    return request({
        url: '/area/city',
        params: { level: 1 }
    })
}

export function getHotCity() {
    return request({
        url: '/area/hot'
    })
}