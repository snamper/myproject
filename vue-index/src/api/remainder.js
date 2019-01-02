import request from 'common/js/request'

export function getMoneyList(params) {
    return request({
        url: '/api/User/moneyList',
        method: 'get',
        params
    })
}
