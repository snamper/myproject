<template>
    <div id="myBank">
        <div class="bank-list">
            <van-swipe-cell :right-width="65" :left-width="0" class="demo-swipe-cell"
                            v-for="(item,index) in myBank" :key="index" @click.native="appCash(item.id)">
                <div class="bank-info">
                    <div class="top">
                        <img :src="cdn+item.bankinfo.icon" alt="" class="bank-icon">
                        <div class="dec">
                            <p class="name">{{item.bank_name}}</p>
                            <p class="type">储蓄卡</p>
                        </div>
                    </div>
                    <img :src="cdn+item.bankinfo.background" alt="" class="bank-bg">
                    <div class="account">{{item.bank_account.substr(0,4)+" **** **** "+item.bank_account.substr(-4)}}</div>
                </div>
                <span slot="right" class="right" @click="close(item.id)">删除</span>
            </van-swipe-cell>
        </div>
        <van-button class="add-btn" @click="addBank">添加银行卡</van-button>
    </div>
</template>

<script>
    import {myBankList, delBank} from '@/api/appCash'
    import {SwipeCell, Dialog, Button} from 'vant'

    export default {
        name: "myBankList",
        data() {
            return {
                cdn: process.env.CDN,
                myBank: [],
            }
        },
        components: {
            [SwipeCell.name]: SwipeCell,
            [Dialog.name]: Dialog,
            [Button.name]: Button,
        },
        mounted() {
            this.$nextTick(function () {
                this.getBankList()
            })
        },
        methods: {
            getBankList() {
                myBankList().then(res => {
                    if (res.status == 1) {
                        this.myBank = res.data.data
                    }
                })
            },
            close(id) {
                Dialog.confirm({
                    message: '确定删除吗？'
                }).then(() => {
                    delBank({id: id}).then(res => {
                        this.$toast(res.msg)
                        this.getBankList()
                    })
                }).catch(() => {
                    return
                })
            },
            addBank() {
                this.$router.push('/addBank')
            },
            //前往提现
            appCash(id) {
                this.$router.push('/addBank?type=1&id=' + id)
            }
        }
    }
</script>

<style lang="less">
    #myBank {
        .positionFix(@bottom: 0);
        background: @themeBgColor;
        .rem(padding-bottom,50);
        .bank-list {
            padding: 0 10px;
        }
        .bank-info {
            .rem(padding, 10);
            .rem(height, 130);
            margin-top: 10px;
            box-sizing: border-box;
            .top {
                display: flex;
                .ds-flex();
                .bank-icon {
                    .rem(width, 40);
                    .rem(height, 40);
                    border-radius: 50%;
                }
                .dec {
                    flex: 1;
                    .rem(padding-left, 10);
                    .name {
                        .rem(font-size, 14);
                        .rem(margin-bottom, 4);
                        color: #ffffff;
                    }
                    .type {
                        .rem(font-size, 12);
                        color: #ffffff;
                    }
                }
            }
            .bank-bg{
                position: absolute;
                left: 0;
                top: 0;
                z-index: -1;
                width: 100%;
            }
            .account{
                padding: 10px 0;
                .remTwoParams(margin, 20, 10);
                color: #ffffff;
                font-size: 22px;
                text-align: center;
            }
        }
        .van-swipe-cell__right {
            color: #fff;
            .rem(font-size, 15);
            width: 65px;
            .rem(height, 130);
            display: inline-block;
            text-align: center;
            .rem(line-height, 130);
            background-color: #f44;
        }
        .add-btn {
            position: fixed;
            bottom: 0;
            width: 100%;
            border: 0;
        }
    }
</style>
