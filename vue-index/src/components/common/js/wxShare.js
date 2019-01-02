import {getShareInfo} from 'api/wxShare'
import wx from 'weixin-js-sdk'

export default function wxShare(title, desc, imgUrl) {
    const href = location.href.split('#/')[0]
    const url = location.href.replace('#/', '&href=')
    getShareInfo({url: href}).then((res) => {
        title = title || res.msg.title
        desc = desc || res.msg.desc
        imgUrl = imgUrl || process.env.CDN + res.msg.imgUrl
        wx.config({
            appId: res.data.appid,
            timestamp: res.data.timestamp + '',
            nonceStr: res.data.nonceStr,
            signature: res.data.sign,
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
            ]
        })

        wx.ready(() => {
            // const id = store.getters.user.id ? store.getters.user.id : 0
            wx.checkJsApi({
                jsApiList: [
                    'onMenuShareTimeline',//朋友圈
                    'onMenuShareAppMessage',//朋友
                ]
            })
            /*分享到朋友圈*/
            wx.onMenuShareTimeline({
                title: title, // 分享标题
                desc: desc, // 分享描述
                link: url, // 分享链接
                imgUrl: imgUrl, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            })
            /*分享给朋友*/
            wx.onMenuShareAppMessage({
                title: title, // 分享标题
                desc: desc, // 分享描述
                link: url, // 分享链接
                imgUrl: imgUrl, // 分享图标
                type: 'link', // 分享类型,music、video或link，不填默认为link
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                }
            })
        })
    })
}
