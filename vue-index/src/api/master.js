import request from 'common/js/request'

export function subRegInfo(params) {
    return request({
        url: '/api/Master/register1',
        method: 'post',
        data: params
    })
}

export function regComplete(params) {
    return request({
        url: '/api/Master/register2',
        method: 'post',
        data: params
    })
}

export function regStep(params) {
    return request({
        url: '/api/Master/getRegisterStep',
        method: 'get',
        params
    })
}

export function sendMsg(params) {
    return request({
        url: '/api/Sendcodes/sendMsg',
        method: 'post',
        data: params
    })
}

export function upLoadImg(params) {
    return request({
        url: '/api/Common/uploadImg',
        method: 'post',
        data: params
    })
}

export function getMasterInfo(params) {
    return request({
        url: '/api/Master/index',
        method: 'get',
        params
    })
}

export function editInfo(params) {
    return request({
        url: '/api/Master/editProfile',
        method: 'post',
        data: params
    })
}

