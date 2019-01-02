<template>
    <div id="orderDetail">
        <step :stepArr="stepArr" :active="orderInfo.status" class="step">
            <p slot="text" class="status-text">{{masterStatus[orderInfo.status]}}</p>
        </step>
        <master-info :masterInfo="orderInfo.master" v-if="orderInfo.status>=1">
            <span slot="tag" class="tag">已接单</span>
        </master-info>
        <van-cell-group class="price order">
            <h4 class="title">订单花费</h4>
            <van-cell class="price-num" title="服务费" :value="orderInfo.server_money"/>
            <van-cell class="price-num" title="材料费" :value="orderInfo.material_money"/>
            <van-cell class="price-num" title="优惠券" :value="'-'+orderInfo.reduce" v-if="orderInfo.reduce_id"/>
            <van-cell class="price-num total" title="订单费用合计" :value="totalMoney"/>
        </van-cell-group>
        <remark v-if="orderInfo.status==3" :imgs="upFiles" title="请您评价师傅的服务" upFile @fileChange="upFile">
            <div class="input" slot="input">
                <van-rate v-model="rate" color="#ff842a" class="rate"/>
                <textarea name="" id="" maxlength="255" cols="30" rows="10" placeholder="您的评价对我们来说很重要"
                          v-model="assessText"></textarea>
            </div>
        </remark>
        <address-info :addressInfo="orderInfo" :showDefault="false" :showIcon="false"></address-info>
        <van-cell-group class="order">
            <van-cell title="订单编号" :value="orderInfo.no"/>
            <van-cell title="项目" :value="orderInfo.project.name"/>
            <!--<van-cell title="收费" value="¥10.00元/个" class="price-num"/>-->
            <van-cell title="下单时间" :value="orderInfo.add_date"/>
            <van-cell title="预约时间" :value="orderInfo.time"/>
        </van-cell-group>
        <remark :memo="orderInfo.memo" :imgs="orderInfo.imgs" title="客户备注"></remark>
        <div class="btns">
            <button class="back-btn" @click="cancelOrder" v-if="orderInfo.status==0">取消订单</button>
            <!--<button class="back-btn" @click="delOrder" v-if="orderInfo.status==4">删除订单</button>-->
            <button class="buy-btn" @click="assess()" v-if="orderInfo.status==3">评价订单</button>
            <button class="back-btn" @click="priceMistake=true" v-if="orderInfo.status==2">价格有误</button>
            <button class="buy-btn" @click="showPay=true" v-if="orderInfo.status==2">确认付款</button>
            <button class="buy-btn" @click="seeAllOrder"
                    v-if="orderInfo.status==0||orderInfo.status==1||orderInfo.status==4">查看所有订单
            </button>
        </div>
        <!--价格有误弹出层-->
        <van-popup v-model="priceMistake">
            <div class="price-mistake">
                <img src="./cry.png" alt="" class="cry">
                <div class="close"><i class="van-icon van-icon-Group-" @click="priceMistake=false"></i></div>
                <p class="ask">对师傅的报价有异议？</p>
                <p class="call">您可拨打师傅的电话进行沟通，修改报价哦~</p>
                <p class="identity">维修师傅</p>
                <p class="call-num" v-if="orderInfo.master">{{orderInfo.master.true_name}} <a
                    :href="'tel:'+orderInfo.master.tel">{{orderInfo.master.tel}}</a></p>
            </div>
        </van-popup>
        <!--付款弹出层-->
        <van-popup v-model="showPay" position="bottom" class="pay-popup">
            <div class="pay-container">
                <van-cell class="price" title="订单费用合计" :value="totalMoney"/>
                <van-cell class="choose" title="代金券" :class="useCoupon?'active':''"
                          :value="useCoupon?'-'+useCoupon.reduce:'选择代金券'" is-link @click.native="showCoupon=true"/>
                <van-cell>
                    <div class="total-price">合计 <span v-html="payMoney"></span></div>
                </van-cell>
                <van-cell class="chose-way" title="请选择支付方式"/>
                <van-checkbox-group v-model="payway">
                    <van-cell-group>
                        <van-cell
                            v-for="(item,index) in payType"
                            clickable
                            :key="item"
                            :title="item"
                            @click="toggle(index)"
                            :label="item=='余额支付'?'我的余额'+myMoney.amoney:''"
                        >
                            <van-checkbox :name="item" ref="checkboxes" :disabled="item=='微信支付'"/>
                        </van-cell>
                    </van-cell-group>
                </van-checkbox-group>
                <div class="pay-btns">
                    <button class="back" @click="showPay=false">返回</button>
                    <button class="pay-btn" @click="pay()">确认付款</button>
                </div>
            </div>
        </van-popup>
        <van-popup class="use-coupon" v-model="showCoupon">
            <div class="use-container">
                <van-cell title="不使用优惠券" class="no-use-coupon" @click.native="notUse"/>
                <div class="coupon-list" v-for="(item,index) in couponList" :key="index">
                    <coupon :info="item" v-if="item.status==0" @change="chooseC">
                    </coupon>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
    import step from './orderTmp/step'
    import addressInfo from './orderTmp/address'
    import masterInfo from './orderTmp/masterInfo'
    import remark from './orderTmp/remark'
    import coupon from '@/components/common/base/coupon'
    import {Cell, CellGroup, Rate, Popup, Checkbox, CheckboxGroup, Dialog} from 'vant'
    import {getOrderDetail, orderPay, delOrder} from '@/api/orderList'
    import request from '@/components/common/js/request'
    import {assessOrder} from '@/api/order'

    export default {
        name: "serverOrder",
        components: {
            step, addressInfo, remark, masterInfo, coupon,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Rate.name]: Rate,
            [Popup.name]: Popup,
            [Checkbox.name]: Checkbox,
            [CheckboxGroup.name]: CheckboxGroup,
            [Dialog.name]: Dialog,
        },
        data() {
            return {
                stepArr: ['待接单', '服务中', '待付款', '待评价', '已完成'],
                orderInfo: {
                    project: {
                        name: '',
                    }
                },
                myMoney: 0, //我的余额
                status: 0,
                cdn: process.env.CDN,
                masterStatus: ['待师傅接单中', '师傅为您服务中', '待付款', '待评价', '服务完成'],
                upFiles: [],
                rate: 4, //评分
                assessText: '', //评价
                priceMistake: false, //价格有误
                showPay: false, //付款弹出层
                payType: ['微信支付', '余额支付'],
                payway: ['微信支付'],
                showCoupon: false, //优惠券弹出层
                couponList: [],
                useCoupon: false,
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.initInfo(this.$route.query.id)
            })
        },
        computed: {
            totalMoney() {
                if (this.orderInfo.reduce) {
                    return (parseFloat(this.orderInfo.server_money) + parseFloat(this.orderInfo.material_money) - parseFloat(this.orderInfo.reduce)).toFixed(2)
                }
                return (parseFloat(this.orderInfo.server_money) + parseFloat(this.orderInfo.material_money)).toFixed(2)
            },
            payMoney() {
                var payNum = 0
                if (this.useCoupon.reduce) {
                    payNum = (this.totalMoney - parseFloat(this.useCoupon.reduce)).toFixed(2)
                } else {
                    payNum = this.totalMoney
                }
                return payNum
            }
        },
        methods: {
            initInfo(id) {
                getOrderDetail({id: id}).then(res => {
                    if (res.status == 1) {
                        this.orderInfo = res.data
                        this.myMoney = res.msg
                        this.initList()
                    }
                })
            },
            //获取自己的优惠券
            initList() {
                var _this = this
                request({
                    url: '/api/Reduce/index',
                    method: 'get',
                }).then(res => {
                    if (res.status == 1) {
                        res.data.forEach(function (v) {
                            var a = _this.timeDiffer(v.exp_time)
                            if ((a && v.status != 1) || (v.cate_id && (v.cate.id != _this.orderInfo.project.cat_id))) {
                                v.status = 2
                            }
                        })
                        this.couponList = res.data
                    }
                })
            },
            timeDiffer(time) {
                var now = Date.parse(new Date()) + 24 * 60 * 60 * 1000
                var couponDate = Date.parse(new Date(time))
                var isBeMore = 0
                if ((now - couponDate) > 0) {
                    isBeMore = 1
                }
                return isBeMore
            },
            //取消订单
            cancelOrder() {
                this.$router.push('/cancelOrder?id=' + this.$route.query.id)
            },
            seeAllOrder() {
                this.$router.back()
            },
            //评价订单
            assess() {
                var params = {
                    id: this.$route.query.id,
                    star: this.rate,
                    comment: this.assessText,
                    imgs: this.upFiles,

                }
                if (params.comment == "") {
                    this.$toast('请输入评价')
                    return
                } else if (params.imgs.length <= 0) {
                    this.$toast('上传图片')
                    return
                }
                var _this = this
                assessOrder(params).then(res => {
                    _this.$toast(res.msg)
                    if (res.status == 1) {
                        setTimeout(function () {
                            _this.$router.back()
                        }, 500)
                    }
                })
            },
            upFile(file) {
                var formD = new FormData()
                formD.append("files", file.file)
                request({
                    url: "/api/Common/uploadImg",
                    method: "post",
                    data: formD,
                }).then(res => {
                    if (res.status == 1) {
                        this.upFiles.push(res.data)
                    }
                })
            },
            //选择支付方式
            toggle(index) {
                this.$refs.checkboxes[index].toggle()
            },
            //不使用优惠券
            notUse() {
                this.showCoupon = false //选择后关闭弹出层
                this.useCoupon = false
            },
            //选择优惠券
            chooseC(v) {
                this.showCoupon = false //选择后关闭弹出层
                this.useCoupon = v
            },
            //支付订单
            pay() {
                var isUse = 0
                var _this = this
                this.payway.forEach(function (v) {
                    if (v == '余额支付') {
                        isUse = 1
                    }
                })
                var params = {
                    id: this.$route.query.id,
                    use_amoney: isUse,
                    reduce_id: this.useCoupon.id || 0,
                }
                orderPay(params).then(res => {
                    this.$toast(res.msg)
                    if (res.status == 1) {
                        setTimeout(function () {
                            _this.$router.back()
                        }, 500)
                    }
                })
            },
            //删除订单
            delOrder() {
                var _this = this
                Dialog.confirm({
                    title: '提示',
                    message: '确认删除订单？'
                }).then(() => {
                    delOrder({id: _this.$route.query.id}).then((res) => {
                        _this.$toast(res.msg)
                        if (res.status == 1) {
                            setTimeout(function () {
                                _this.$router.back()
                            }, 500)
                        }
                    })
                }).catch(() => {
                })
            }
        }
    }
</script>

<style scoped lang="less">
    #orderDetail {
        .positionFix();
        z-index: 2;
        .step {
            margin-bottom: 10px;
        }
        .master-info {
            position: relative;
            .tag {
                position: absolute;
                right: 10px;
                top: 10px;
                color: #ffffff;
                background-color: @themeColor;
                padding: 4px 2px;
                border-radius: 2px;
            }
        }
        .price {
            margin-bottom: 10px;
            h4.title {
                padding: 0.4rem 0.26666667rem;
                color: @themeColor;
                .rem(font-size, 15);
                border-bottom: 1px solid #e5e5e5;
            }
            .total {
                .rem(font-size, 13);
            }
        }
        .input {
            .remTwoParams(padding, 10, 20);
            .rate {
                .rem(padding-bottom, 10);
                border-bottom: 1px solid #e5e5e5;
            }
            textarea {
                .remTwoParams(padding, 10, 0);
                width: 100%;
                border: none;
                box-sizing: border-box;
                resize: none;
                line-height: 1.6;
                .rem(font-size, 13);
            }
        }
        .address {
            margin-bottom: 10px;
        }
        .order {
            .van-cell {
                &::after {
                    left: 0;
                }
            }
            .price-num {
                /deep/ .van-cell__value {
                    color: @themeColor;
                }
            }
        }
        .customer-remark {
            margin: 10px 0;
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
            .ds-flex();
            button {
                flex: 1;
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
        .price-mistake {
            position: relative;
            border-radius: 10px;
            .rem(width, 250);
            .remTwoParams(padding, 15, 20);
            box-sizing: border-box;
            text-align: center;
            .cry {
                position: absolute;
                width: 85px;
                height: 85px;
                left: 50%;
                top: -50px;
                transform: translateX(-50%);
            }
            .close {
                text-align: right;
                .rem(margin-bottom, 40);
                .van-icon {
                    .rem(font-size, 20);
                }
            }
            .ask {
                .rem(font-size, 18);
                color: @themeColor;
            }
            .call {
                color: #666666;
                .rem(font-size, 15);
                .rem(margin-top, 14);
                .rem(margin-bottom, 30);
                line-height: 1.6;
            }
            .identity {
                color: @themeColor;
                .rem(font-size, 15);
                text-align: left;
                .rem(margin-bottom, 15);
            }
            .call-num {
                .rem(font-size, 15);
                .rem(margin-bottom, 20);
                text-align: left;
                color: #333333;
            }
        }
        .van-popup {
            min-height: 200px;
            overflow-y: visible;
            border-radius: 10px;
        }
        .pay-popup {
            border-radius: 0;
            .pay-container {
                .price {
                    /deep/ .van-cell__value {
                        .rem(font-size, 24);
                        color: @themeColor;
                    }
                }
                .active {
                    /deep/ .van-cell__value {
                        .rem(font-size, 13);
                        color: @themeColor !important;
                    }
                }
                .choose {
                    /deep/ .van-cell__value {
                        .rem(font-size, 13);
                        color: #999999;
                    }
                }
                .chose-way {
                    .rem(font-size, 13);
                    color: #999999;
                }
                .total-price {
                    text-align: right;
                    .rem(font-size, 13);
                    span {
                        .rem(font-size, 24);
                        color: @themeColor;
                    }
                }
                .pay-btns {
                    display: flex;
                    border-top: 1px solid #cccc;
                    button {
                        width: 50%;
                        line-height: 50px;
                        border: none;
                        .rem(font-size, 15);
                        &.back {
                            background-color: #ffffff;
                        }
                        &.pay-btn {
                            background-color: @themeColor;
                            color: #ffffff;
                        }
                    }
                }
            }
        }
        .use-coupon {
            width: 100%;
            height: 100%;
            padding: 10px;
            left: 0;
            top: 0;
            transform: none;
            overflow-y: scroll;
            box-sizing: border-box;
            border-radius: 0;
            background-color: #f2f2f2;
            .use-container {
                width: 100%;
                .no-use-coupon {
                    margin-bottom: 10px;
                }
            }
        }
    }
</style>
