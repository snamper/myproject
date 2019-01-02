import request from 'common/js/request'

export function getQrCode(params) {
    return request({
        url: '/api/Wecatticket/wxQrCode',
        method: 'get',
        params
    })
}
