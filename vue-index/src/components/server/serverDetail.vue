<template>
    <div id="serverDetail">
        <div class="detail-top">
            <div class="img-box">
                <img :src="cdn+info.product.imgURL" alt="">
            </div>
            <div class="server-list">
                <table>
                    <thead>
                    <tr>
                        <td>服务项目</td>
                        <td>参考价</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in info.product.server" :key="index">
                        <td>{{item.s}}</td>
                        <td>{{item.p}}元</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="ps">
                <p>温馨提示:</p>
                <p>本价格为上门服务安装费用，不包含配件费用。</p>
            </div>
        </div>
        <div class="server-about">
            <h4 class="about-title">业务介绍</h4>
            <div class="server-content" v-html="info.product.detail"></div>
        </div>
        <div class="server-about">
            <h4 class="about-title">服务流程</h4>
            <div class="server-content" v-html="info.fwlc">
            </div>
        </div>
        <div class="server-about">
            <h4 class="about-title">服务说明</h4>
            <div class="server-content" v-html="info.fwsm">
            </div>
        </div>
        <div class="btns">
            <button class="back-btn" @click="back">上一级</button>
            <button class="buy-btn" @click="buybuybuy">立即下单</button>
        </div>
    </div>
</template>

<script>
    import {getProDetail} from '@/api/server'

    export default {
        name: "serverDetail",
        data() {
            return {
                info: {
                    fwsm: '',
                    fwlc: '',
                    product: {
                        detail: '',
                        imgURL: '',
                        server: []
                    }
                },
                cdn: process.env.CDN,
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.getDetail()
            })
        },
        methods: {
            getDetail() {
                getProDetail({id: this.$route.query.id}).then(res => {
                    if (res.status == 1) {
                        this.info = res.data
                    }
                })
            },
            buybuybuy() {
                this.$router.push('/serverInfo?id=' + 2)
            },
            back() {
                this.$router.back()
            }
        }
    }
</script>

<style scoped lang="less">
    #serverDetail {
        .positionFix();
        .detail-top {
            background-color: #fff;
            .img-box {
                img {
                    width: 100%;
                }
            }
            .server-list {
                padding: 0 10px;
                margin-top: 10px;
                table {
                    width: 100%;
                    text-align: center;
                    .rem(margin-bottom, 20);
                    td {
                        .remTwoParams(padding, 15, 0);
                        .rem(font-size, 13);
                        border-bottom: 1px solid #e6e6e6;
                    }
                    thead {
                        background-color: #ebebeb;
                    }
                }
            }
            .ps {
                padding: 0 10px 20px;
                p {
                    .rem(font-size, 13);
                    line-height: 1.6;
                }
            }
        }
        .server-about {
            margin: 10px 0;
            background-color: #ffffff;
            .about-title {
                color: @themeColor;
                .rem(font-size, 15);
                .remTwoParams(padding, 13, 0);
                .rem(padding-left, 10);
                border-bottom: 1px solid #e6e6e6;
                position: relative;
                &:before {
                    content: "";
                    position: absolute;
                    width: 3px;
                    height: 50%;
                    background-color: @themeColor;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
            .server-content {
                .rem(padding, 10);
                p {
                    line-height: 1.8;
                    .rem(font-size, 12);
                }
            }
        }
        .btns {
            position: fixed;
            bottom: 0;
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
