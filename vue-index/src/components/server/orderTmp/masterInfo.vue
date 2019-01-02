<template>
    <div class="master-info">
        <div class="photo">
            <img :src="cdn+masterInfo.head_img" alt="">
        </div>
        <div class="master">
            <p>姓名：{{masterInfo.true_name}} <strong class="identity">维修师傅</strong></p>
            <p>手机号码：{{masterInfo.tel}}</p>
            <p>服务种类：<span v-for="(item,index) in masterInfo.server" :key="index">{{item}} <span
                v-if="index+1!=masterInfo.server.length">、</span></span></p>
            <p>服务区域：<span v-for="(item,index) in masterInfo.server_address" :key="index">{{item}} <span
                v-if="index+1!=masterInfo.server_address.length">、</span></span></p>
            <slot name="tag"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "masterInfo",
        props: {
            masterInfo: {
                type: Object,
                default: function () {
                    return {}
                }
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
    .master-info {
        margin-bottom: 10px;
        .rem(padding, 10);
        background-color: #ffffff;
        .ds-flex();
        .photo {
            .rem(width, 80);
            img {
                max-width: 100%;
            }
        }
        .master {
            padding-left: 20px;
            flex: 1;
            p {
                line-height: 1.8;
                .rem(font-size, 10);
                color: #333333;
                .identity {
                    color: #ff0000;
                    display: inline-block;
                    margin-left: 10px;
                }
            }
        }
    }
</style>
