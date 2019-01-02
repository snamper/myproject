import request from 'common/js/request'

export function getShareInfo(params) {
    return request({
        url: '/api/Wecatticket/getWxConfig',
        method: 'get',
        params
    })
}
