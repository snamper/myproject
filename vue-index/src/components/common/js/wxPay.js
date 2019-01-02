export function WxPay(params, type, vue) {
    const $this = this
    this.onBridgeReady = function (data) {
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
                "appId": data.appId, //公众号名称，由商户传入
                "timeStamp": data.timeStamp + '', //时间戳，自1970年以来的秒数
                "nonceStr": data.nonceStr, //随机串
                "package": data.package,
                "signType": data.signType, //微信签名方式：
                "paySign": data.paySign, //微信签名
                //这里的信息从后台返回的接口获得。
                jsApiList: [
                    'chooseWXPay'
                ]
            },
            function (res) {
                // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                if (res.err_msg === "get_brand_wcpay_request:ok") {
                    vue.$toast('微信支付成功')
                    if (type == 1) {
                        setTimeout(function () {
                            vue.$router.push('/member')
                        }, 2000)
                    } else {
                        setTimeout(function () {
                            vue.$router.back()
                        }, 2000)
                    }
                }
                if (res.err_msg === "get_brand_wcpay_request:cancel") {
                    vue.$toast('微信支付失败')
                    if (type == 1) {
                        setTimeout(function () {
                            vue.$router.push('/member')
                        }, 2000)
                    }
                }
                if (res.err_msg === "get_brand_wcpay_request:fail") {
                    vue.$toast('微信支付失败')
                    if (type == 1) {
                        setTimeout(function () {
                            vue.$router.push('/member')
                        }, 2000)
                    }
                }
            }
        )
    }
    this.pay = function () {
        if (typeof WeixinJSBridge === "undefined") { //微信浏览器内置对象。参考微信官方文档
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', $this.onBridgeReady(params), false)
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', $this.onBridgeReady(params))
                document.attachEvent('onWeixinJSBridgeReady', $this.onBridgeReady(params))
            }
        } else {
            $this.onBridgeReady(params)
        }
    }
}
