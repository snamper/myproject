<template>
    <div id="share" :style="backBgImg" @click="goBack()">
        <div class="user-info">
            <img :src="user.headimgurl" alt="" class="head-img">
            <p class="wx-name">阿斯蒂芬</p>
        </div>
        <img :src="cdn+userInfo" alt="" class="qrCode">
    </div>
</template>

<script>
    import bgImg from './shareCode.png'
    import {getQrCode} from '@/api/qrCode'
    import {mapGetters} from 'vuex'

    export default {
        name: "shareQrCode",
        data() {
            return {
                cdn: process.env.CDN,
                backBgImg: {
                    'background-image': "url(" + bgImg + ")",
                },
                userInfo: {},
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.getCode()
            })
        },
        computed: {
            ...mapGetters(['user'])
        },
        methods: {
            getCode() {
                getQrCode().then(res => {
                    this.userInfo = res.data
                })
            },
            //单击返回
            goBack() {
                this.$router.back()
            }
        }
    }
</script>

<style scoped lang="less">
    #share {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-color: #ffe24d;
        .user-info {
            width: 100%;
            position: fixed;
            top: 6%;
            flex-wrap: nowrap;
            .rem(font-size,15);
            .rem(padding,10);
            box-sizing: border-box;
            text-align: center;
            color: #323232;
            .head-img{
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background-color: #ffffff;
            }
            .wx-name{
                line-height: 1.6;
                .rem(font-size,15);
            }
        }
        .qrCode {
            position: absolute;
            bottom: 16%;
            .rem(width, 120);
            left: 50%;
            transform: translateX(-50%);
        }
    }
</style>
