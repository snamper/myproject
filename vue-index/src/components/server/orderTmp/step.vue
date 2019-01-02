<template>
    <div id="step">
        <div class="steps">
            <div class="pice" v-for="(item,index) in stepArr" :key="index" :class="index<=active?'active':''">
                <p class="text">{{item}}</p>
                <van-icon :name="index<=active?'checked':'check'"></van-icon>
            </div>
        </div>
        <slot name="text"></slot>
    </div>
</template>

<script>
    import {Icon} from 'vant'

    export default {
        name: "step",
        components: {
            [Icon.name]: Icon,
        },
        props: {
            active: {
                type: Number,
                default: null,
            },
            stepArr: {
                type: Array,
                default: [],
            }
        }
    }
</script>

<style lang="less">
    #step {
        width: 100%;
        background-color: #ffffff;
        padding: 10px 10px 20px;
        box-sizing: border-box;
        .steps{
            display: flex;
            width: 80%;
            margin: 0 auto 10px;
            .remTwoParams(padding,15,0);
            .pice{
                flex: 1;
                text-align: center;
                position: relative;
                .text{
                    margin-bottom: 10px;
                    .rem(font-size,13);
                }
                .van-icon{
                    .rem(font-size,18);
                }
                &:after{
                    content: '';
                    position: absolute;
                    width: calc(~"100% - 18px");
                    height: 1px;
                    background-color: #cccccc;
                    .rem(bottom,9);
                }
                &:last-of-type:after{
                    display: none;
                }
                &.active{
                    color: @themeColor;
                    &:after{
                        background-color: @themeColor;
                    }
                }
            }
        }
        .status-text{
            color: @themeColor;
            .rem(font-size,18);
        }
    }
</style>
