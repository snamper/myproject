import request from 'common/js/request'

export function getFindList(params) {
    return request({
        url: '/api/News/index',
        method: 'get',
        params
    })
}

export function getDetail(params) {
    return request({
        url: '/api/News/detail',
        method: 'get',
        params
    })
}
