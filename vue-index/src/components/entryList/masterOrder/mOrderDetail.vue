<template>
    <div id="mOrder">
        <div class="top">
            <div class="top-status">{{detailInfo.project.name}}</div>
            <div class="call-btn" v-if="detailInfo.status!=4">
                <a :href="'tel:'+detailInfo.post_tel">联系客户</a>
            </div>
            <p class="status-text">服务中</p>
        </div>
        <van-cell-group class="price order">
            <h4 class="title">订单花费</h4>
            <van-cell class="price-num" title="服务费" :value="detailInfo.server_money"/>
            <van-cell class="price-num" title="材料费" :value="detailInfo.material_money"/>
            <van-cell class="price-num total" title="订单费用合计" :value="totalMoney"/>
        </van-cell-group>
        <address-info :addressInfo="detailInfo" :showDefault="false" :showIcon="false" class="address"></address-info>
        <van-cell-group class="order">
            <van-cell title="订单编号" :value="detailInfo.no"/>
            <van-cell title="项目" :value="detailInfo.project.name"/>
            <van-cell title="下单时间" :value="detailInfo.add_date"/>
            <van-cell title="预约时间" :value="detailInfo.time"/>
        </van-cell-group>
        <remark :memo="detailInfo.memo" :imgs="detailInfo.imgs" title="客户备注"></remark>
        <div class="btns">
            <button class="back-btn" @click="cancelOrder()" v-if="detailInfo.status==1">取消订单</button>
            <button class="buy-btn" v-if="detailInfo.status==0" @click="callPopup=true">联系确认无误</button>
            <button class="buy-btn" v-if="detailInfo.status==1" @click="toEnd">维修完毕</button>
            <button class="back-btn" @click="back" v-if="detailInfo.status==2">返回</button>
            <button class="buy-btn" @click="back" v-if="detailInfo.status==2||detailInfo.status==4">查看所有订单</button>
        </div>
        <van-popup v-model="callPopup">
            <div class="price-mistake">
                <img src="./smile.png" alt="" class="cry">
                <div class="close"><i class="van-icon van-icon-Group-" @click="callPopup=false"></i></div>
                <p class="ask">确认操作</p>
                <p class="call">请确认客户订单信息，与客户沟通无误？</p>
                <div class="operation">
                    <button @click="callPopup=false">取消</button>
                    <button class="cfn" @click="reOrder">确认</button>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
    import {masterOrderDetail, acceptOrder} from '@/api/masterOrder'
    import addressInfo from '../../server/orderTmp/address'
    import remark from '../../server/orderTmp/remark'
    import {Cell, CellGroup, Popup} from 'vant'

    export default {
        name: "mOrderDetail",
        components: {
            addressInfo, remark,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Popup.name]: Popup,
        },
        data() {
            return {
                detailInfo: {
                    project: {
                        name: ''
                    }
                },
                callPopup: false
            }
        },
        computed: {
            totalMoney() {
                return (parseFloat(this.detailInfo.server_money) + parseFloat(this.detailInfo.material_money)).toFixed(2)
            },
        },
        mounted() {
            this.$nextTick(function () {
                this.getDetail()
            })
        },
        methods: {
            getDetail() {
                masterOrderDetail({id: this.$route.query.id}).then(res => {
                    if (res.status == 1) {
                        this.detailInfo = res.data
                    }
                })
            },
            cancelOrder() {
                this.$router.push('/mcancelOrder?id=' + this.$route.query.id)
            },
            //接单
            reOrder() {
                var _this = this
                acceptOrder({id: this.$route.query.id}).then(res => {
                    _this.$toast(res.msg)
                    if (res.status == 1) {
                        _this.callPopup = false
                        setTimeout(function () {
                            _this.$router.back()
                        }, 500)
                    }
                })
            },
            //维修完毕结算
            toEnd() {
                this.$router.push('/repairEnd?id=' + this.$route.query.id + '&name=' + this.detailInfo.project.name)
            },
            back() {
                this.$router.back()
            }
        }
    }
</script>

<style scoped lang="less">
    #mOrder {
        .positionFix();
        .top {
            background-color: #ffffff;
            .rem(padding-bottom, 20);
            margin-bottom: 10px;
            .top-status {
                color: #ffffff;
                background-color: @themeColor;
                .rem(font-size, 24);
                .rem(line-height, 65);
                .rem(height, 65);
                text-align: center;
            }
            .call-btn {
                .remTwoParams(padding, 15, 0);
                padding-bottom: 0;
                text-align: center;
                a {
                    border: 2px solid #CCCCCC;
                    color: #666666;
                    .rem(font-size, 15);
                    display: inline-block;
                    width: 60%;
                    .remTwoParams(padding, 10, 0);
                    background-color: @themeBgColor;
                    border-radius: 6px;
                }
            }
            .status-text {
                color: @themeColor;
                .remTwoParams(padding, 0, 10);
                .rem(padding-top, 15);
                .rem(font-size, 18);
            }
        }
        .address {
            margin-bottom: 10px;
        }
        .order {
            margin-bottom: 10px;
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
            /deep/ .price-num .van-cell__value {
                color: @themeColor;
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
        .van-popup {
            overflow-y: visible;
            border-radius: 6px;
            transform: none;
            .rem(margin-left, -125);
            .rem(margin-top, -131);
        }
        .price-mistake {
            position: relative;
            border-radius: 10px;
            .rem(width, 250);
            .remTwoParams(padding, 15, 20);
            .rem(min-height, 262);
            padding-bottom: 0;
            box-sizing: border-box;
            text-align: left;
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
                text-align: center;
            }
            .call {
                color: #666666;
                .rem(font-size, 15);
                .rem(margin-top, 14);
                .rem(margin-bottom, 60);
                line-height: 1.6;
            }
            .operation {
                width: 100%;
                border-top: 1px solid #e5e5e5;
                .ds-flex();
                button {
                    flex: 1;
                    border: none;
                    background-color: #ffffff;
                    .rem(height, 44);
                    .rem(line-height, 44);
                    .rem(font-size, 18);
                    &:last-of-type {
                        border-left: 1px solid #e5e5e5;
                    }
                    &.cfn {
                        color: @themeColor;
                    }
                }
            }
        }
    }
</style>
