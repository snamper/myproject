import request from 'common/js/request'

export function getRechargeList(params) {
    return request({
        url: '/api/Recharge/index',
        method: 'get',
        params
    })
}

export function postRecharge(params) {
    return request({
        url: '/api/Recharge/add',
        method: 'post',
        data: params
    })
}
