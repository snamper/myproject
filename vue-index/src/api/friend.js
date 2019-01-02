import request from 'common/js/request'

export function getMyTeam(params) {
    return request({
        url: '/api/User/myTeam',
        method: 'get',
        params
    })
}
