<template>
    <div id="mall" ref="home">
        <div class="banner">
            <van-loading type="spinner" v-if="bannerList.length == 0"/>
            <van-swipe :autoplay="4000" v-else>
                <van-swipe-item v-for="item in bannerList" :key="item.id">
                    <img v-lazy="item.imgURL"/>
                </van-swipe-item>
            </van-swipe>
        </div>
        <floor :cateList="cateList"></floor>
        <div class="pro-tag">
            <img src="./hotbg.png" alt="">
        </div>
        <van-list
            v-model="loading"
            :finished="finished"
            :offset="60"
            @load="onLoad"
            class="prolist"
            :immediate-check="false">
            <div class="row" v-for="item in proList" :key="item.id"
                 @click="goProDetails(item)">
                <div class="img-box"><img v-lazy="item.imgURL" slot="img"></div>
                <div class="text">
                    <h4 slot="title" class="title">{{item.name}}</h4>
                    <p slot="pay_num" class="ser-dec">{{item.discription}}</p>
                    <button class="now-order">立即下单</button>
                </div>
            </div>
        </van-list>
    </div>
</template>

<script>
    import {Swipe, SwipeItem, Loading, List} from 'vant'
    import Floor from './inGroup/floor'
    import Rushbuy from './inGroup/rushbuy'
    import LiItem from 'common/base/liItem/liItem'
    import Pannel from 'common/base/pannel/pannel'
    import Single from 'common/base/liItem/single'
    import {getIndexInfo, getIndexNextPage} from "api/index"
    export default {
        name: "index",
        data() {
            return {
                bannerList: [],     //banner图列表
                cateList: [],       //分类列表
                proList: [],        //商品列表
                loading: false,
                finished: false,
                page: 1,
                rush: {
                    current: 0,
                    end: 0,
                    start: 0
                },
                cdn: process.env.CDN
            }
        },
        components: {
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
            [Loading.name]: Loading,
            [List.name]: List,
            Floor,
            Rushbuy,
            LiItem,
            Pannel,
            Single
        },
        activated() {
            if (!this.$route.meta.isBack) {
                this.page = 1
                this.finished = false
                this.getInfo()
            }
        },
        methods: {
            getInfo() {
                const _this = this
                getIndexInfo().then(res=>{
                    res.data.banner.forEach((v)=>{
                        v.imgURL = _this.cdn + v.imgURL
                    })
                    res.data.cate.forEach((v)=>{
                        v.imgURL = _this.cdn + v.imgURL
                    })
                    res.data.product.data.forEach((v)=>{
                        v.imgURL = _this.cdn + v.imgURL
                    })
                    this.bannerList = res.data.banner
                    this.cateList = res.data.cate
                    this.proList = res.data.product.data
                    this.page = parseInt(res.data.product.current_page) + 1
                    this.loading = false
                })
            },
            onLoad() {
                const _this = this
                getIndexNextPage({page: this.page}).then((res)=>{
                    res.data.data.forEach((v)=>{
                        v.imgURL = _this.cdn + v.imgURL
                        _this.proList.push(v)
                    })
                    this.loading = false
                    this.page = parseInt(res.data.current_page) + 1
                    if (res.data.current_page * res.data.per_page >= res.data.total) {
                        this.finished = true
                    }
                })
            },
            goLink(item) {
                window.location.href = item.link
            },
            goProDetails(item) {
                this.$router.push({path: '/serverDetail',query: {id: item.id}})
            },
            goSearch() {
                this.$router.push('/search')
            }
        }
    }
</script>

<style scoped lang="less">
    #mall {
        .positionFix;
        background: @themeBgColor;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        .banner {
            width: 100%;
            padding-bottom: 50.67%;
            height: 0;
            background: #f2f2f2;
            overflow: hidden;
            position: relative;
            .search {
                position: absolute;
                top: 10px;
                left: 50%;
                transform: translateX(-50%);
                width: calc(~"100% - 20px");
                .rem(line-height,30);
                .rem(height,30);
                .rem(border-radius,16);
                .ds-flex(@wrap: nowrap);
                color: #ffffff;
                background: rgba(0,0,0,0.4);
                z-index: 999;
                p {
                    color: #ffffff;
                    .rem(font-size,12);
                }
                i {
                    .rem(margin-left,10);
                    .rem(margin-right,10);
                    .rem(margin-top,-4);
                    .rem(font-size,18);
                }
            }
            /deep/ .van-loading {
                .rem(width, 40);
                .rem(height, 40);
                .positionCenter;
            }
            /deep/ .van-swipe {
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                .van-swipe-item {
                    img {
                        max-width: 100%;
                        display: block;
                        margin: 0 auto;
                        .positionCenter;
                    }
                }
                .van-swipe__indicator {
                    width: 10px;
                    height: 10px;
                    background: #fff;
                }
                .van-swipe__indicator--active {
                    background: @themeColor;
                    width: 18px;
                    border-radius: 10px;
                }
                .van-swipe__indicator:not(:last-child) {
                    margin-right: 10px;
                }
            }
        }
        .pro-tag{
            margin: 10px 0;
            background-color: #ffffff;
            text-align: center;
            .remTwoParams(padding,7,0);
            img{
                max-width: 150px;
            }
        }
        .prolist{
            background-color: #ffffff;
            .rem(padding,10);
            .row{
                display: flex;
                position: relative;
                .rem(margin-bottom,10);
                .img-box{
                    .rem(width,85);
                    position: relative;
                    img{
                        max-width: 100%;
                        max-height: 100%;
                        .positionCenter();
                    }
                }
                .text{
                    .rem(padding-left,10);
                    .title{
                        .rem(font-size,13);
                        .rem(margin-bottom,10);
                    }
                    .ser-dec{
                        .rem(font-size,12);
                        color: #808080;
                        .rem(margin-bottom,20);
                    }
                }
                .now-order{
                    background-color: @themeColor;
                    color: #ffffff;
                    border: none;
                    .remTwoParams(padding,4,10);
                    float: right;
                }
            }
        }
    }
</style>
