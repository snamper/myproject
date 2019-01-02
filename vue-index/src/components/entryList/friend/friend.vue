<template>
    <div id="friend">
        <van-list v-model="loading" :finished="finished" @load="getFriendList" class="friend-list">
            <van-row class="friend-row" v-for="(item,index) in friendList" :key="index">
                <van-col span="3" class="head-img">
                    <img :src="item.headimgurl" alt="">
                </van-col>
                <van-col span="13" class="name">{{item.wxname}}</van-col>
                <van-col span="8" class="friend-dec">
                    <p class="time">{{item.add_time}}</p>
                    <span class="level">{{rank[item.rank]}}</span>
                </van-col>
            </van-row>
        </van-list>
        <div class="default" v-if="friendList.length == 0">
            <img src="./no-friend.png" alt="">
            <p>您还没有分享伙伴呢~~</p>
        </div>
    </div>
</template>

<script>
    import {getMyTeam} from '@/api/friend'
    import {List, Row, Col} from 'vant'

    export default {
        name: "friend",
        components: {
            [List.name]: List,
            [Row.name]: Row,
            [Col.name]: Col,
        },
        data() {
            return {
                loading: false,
                finished: false,
                friendList: [],
                rank: ['普通会员', 'VIP']
            }
        },
        methods: {
            getFriendList() {
                getMyTeam().then(res => {
                    res.data.forEach((v)=>{
                        v.add_time = v.add_time.substr(0, 10)
                    })

                    this.friendList = res.data
                    this.loading = false
                    this.finished = true
                })
            }
        }
    }
</script>

<style scoped lang="less">
    #friend {
        .positionFix(@bottom: 0);
        background: @themeBgColor;
        .friend-list {
            .friend-row {
                background: #ffffff;
                margin-bottom: 10px;
                .rem(padding, 10);
                .ds-flex();
                .head-img {
                    img {
                        width: 100%;
                        border-radius: 50%;
                    }
                }
                .name {
                    .rem(padding-left, 6);
                    .rem(font-size, 13);
                    color: #212121;
                }
                .friend-dec {
                    text-align: right;
                    .time {
                        .rem(font-size, 12);
                        color: #989898;
                    }
                    .level {
                        .rem(margin-top, 6);
                        display: inline-block;
                        .rem(font-size, 12);
                        color: @themeColor;
                    }
                }
            }
        }
        .default {
            img {
                display: block;
                .rem(width,160);
                .rem(margin-top,40);
                .rem(margin-bottom,20);
                margin-left: auto;
                margin-right: auto;
            }
            p {
                color: #666666;
                .rem(font-size,18);
                line-height: 1.4;
                text-align: center;
            }
        }
    }
</style>
