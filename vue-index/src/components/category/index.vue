<template>
    <div id="classify">
        <div class="left_box" ref="leftNav">
            <ul class="nav_list" ref="ulNav">
                <li class="item"  ref="liNav" :class="{'active': currentIndex == index}" v-for="(nav,index) in navList" :key="nav.id"
                    @click="callItem(nav,index)">{{nav.name}}
                </li>
            </ul>
        </div>
        <div class="right_box" ref="rightNav">
            <div class="allItem" ref="allItem" v-for="(nav,index) in navList" :key="index">
                <p class="line-title">{{nav.name}}</p>
                <ul class="two_nav_box">
                    <li class="item" v-for="item in nav.product" @click="toProductList(item)">
                        <div class="img">
                            <img :src="cdn + item.imgURL" alt="">
                        </div>
                        <div class="item_box">
                            <p class="item_name">{{item.name}}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {getCate} from "api/cate"

    export default {
        name: "classify",
        data() {
            return {
                rightContent: '',
                currentIndex: 0,
                navList: [],
                isScroll: 0,
                posTop: false,
                posBottom: false,
                initScrollFlag: true,
                banner: [],
                rHeight: [],
                rClientHeight: 0,
                allHeihgt: 0,
                lHeihgt: [],
                lAllHeight: 0,
                cdn: process.env.CDN,
                rightListenFlag: true
            }
        },
        created() {
            this.getCate()
        },
        mounted() {
            const box = this.$refs.rightNav
            box.addEventListener('scroll', this.handlerScroller, false)
            this.rClientHeight = this.$refs.rightNav.clientHeight
        },
        beforeUpdate() {
            const _this = this
            this.$nextTick(() => {
                const liHeight = this.$refs.liNav[0].offsetHeight
                const rHeight = []
                this.$refs.allItem.forEach((v)=>{
                    this.allHeihgt += v.offsetHeight
                    rHeight.push(v.offsetTop)
                })
                if (_this.initScrollFlag) {
                    if (_this.currentIndex <= rHeight.length - 1) {
                        _this.$refs.rightNav.scrollTop = rHeight[_this.currentIndex]
                    }
                    _this.$refs.leftNav.scrollTop = _this.currentIndex * liHeight - _this.rClientHeight / 2 + liHeight / 2
                    _this.initScrollFlag = false
                }
            })
        },
        methods: {
            callItem(item, index) {
                this.posTop = false
                this.posBottom = false
                this.rightContent = item.name
                this.banner = this.cdn + item.imgURL
                this.currentIndex = index
                const rHeight = []
                this.allHeihgt = 0
                this.$refs.allItem.forEach((v)=>{
                    this.allHeihgt += v.offsetHeight
                    rHeight.push(v.offsetTop)
                })
                if (rHeight[index] > this.$refs.rightNav.scrollTop) {
                    this.rightListenFlag = false
                }
                if (index <= rHeight.length - 1) {
                    this.$refs.rightNav.scrollTop = rHeight[index]
                }
                const liHeight = this.$refs.liNav[0].offsetHeight
                this.$refs.leftNav.scrollTop = this.currentIndex * liHeight - this.rClientHeight / 2 + liHeight / 2

                this.$router.replace({path: 'category',query: {id: item.id}})
            },
            handlerScroller() {
                const _this = this
                const sctop = this.$refs.rightNav.scrollTop                            //滚动高度
                const rHeight = []
                this.$refs.allItem.forEach((v)=>{
                    this.allHeihgt += v.offsetHeight
                    if (v.offsetTop < _this.allHeihgt - _this.rClientHeight) {
                        rHeight.push(v.offsetTop)
                    }
                })
                rHeight.forEach((v,i)=>{
                    if (sctop >= v && sctop < _this.allHeihgt - _this.rClientHeight && this.rightListenFlag) {
                        _this.currentIndex = i
                    }
                })
                const lHeihgt = []
                this.$refs.liNav.forEach((v)=>{
                    _this.lAllHeight += v.offsetTop
                    lHeihgt.push(v.offsetTop)
                })
                if (!this.initScrollFlag) {
                    const liHeight = this.$refs.liNav[0].offsetHeight
                    lHeihgt.forEach((v,i)=>{
                        if (_this.currentIndex >= i && v <= _this.lAllHeight - _this.rClientHeight) {
                            _this.$refs.leftNav.scrollTop = v - _this.rClientHeight / 2 + liHeight / 2
                        }
                    })
                }
                this.rightListenFlag = true
            },
            getCate() {
                const _this = this
                getCate().then(res => {
                    if (!this.$route.query.id) {
                        this.rightContent = res.data[0].name
                        this.banner = _this.cdn + res.data[0].imgURL
                    } else {
                        res.data.forEach((v, i) => {
                            if (v.id == this.$route.query.id) {
                                _this.rightContent = v.name
                                _this.currentIndex = i
                                _this.banner = _this.cdn + v.imgURL
                            }
                        })
                    }
                    this.navList = res.data
                })
            },
            toProductList(item) {
                this.$router.push({path: '/serverDetail', query: {id: item.id}})
            }
        }
    }
</script>

<style scoped lang="less">
    #classify {
        .positionFix(@bottom: 0);
        background: #ffffff;
        overflow: hidden;
        .left_box {
            float: left;
            width: 25%;
            height: 100%;
            overflow-x: hidden;
            overflow-y: auto;
            background: @themeBgColor;
            .nav_list {
                .rem(line-height, 60);
                .rem(font-size, 14);
                text-align: center;
                overflow: hidden;
                .item {
                    .ellipsis;
                    &.active {
                        background: #ffffff;
                        color: @themeColor;
                    }
                }
            }
            .pos_show {
                position: fixed;
                left: 0;
                right: 75%;
                .rem(line-height, 60);
                text-align: center;
                background: #ffffff;
                color: @themeColor;
                display: none;
                &.top {
                    .rem(top, 46);
                    display: block;
                }
                &.bottom {
                    .rem(bottom, 50);
                    display: block;
                }
            }
        }
        .right_box {
            float: left;
            width: 75%;
            height: 100%;
            overflow-x: hidden;
            overflow-y: auto;
            .allItem{
                border-bottom: 1px solid #e5e5e5;
                box-sizing: border-box;
                .rem(padding-left,10);
                .line-title{
                    .rem(font-size,9);
                    .rem(line-height,22);
                    .rem(height,22);
                    color: #666666;
                }
                .two_nav_box{
                    width: 100%;
                    overflow: hidden;
                    li{
                        .rem(line-height,45);
                        .rem(height,45);
                        .ds-flex(@wrap: nowrap);
                        border-bottom: 1px solid #e5e5e5;
                        box-sizing: border-box;
                        &:last-of-type{
                            border-bottom: 0;
                        }
                        &:first-of-type{
                            border-top: 1px solid #e5e5e5;
                        }
                        .item_name{
                            .rem(font-size,14);
                            .rem(padding-left,10);
                        }
                        .img {
                            width: 15px;
                            height: 15px;
                            overflow: hidden;
                            position: relative;
                            img {
                                max-width: 100%;
                                max-height: 100%;
                                display: block;
                                .positionCenter;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
