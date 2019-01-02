<template>
    <div class="brief">
        <h4 class="server-type">{{info.project.name}}</h4>
        <div class="brief-info">
            <div class="left-info">
                <p class="no">订单号：{{info.no}}</p>
                <p class="time">下单时间：{{info.add_date}}</p>
                <p class="server-address">服务地址：{{info.post_address}}</p>
                <p class="server-time">预约时间：{{info.time}}</p>
            </div>
            <div class="right-photo">
                <img :src="cdn+info.master.head_img" alt="照片" v-if="info.master">
                <img src="./no_master.png" alt="" v-else>
                <p class="no-master" v-if="info.master">{{info.master.true_name}}</p>
                <p class="no-master" v-else>暂无师傅接单</p>
            </div>
        </div>
        <slot name="status"></slot>
    </div>
</template>

<script>
    export default {
        name: "brief",
        props: {
            info: {
                type: Object,
                default: {
                    master: {
                        true_name: ''
                    }
                },
            }
        },
        data() {
            return {
                cdn: process.env.CDN
            }
        }
    }
</script>

<style scoped lang="less">
    .brief {
        .server-type {
            .rem(font-size, 15);
            color: #333333;
            .remTwoParams(padding, 15, 10);
            border-bottom: 1px solid #e5e5e5;
        }
        .brief-info {
            .remTwoParams(padding, 10, 10);
            border-bottom: 1px solid #e5e5e5;
            display: flex;
            align-items: center;
            .left-info {
                flex: 1;
                p {
                    .rem(font-size, 12);
                    color: #999999;
                    line-height: 1.8;
                }
            }
            .right-photo {
                .rem(width, 60);
                margin-right: 10px;
                img {
                    width: 100%;
                }
                .no-master {
                    .rem(font-size, 10);
                    color: #999999;
                    .rem(width, 80);
                    .ellipsis();
                    margin-top: 4px;
                }
            }
        }
    }
</style>
