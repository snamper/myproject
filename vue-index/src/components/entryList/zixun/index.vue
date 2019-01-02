<template>
    <div id="find_more" ref="findMore">
        <van-list
            v-model="loading"
            :finished="finished"
            :offset="20"
            :immediate-check="false"
            @load="onLoad"
            v-if="findList.length > 0"
        >
            <single class="column"  v-for="(item,index) in findList" :key="item.id" @click.native="goFinddetails(item)">
                <img v-lazy="item.img" slot="img">
                <h4 slot="title" class="title">{{item.title}}</h4>
                <div slot="bot" class="bottom">
                    <p>{{item.add_time}}</p>
                    <p><i class="van-icon" style="margin: 0 5px">&#xe619;</i>{{item.click}}</p>
                </div>
            </single>
        </van-list>
    </div>
</template>

<script>
    import Single from 'common/base/liItem/single'
    import {getFindList} from 'api/zixun'
    import {List} from 'vant'
    export default {
        name: "find",
        data() {
            return {
                findList: [],
                loading: false,
                finished: false,
                page: 1,
                per_page: 0,
                total: 0,
                cdn: process.env.CDN
            }
        },
        activated() {
            if (!this.$route.meta.isBack) {
                this.$route.meta.isBack = true
                this.page = 1
                this.finished = false
                this.findList = []
                this.getFindList()
            }
        },
        beforeRouteEnter(to,from,next) {
            next(vm =>{
                if (from.query.top && from.meta.isBack) {
                    vm.$refs.findMore.scrollTop = from.query.top
                }
            })
        },
        beforeRouteLeave(to,from,next) {
            to.query.top = this.$refs.findMore.scrollTop
            if (to.name != 'zixunDetails') {
                from.meta.isBack = false
            } else {
                from.meta.isBack = true
            }
            next()
        },
        methods: {
            getFindList() {
                const _this = this
                getFindList({page: this.page}).then((res)=>{
                    if (res.status == 1) {
                        res.data.data.forEach((v)=>{
                            v.img = _this.cdn + v.img
                            v.add_time = v.add_time.replace(/\-/g, "/").substr(0,10)
                            _this.findList.push(v)
                        })
                    }
                    this.loading = false
                    this.page = parseInt(res.data.current_page) + 1
                    if (parseInt(res.data.current_page) * parseInt(res.data.per_page) >= parseInt(res.data.total)) {
                        this.finished = true
                    }
                })
            },
            onLoad() {
                this.getFindList()
            },
            goFinddetails(item) {
                this.$router.push({path: '/zixunDetails',query: {id: item.id}})
            }
        },
        components: {
            Single,
            [List.name]: List
        }
    }
</script>

<style scoped lang="less">
    #find_more {
        .positionFix(@bottom: 0);
        background: @themeBgColor;
        /deep/.img {
            .padBox(@width:42.39%,@paddingBot: 23.88%)!important;
            overflow: hidden;
            img {
                height: 100%;
                max-width: initial;
            }
        }
        /deep/ .info {
            margin-left: 10px;
        }
        /deep/.bottom {
            justify-content: space-between!important;
            width: 100%;
        }
        /deep/ .row.column {
            width: 100%;
            border-radius: 0;
        }
        /deep/ .item {
            .title {
                .rem(font-size,14);
            }
            .bottom {
                width: 100%;
                .ds-flex(@justContent: space-between);
                p {
                    color: #999999;
                }
            }
        }
    }
</style>
