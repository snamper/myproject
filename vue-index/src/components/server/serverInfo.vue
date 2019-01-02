<template>
    <div id="serverInfo">
        <div class="address">
            <div class="address_box" @click="toAddress">
                <i class="van-icon address_icon">&#xe6b3;</i>
                <div class="address_info">
                    <div class="user_info">
                        <span>默认</span>
                        <p>
                            <span>收货人：{{addressInfo.name}}</span>
                            <span>{{addressInfo.tel}}</span>
                        </p>
                    </div>
                    <p class="address_details">
                        {{addressInfo.address}}
                    </p>
                </div>
                <van-icon name="arrow" class="chose_icon"></van-icon>
            </div>
        </div>
        <van-cell title="预约时间" is-link class="choose-time" @click="show=true" :value="timeStr"/>
        <van-popup v-model="show" position="bottom" :overlay="true">
            <van-datetime-picker
                v-model="currentDate"
                type="datetime"
                :min-date="minDate"
                :max-date="maxDate"
                @confirm="choseTime"
                @cancel="nothing"
            />
        </van-popup>
        <div class="remark">
            <textarea name="" id="" cols="30" rows="10" placeholder="请输入备注内容" v-model="remarkText"></textarea>
            <div class="up-img">
                <div class="upbox img-box" v-for="(item,index) in imgs" :key="index">
                    <img :src="cdn+item" alt="">
                </div>
                <van-uploader :after-read="onRead" class="upbox">
                    <p>
                        <van-icon name="tupian" class="up-icon"/>
                        上传图片
                    </p>
                </van-uploader>
            </div>
            <p class="re-dec">注：照片有助于师傅了解更多维修信息</p>
        </div>
        <div class="btns">
            <button class="back-btn" @click="back">上一级</button>
            <button class="buy-btn" @click="nowMake">立即预约</button>
        </div>
    </div>
</template>

<script>
    import {Icon, Popup, DatetimePicker, Cell, Uploader} from 'vant'
    import {getAddressList} from '@/api/address'
    import request from '@/components/common/js/request'

    export default {
        name: "serverInfo",
        components: {
            [Icon.name]: Icon,
            [Popup.name]: Popup,
            [DatetimePicker.name]: DatetimePicker,
            [Cell.name]: Cell,
            [Uploader.name]: Uploader,
        },
        data() {
            return {
                cdn: process.env.CDN,
                addressInfo: { //服务地址
                    name: '21',
                    tel: '13212345678',
                    address: 'asdasdasdasd',
                },
                show: false,
                minHour: 10,
                maxHour: 20,
                minDate: new Date(),
                maxDate: new Date(2019, 10, 1),
                currentDate: new Date(),
                timeStr: '',
                remarkText: '',//备注
                imgs: [],
                token: ''
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.getAddress()
                this.getToken()
            })
        },
        methods: {
            getAddress() {
                getAddressList().then(res => {
                    var count = 0
                    var _this = this
                    res.data.forEach(function (v) {
                        if (v.is_default) {
                            _this.addressInfo = v
                        } else {
                            count++
                        }
                        if (count >= res.data.length) {
                            _this.addressInfo = res.data[0]
                        }
                    })
                })
            },
            getToken() {
                //先获取token
                request({
                    url: '/api/Order/getToken',
                    method: 'get',
                }).then(res => {
                    if (res.status == 1) {
                        this.token = res.data.__token__
                    }
                })
            },
            toAddress() {
                this.$router.push('/addressList?type=' + 1)
            },
            back() {
                this.$router.back()
            },
            onRead(file) {
                var formD = new FormData()
                formD.append("files", file.file)
                request({
                    url: "/api/Common/uploadImg",
                    method: "post",
                    data: formD,
                }).then(res => {
                    if (res.status == 1) {
                        this.imgs.push(res.data)
                    }
                })
            },
            //确认选择日期
            choseTime(value) {
                this.timeStr =
                    value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate() + ' ' + value.getHours() + ":" +
                    (value.getMinutes() < 10 ? '0' + value.getMinutes() : value.getMinutes()) + ':00'
                this.show = false
            },
            //选择日期取消
            nothing() {
                this.show = false
            },
            //立即预约
            nowMake() {
                var params = {
                    address_id: this.addressInfo.id,
                    time: this.timeStr,
                    memo: this.remarkText,
                    product_id: this.$route.query.id,
                    imgs: this.imgs,
                    __token__: this.token
                }
                if (params.address_id == '' || params.time == '' || params.memo == '' || params.product_id == "" || params.imgs.length <= 0) {
                    this.$toast('请输入完整信息')
                    return
                } else {
                    request({
                        url: '/api/Order/makeOrder',
                        method: 'post',
                        data: params
                    }).then(res => {
                        console.log(res)
                        if (res.status == 1) {
                            this.$router.replace('/success')
                        } else {
                            this.$router.replace('/fails')
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped lang="less">
    #serverInfo {
        padding: 10px;
        .positionFix();
        .address {
            margin-bottom: 10px;
            .address_box {
                background: #ffffff;
                padding: 10px;
                border-radius: 6px;
                .ds-flex(@wrap: nowrap,@justContent: space-between);
                .address_info {
                    flex: 1;
                    overflow: hidden;
                    .rem(margin-left, 10);
                    .user_info {
                        .ds-flex(@wrap: nowrap);
                        > span {
                            background: @themeColor;
                            color: #ffffff;
                            .rem(font-size, 12);
                            padding: 2px;
                            border-radius: 3px;
                        }
                        p {
                            flex: 1;
                            overflow: hidden;
                            margin-left: 10px;
                            color: #7b838e;
                            .rem(font-size, 12);
                            .rem(line-height, 16);
                            span {
                                margin-right: 10px;
                            }
                        }
                    }
                    .address_details {
                        color: #333333;
                        .rem(font-size, 13);
                        .rem(margin-top, 5);
                        .rem(line-height, 20);
                    }
                }
                .address_icon {
                    .rem(font-size, 20);
                    color: #999999;
                }
                .chose_icon {
                    color: #d8d8d8;
                    .rem(font-size, 14);
                }
            }
        }
        .choose-time {
            border-radius: 6px;
            margin-bottom: 10px;
        }
        .remark {
            background-color: #ffffff;
            padding: 10px;
            textarea {
                display: block;
                border: none;
                resize: none;
                width: 100%;
                border-bottom: 1px solid #e5e5e5;
                .rem(font-size, 14);
                margin-bottom: 10px;
            }
            .up-img {
                display: flex;
                flex-wrap: wrap;
                .img-box {
                    margin-bottom: 10px;
                    img {
                        max-height: 100%;
                        max-width: 100%;
                    }
                }
                .upbox {
                    width: calc(~"(100% - 38px)/4");
                    margin-right: 10px;
                    .rem(height, 75);
                    text-align: center;
                    border: 1px solid #e5e5e5;
                    position: relative;
                    p {
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        width: 100%;
                        text-align: center;
                        .rem(font-size, 12);
                        color: #999999;
                        .up-icon {
                            display: block;
                            margin-bottom: 4px;
                            .rem(font-size, 28);
                            color: #999999;
                        }
                    }
                    &:nth-of-type(4n) {
                        margin-right: 0;
                    }
                }
            }
            .re-dec {
                margin-top: 10px;
                color: #b2b2b2;
                .rem(font-size, 12);
            }
        }

        .btns {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            font-size: 0;
            border-top: 1px solid #e6e6e6;
            border-top-right-radius: 6px;
            border-top-left-radius: 6px;
            overflow: hidden;
            button {
                width: 50%;
                border: none;
                .rem(font-size, 15);
                .rem(line-height, 50);
                &.back-btn {
                    background-color: #ffffff;
                }
                &.buy-btn {
                    color: #ffffff;
                    background-color: @themeColor;
                }
            }
        }
    }
</style>
