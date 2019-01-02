<template>
    <div id="masterCenter">
        <div class="header">
            <img src="./master_center_bg.png" alt="">
            <div class="master-info">
                <div class="img">
                    <img :src="cdn + userInfo.head_img" alt="">
                </div>
                <div class="info">
                    <p>姓名：{{userInfo.true_name}} <span>维修师傅</span></p>
                    <p>证件信息：{{userInfo.idcard}}</p>
                    <p>服务种类：{{userInfo.project}}</p>
                    <p>服务区域：{{userInfo.server_address}}</p>
                    <p>手机号码：{{userInfo.tel}}</p>
                    <p>工作类型：{{type[userInfo.type - 1]}}</p>
                </div>
            </div>
            <div class="edit-info" @click="editInfo">
                <span>编辑资料</span>
            </div>
        </div>
        <div class="master-money">
            <p class="money-name">
                <span>总金额</span>
                <span>冻结金额</span>
                <span>可提现金额</span>
            </p>
            <p class="money-num">
                <span><small>￥</small>{{userInfo.total}}</span>
                <span><small>￥</small>{{userInfo.bmoney}}</span>
                <span><small>￥</small>{{userInfo.amoney}}</span>
            </p>
        </div>
        <div class="master-entry">
            <van-row gutter="1">
                <van-col span="12" class="nav_item">
                    <router-link to="/masterOrder" class="nav_href">
                        <div class="nav_img">
                            <i class="van-icon">&#xe634;</i>
                        </div>
                        <div class="nav_info">
                            <h5>我的订单</h5>
                            <p>查看所有订单状态</p>
                        </div>
                    </router-link>
                </van-col>
                <van-col span="12" class="nav_item">
                    <router-link to="/income" class="nav_href">
                        <div class="nav_img">
                            <i class="van-icon">&#xe62a;</i>
                        </div>
                        <div class="nav_info">
                            <h5>收入明细</h5>
                            <p>查看所有收入明细</p>
                        </div>
                    </router-link>
                </van-col>
                <van-col span="12" class="nav_item">
                    <router-link to="/zysx" class="nav_href">
                        <div class="nav_img">
                            <i class="van-icon">&#xe643;</i>
                        </div>
                        <div class="nav_info">
                            <h5>注意事项</h5>
                            <p>查看服务时的注意事项</p>
                        </div>
                    </router-link>
                </van-col>
                <van-col span="12" class="nav_item">
                    <router-link to="/fwlc" class="nav_href">
                        <div class="nav_img">
                            <i class="van-icon">&#xe62b;</i>
                        </div>
                        <div class="nav_info">
                            <h5>服务流程</h5>
                            <p>查看上门服务细节及流程</p>
                        </div>
                    </router-link>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
    import {Row, Col} from 'vant'
    import {getMasterInfo} from 'api/master'
    export default {
        name: "index",
        components: {
            [Row.name]: Row,
            [Col.name]: Col
        },
        data() {
            return {
                userInfo: {},
                cdn: process.env.CDN,
                type: ['全职','兼职']
            }
        },
        mounted() {
            this.getInfo()
        },
        methods: {
            editInfo() {
                this.$router.push('/editInfo')
            },
            getInfo() {
                getMasterInfo().then((res)=>{
                    if (res.status == 1) {
                        let ad  = ''
                        let pro = ''
                        res.data.server_address.forEach((v)=>{
                            ad += v + '、'
                        })
                        res.data.project.forEach((v)=>{
                            pro += v + '、'
                        })
                        ad = ad.substr(0,ad.length - 1)
                        pro = pro.substr(0,pro.length - 1)
                        res.data.server_address = ad
                        res.data.project = pro
                        res.data.tel = res.data.tel.substr(0,3) + '****' + res.data.tel.substr(-4,4)
                        res.data.idcard = res.data.idcard.substr(0,10) + '********'
                        this.userInfo = res.data
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
    #masterCenter {
        .positionFix(@bottom: 0);
        .header {
            position: relative;
            overflow: hidden;
            >img {
                width: 100%;
                display: block;
            }
            .master-info {
                position: absolute;
                .rem(top,20);
                left: 0;
                right: 0;
                bottom: 0;
                overflow: hidden;
                .ds-flex(@wrap: nowrap;@align: flex-start);
                .img {
                    .rem(width,78);
                    .rem(height,100);
                    .rem(margin-left,20);
                    .rem(margin-right,15);
                    overflow: hidden;
                    position: relative;
                    img {
                        .positionCenter;
                        max-width: 100%;
                        max-height: 100%;
                        display: block;
                    }
                }
                .info {
                    flex: 1;
                    .rem(padding-right,60);
                    overflow: hidden;
                    p {
                        .rem(font-size,12);
                        color: #ffffff;
                        line-height: 1.5;
                        .ellipsis;
                        span {
                            color: #ff0000;
                        }
                    }
                }
            }
            .edit-info {
                position: absolute;
                right: 0;
                .rem(top,10);
                .rem(line-height,25);
                .rem(height,25);
                background: #ffffff;
                .rem(font-size,12);
                color: #333333;
                .rem(padding-left,10);
                .rem(padding-right,2);
                .rem(border-bottom-left-radius,15);
                .rem(border-top-left-radius,15);
            }
        }
        .master-money {
            padding: 0 10px;
            background: #ffffff;
            .money-name {
                color: #333333;
                .rem(font-size,13);
                border-bottom: 1px solid #f2f2f2;
                .ds-flex(@wrap: nowrap;);
                .rem(line-height,50);
                box-sizing: border-box;
                span {
                    flex: 1;
                    text-align: center;
                    .ellipsis;
                }
            }
            .money-num {
                color: @themeColor;
                .ds-flex(@wrap: nowrap;);
                .rem(font-size,20);
                span {
                    flex: 1;
                    text-align: center;
                    .rem(line-height,50);
                    .rem(height,50);
                    .ellipsis;
                    small {
                        font-size: 12px;
                    }
                }
            }
        }
        .master-entry {
            background: #f2f2f2;
            margin-top: 10px;
            overflow: hidden;
            /deep/ .van-col {
                background-clip: content-box;
                position: relative;
                &:first-child {
                    &::after {
                        height: 0;
                    }
                }
                &:nth-child(2) {
                    &::after {
                        height: 0;
                    }
                }
                &::after {
                    content: '';
                    width: 100%;
                    height: 1px;
                    background-color: #e5e5e5;
                    position: absolute;
                    left: 0;
                    top: 0;
                }
            }
            .nav_item {
                background-color: #ffffff;
                .nav_href {
                    .ds-flex(@justContent: center,@direction: row,@wrap: nowrap);
                    .rem(padding, 12);
                    .nav_img {
                        .rem(width, 40);
                        .rem(height, 40);
                        .rem(margin-right, 5);
                        overflow: hidden;
                        text-align: center;
                        i {
                            .rem(font-size,28);
                            color: @themeColor;
                        }
                    }
                    .nav_info {
                        flex: 1;
                        overflow: hidden;
                        h5 {
                            color: #333333;
                            .rem(font-size, 14);
                            .rem(line-height, 20);
                            .ellipsis;
                        }
                        p {
                            color: #999999;
                            .rem(font-size, 12);
                            .rem(line-height, 20);
                            .ellipsis;
                        }
                    }
                }
            }
        }
    }
</style>
