<template>
    <div id="member">
        <div class="header_box">
            <div class="user_info">
                <div class="user_img">
                    <img v-if="user.headimgurl" :src="user.headimgurl" alt="">
                    <img v-else src="./head_img.jpg" alt="">
                </div>
                <p class="user_name" v-if="user.wxname">{{user.wxname}} <span v-if="user.is_master" style="color: #f00;font-size: 12px">维修师傅</span></p>
                <p class="user_name" v-else>此用户没有用户名 <span v-if="user.is_master" style="color: #f00;font-size: 12px">维修师傅</span></p>
                <div class="user-rank">
                    <van-icon name="vip" class="icon-level"/>
                    <span class="level">{{rank[user.rank]}}</span>
                </div>
            </div>
        </div>
        <div class="section-list">
            <van-row class="money-line lists">
                <van-col span="12">总金额：<span class="money-num"><small>￥</small>888.00</span></van-col>
                <van-col span="12">余额: <span class="money-num"><small>￥</small>238.00</span></van-col>
            </van-row>
            <p class="title">服务订单</p>
            <van-row class="order-entry lists">
                <van-col span="5" style="width:20%">
                    <router-link to="/allOrder?type=0">
                        <van-icon name="daijiedan"></van-icon>
                        <p class="dec">待接单</p>
                    </router-link>
                </van-col>
                <van-col span="5" style="width:20%">
                    <router-link to="/allOrder?type=1">
                        <van-icon name="fuwuguwen"></van-icon>
                        <p class="dec">服务中</p>
                    </router-link>
                </van-col>
                <van-col span="5" style="width:20%">
                    <router-link to="/allOrder?type=2">
                        <van-icon name="fuwuguwen"></van-icon>
                        <p class="dec">待付款</p>
                    </router-link>
                </van-col>
                <van-col span="5" style="width:20%">
                    <router-link to="/allOrder?type=3">
                        <van-icon name="daipingjia"></van-icon>
                        <p class="dec">待评价</p>
                    </router-link>
                </van-col>
                <van-col span="5" style="width:20%">
                    <router-link to="/allOrder?type=4">
                        <van-icon name="biaodanwancheng2"></van-icon>
                        <p class="dec">已完成</p>
                    </router-link>
                </van-col>
            </van-row>
            <p class="title">其他工具</p>
            <van-row class="other-entry lists">
                <van-col span="6">
                    <router-link to="/coupon">
                        <van-icon name="quanqia" class="color-1"></van-icon>
                        <p class="dec">代金券</p>
                    </router-link>
                </van-col>
                <van-col span="6">
                    <router-link to="/shareQrCode">
                        <van-icon name="QR" class="color-2"></van-icon>
                        <p class="dec">推荐二维码</p>
                    </router-link>
                </van-col>
                <van-col span="6">
                    <router-link to="/myFriend">
                        <van-icon name="hezuohuobantianchong" class="color-3"></van-icon>
                        <p class="dec">分享伙伴</p>
                    </router-link>
                </van-col>
                <van-col span="6">
                    <router-link to="/remainder">
                        <van-icon name="icon_gongzimingxi" class="color-4"></van-icon>
                        <p class="dec">消费明细</p>
                    </router-link>
                </van-col>
                <van-col span="6">
                    <router-link to="/recharge">
                        <van-icon name="quanqia" class="color-5"></van-icon>
                        <p class="dec">在线充值</p>
                    </router-link>
                </van-col>
                <van-col span="6">
                    <router-link to="/addressList">
                        <van-icon name="dizhi1" class="color-3"></van-icon>
                        <p class="dec">我的地址</p>
                    </router-link>
                </van-col>
                <van-col span="6">
                    <router-link to="/kefu">
                        <van-icon name="wenti" class="color-1"></van-icon>
                        <p class="dec">客服中心</p>
                    </router-link>
                </van-col>
                <van-col span="6">
                    <router-link to="/zzsm">
                        <van-icon name="wuyougouwu_shengming" class="color-6"></van-icon>
                        <p class="dec">郑重声明</p>
                    </router-link>
                </van-col>
                <van-col span="6">
                    <router-link to="/yszc">
                        <van-icon name="dingdan" class="color-7"></van-icon>
                        <p class="dec">隐私政策</p>
                    </router-link>
                </van-col>
                <van-col span="6">
                    <router-link to="/zixun">
                        <van-icon name="zixun1" class="color-8"></van-icon>
                        <p class="dec">平台资讯</p>
                    </router-link>
                </van-col>
                <van-col span="6" @click.native="toMater">
                    <van-icon name="weixiugongguanli" class="color-9"></van-icon>
                    <p class="dec">师傅中心</p>
                </van-col>
            </van-row>
        </div>
        <div class="copy_right">
            <router-link to="" class="company_info">
                <img src="./company_logo.png"/>
                <span>湖南中网科技提供技术支持</span>
            </router-link>
        </div>
    </div>
</template>

<script>
    import {Row, Col, Cell, Icon} from 'vant'
    import {mapGetters} from 'vuex'
    import {regStep} from 'api/master'

    export default {
        name: "member",
        data() {
            return {
                rank: ['普通会员', 'VIP会员'],
                toMaterFlag: 0
            }
        },
        components: {
            [Row.name]: Row,
            [Col.name]: Col,
            [Cell.name]: Cell,
            [Icon.name]: Icon,
        },
        computed: {
            ...mapGetters(['user'])
        },
        mounted() {
            regStep().then((res) => {
                this.toMaterFlag = res.status
            })
        },
        methods: {
            goList(index) {
                this.$router.push('/allOrder?id=' + index)
            },
            toMater() {
                switch (this.toMaterFlag) {
                    case 0:
                        this.$router.push('/masterCenter')
                        break
                    case -1:
                        this.$router.push('/masterReg')
                        break
                    case -2:
                        this.$router.push('/masterRegNext')
                        break
                    case -3:
                        this.$router.push('/regAuditing')
                        break
                    case -4:
                        this.$toast("审核未通过，请重新注册")
                        setTimeout(()=>{
                            this.$router.push('/masterReg')
                        },1000)
                        break
                }
            }
        }
    }
</script>

<style scoped lang="less">
    #member {
        padding-bottom: 1.33rem;
        .header_box {
            padding-bottom: 48%;
            position: relative;
            background-size: 100% 100%;
            .user_info {
                margin-top: -10px;
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                background: url("./member_bg.png") no-repeat;
                background-size: 100% 100%;
                .ds-flex(@direction: column,@wrap: nowrap,@justContent: center);
                .user_img {
                    .rem(width, 60);
                    .rem(height, 60);
                    .rem(border-radius, 60);
                    border: 2px solid #fdb5b5;
                    position: relative;
                    overflow: hidden;
                    border-radius: 50%;
                    img {
                        max-width: 100%;
                        max-height: 100%;
                        display: block;
                        .positionCenter;
                    }
                }
                .user_name {
                    color: #ffffff;
                    .rem(font-size, 15);
                    .rem(line-height, 25);
                    .rem(margin-top, 5);
                    .ellipsis;
                    padding: 0 10px;
                    width: calc(~"100% - 20px");
                    text-align: center;
                }
                .user-rank {
                    position: relative;
                    .rem(font-size, 12);
                    color: #ffffff;
                    .rem(line-height, 20);
                    padding: 0 5px;
                    .icon-level {
                        .rem(font-size, 29)
                    }
                    span.level {
                        position: absolute;
                        top: 50%;
                        color: @themeColor;
                        transform: translateY(-50%);
                        right: 20%;
                        .rem(font-size, 12);
                        white-space: nowrap;
                    }
                }
            }
        }
        .section-list {
            padding: 10px;
            .lists {
                .remTwoParams(padding, 15, 10);
                border-radius: 6px;
                background-color: #ffffff;
            }
            .title {
                .remTwoParams(margin, 10, 0);
                .rem(font-size, 13);
            }
            .money-line {
                .rem(font-size, 13);
                .money-num {
                    .rem(font-size, 24);
                    color: @themeColor;
                    small {
                        .rem(font-size, 15);
                    }
                }
            }
            .order-entry {
                .remTwoParams(padding, 15, 10);
                .van-col {
                    text-align: center;
                }
                .van-icon {
                    color: #5973f7;
                    .rem(font-size, 20);
                }
                .dec {
                    .rem(font-size, 11);
                    .rem(margin-top, 7.5);
                }
            }
            .other-entry {
                .van-col {
                    text-align: center;
                    padding: 12px 0;
                    .van-icon {
                        .rem(font-size, 20);
                        &.color-1 {
                            color: #06bcfb;
                        }
                        &.color-2 {
                            color: #ff9e4c;
                        }
                        &.color-3 {
                            color: #00d1a4;
                        }
                        &.color-4 {
                            color: #f65b49;
                        }
                        &.color-5 {
                            color: #8ccf44;
                        }
                        &.color-6 {
                            color: #fea356;
                        }
                        &.color-7 {
                            color: #ff6891;
                        }
                        &.color-8 {
                            color: #6b83ff;
                        }
                        &.color-9 {
                            color: #fbd04e;
                        }
                    }
                    .dec {
                        .rem(font-size, 11);
                        .rem(margin-top, 7.5);
                    }
                }
            }
        }
        .copy_right {
            margin-top: 30px;
            font-size: 12px;
            padding-bottom: 15px;
            .company_info {
                .ds-flex(@justContent: center,@align: center);
                img {
                    width: 16px;
                    display: block;
                    margin: 5px;
                }
                span {
                    font-size: 12px;
                    color: #999999;
                }
            }
        }
    }
</style>
