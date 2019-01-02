import request from 'common/js/request'

//添加地址
export function addAddress(params) {
    return request({
        url: '/api/Address/addAddress',
        method: 'post',
        data: params
    })
}

//获取地址列表
export function getAddressList(params) {
    return request({
        url: '/api/Address/index',
        method: 'get',
        params
    })
}

//设为默认地址
export function setDefault(params) {
    return request({
        url: '/api/Address/setDefault',
        method: 'post',
        data: params
    })
}

//详细地址
export function getAddressDetail(params) {
    return request({
        url: '/api/Address/getAddressDetail',
        method: 'get',
        params
    })
}

//删除地址
export function delAddress(params) {
    return request({
        url: '/api/Address/deleteAddress',
        method: 'post',
        data: params
    })
}
