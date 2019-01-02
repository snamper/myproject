<template>
    <div class="customer-remark">
        <h4 class="title">{{title}}</h4>
        <slot name="input"></slot>
        <div class="remark-msg" v-html="memo" v-if="memo"></div>
        <div class="imgs">
            <div class="img-box" v-for="(item,index) in imgs" :key="index" @click="seeLarge(index)">
                <img :src="cdn+item" alt="">
            </div>
            <van-uploader :after-read="onRead" class="img-box" v-if="upFile">
                <p>
                    <van-icon name="tupian" class="up-icon"/>
                    上传图片
                </p>
            </van-uploader>
        </div>
    </div>
</template>

<script>
    import {ImagePreview, Uploader, Icon} from 'vant'

    export default {
        name: "remark",
        components: {
            [Uploader.name]: Uploader,
            [Icon.name]: Icon,
        },
        props: {
            title: {
                type: String,
                default: '',
            },
            memo: {
                type: String,
                default: '',
            },
            imgs: {
                type: Array,
                default: () => [],
            },
            isInput: {
                type: Boolean,
                default: false,
            },
            upFile: {
                type: Boolean,
                default: false,
            }
        },
        data() {
            return {
                cdn: process.env.CDN,
                flag: false,
            }
        },
        methods: {
            seeLarge(index) {
                if (!this.flag) {
                    var _this = this
                    this.imgs.forEach(function (v, i) {
                        _this.imgs[i] = _this.cdn + v
                    })
                    this.flag = !this.flag
                }
                ImagePreview({
                    images: this.imgs,
                    startPosition: index,
                })
            },
            onRead(file) {
                this.$emit('fileChange', file)
            }
        }
    }
</script>

<style scoped lang="less">
    .customer-remark {
        background-color: #ffffff;
        .title {
            color: @themeColor;
            .rem(font-size, 15);
            .remTwoParams(padding, 15, 10);
            border-bottom: 1px solid #e5e5e5;
        }
        .remark-msg {
            .remTwoParams(padding, 15, 10);
            .rem(font-size, 13);
            color: #333333;
            line-height: 1.6;
            min-height: 60px;
        }
        .imgs {
            .remTwoParams(padding, 10, 20);
            padding-bottom: 0;
            border-top: 1px solid #e5e5e5;
            .ds-flex();
            .img-box {
                .rem(width, 60);
                .rem(height, 60);
                margin-bottom: 10px;
                margin-right: 10px;
                text-align: center;
                border: 1px solid #e5e5e5;
                position: relative;
                img {
                    max-width: 100%;
                    max-height: 100%;
                }
                p {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 100%;
                    text-align: center;
                    color: #999999;
                    .up-icon {
                        display: block;
                        margin-bottom: 4px;
                        .rem(font-size, 28);
                        color: #999999;
                    }
                }
            }
        }
    }
</style>
