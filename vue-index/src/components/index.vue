<template>
    <div id="index">
        <van-nav-bar
            v-if="showTitle"
            :title="title"
            :left-arrow="showBack"
            @click-left="goBack"

        />
        <div id="container">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>
        <van-tabbar v-show="showBottom">
            <van-tabbar-item icon="yuyuejilu icon_item" to="/index"  :class="path == '/index' ? 'van-tabbar-item--active' : ''">预约中心</van-tabbar-item>
            <van-tabbar-item icon="wode icon_item"  to="/member" :class="path == '/member' ? 'van-tabbar-item--active' : ''">会员中心</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    import {NavBar, Icon, Search, Tabbar, TabbarItem} from 'vant'
    import {mapGetters} from 'vuex'
    // import wxShare from 'common/js/wxShare'

    export default {
        name: "index",
        data () {
            return {
                searchValue: '',
                path: '/index'
            }
        },
        created() {
            const urlArr = location.href.split('#')
            if (urlArr[1].indexOf('?') == -1) {
                this.path = urlArr[1]
            } else {
                const str = urlArr[1].match(/\/(\S*)\?/)[0]
                this.path = str.substr(0,str.length - 1)
            }
        },
        mounted() {
            this.$nextTick(() => {
                // wxShare()
            })
        },
        computed: {
            ...mapGetters(['title','showBack','showTitle','showBottom','showMore','user'])
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            },
            fetchData(to) {
                this.path = to.path
                if (this.path != '/prodetails' && this.path != '/findDetails') {
                    // wxShare()
                }
            },
        },
        watch: {
            '$route': 'fetchData'
        },
        components: {
            [NavBar.name]: NavBar,
            [Icon.name]: Icon,
            [Search.name]: Search,
            [Tabbar.name]: Tabbar,
            [TabbarItem.name]: TabbarItem
        }
    }
</script>

<style lang="less" scoped>
    #index {
        background: @themeBgColor;
        min-height: 100%;
        position: relative;
        #container {
            overflow-y: auto;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            -webkit-overflow-scrolling:touch;
        }
        .share {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 9;
        }
        /deep/.icon_item {
            .rem(font-size,22)
        }
        /deep/ .van-nav-bar {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            .rem(height,46);
        }
    }
</style>
