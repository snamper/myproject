<template>
    <div id="upLoad">
        <p class="remarks">注：请把您的证件照片摆放整齐，并让信息清晰可见，不要模糊</p>
        <div class="upload-box">
            <h4 class="title">上传身份证正面照片</h4>
            <div class="box">
                <div class="img_box">
                    <h5 >参考照片</h5>
                    <div class="example-img">
                        <img src="./reg_example_01.png" alt="">
                    </div>
                </div>
                <div class="img_box">
                    <h5>你的照片</h5>
                    <div class="up-img">
                        <div class="upbox img-box" v-show="idcard_img">
                            <img :src="cdn + idcard_img" alt="">
                        </div>
                        <van-uploader v-show="!idcard_img" :after-read="onRead" class="upbox">
                            <van-icon name="tupian" class="up-icon"/>
                            <span>上传图片</span>
                        </van-uploader>
                        <i v-show="idcard_img" @click="idcard_img = ''" class="van-icon van-icon-Group-"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="upload-box">
            <h4 class="title">上传技能证书照片</h4>
            <div class="box">
                <div class="img_box">
                    <h5 >参考照片</h5>
                    <div class="example-img">
                        <img src="./reg_example_02.png" alt="">
                    </div>
                </div>
                <div class="img_box">
                    <h5>你的照片</h5>
                    <div class="up-img">
                        <div class="upbox img-box" v-show="skill_img">
                            <img :src="cdn + skill_img" alt="">
                        </div>
                        <van-uploader v-show="!skill_img" :after-read="onRead2" class="upbox">
                            <van-icon name="tupian" class="up-icon"/>
                            <span>上传图片</span>
                        </van-uploader>
                        <i v-show="skill_img" @click="skill_img = ''" class="van-icon van-icon-Group-"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="upload-box">
            <h4 class="title">上传头像</h4>
            <div class="box">
                <div class="img_box">
                    <h5 >参考照片</h5>
                    <div class="example-img">
                        <img src="./master-photo.png" alt="">
                    </div>
                </div>
                <div class="img_box">
                    <h5>你的照片</h5>
                    <div class="up-img">
                        <div class="upbox img-box" v-show="head_img">
                            <img :src="cdn + head_img" alt="">
                        </div>
                        <van-uploader v-show="!head_img" :after-read="onRead3" class="upbox">
                            <van-icon name="tupian" class="up-icon"/>
                            <span>上传图片</span>
                        </van-uploader>
                        <i v-show="head_img" @click="head_img = ''" class="van-icon van-icon-Group-"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <span @click="goBack">返回</span>
            <van-button @click="regOver">注册</van-button>
        </div>
    </div>
</template>

<script>
    import {Icon, Uploader, Button} from 'vant'
    import {upLoadImg, regComplete} from 'api/master'
    export default {
        name: "regNext",
        components: {
            [Icon.name]: Icon,
            [Uploader.name]: Uploader,
            [Button.name]: Button
        },
        data() {
            return {
                cdn: process.env.CDN,
                idcard_img: '',
                skill_img: '',
                head_img: ''
            }
        },
        methods: {
            onRead(file) {
                var formD = new FormData()
                formD.append("files", file.file)
                upLoadImg(formD).then((res)=>{
                    if (res.status == 1) {
                        this.idcard_img = res.data
                    }
                })
            },
            onRead2(file) {
                var formD = new FormData()
                formD.append("files", file.file)
                upLoadImg(formD).then((res)=>{
                    if (res.status == 1) {
                        this.skill_img = res.data
                    }
                })
            },
            onRead3(file) {
                var formD = new FormData()
                formD.append("files", file.file)
                upLoadImg(formD).then((res)=>{
                    if (res.status == 1) {
                        this.head_img = res.data
                    }
                })
            },
            goBack() {
                this.$router.back()
            },
            regOver() {
                const params = {
                    idcard_img: this.idcard_img,
                    skill_img: this.skill_img,
                    head_img: this.head_img
                }
                regComplete(params).then((res)=>{
                    if (res.status == 1) {
                        this.$router.replace('/masterRegSuccess')
                    } else {
                        this.$toast(res.msg)
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
    #upLoad {
        .positionFix(@bottom: 0);
        background: @themeBgColor;
        .rem(padding-bottom,50);
        .remarks {
            color: @themeColor;
            .rem(font-size,12);
            padding: 5px 10px;
            .rem(line-height,20);
        }
        .upload-box {
            margin-bottom: 10px;
            background: #ffffff;
            .rem(padding-bottom,25);
            .title {
                .rem(font-size,15);
                .rem(line-height,40);
                color: #333333;
                padding: 0 10px;
                border-bottom: 1px solid #f2f2f2;
                box-sizing: border-box;
            }
            .box {
                .ds-flex(@wrap: nowrap;@align: stretch);
                .img_box {
                    flex: 1;
                    overflow: hidden;
                    h5 {
                        .rem(font-size,12);
                        .rem(line-height,30);
                        color: #999999;
                        padding: 0 10px;
                    }
                    .example-img {
                        .ds-flex(@justContent: center);
                        .rem(width,150);
                        .rem(height,150);
                        margin: 0 auto;
                        img {
                            max-width: 100%;
                            max-height: 100%;
                        }
                    }
                    .up-img {
                        .rem(width,150);
                        .rem(height,150);
                        box-sizing: border-box;
                        border: 1px solid #f2f2f2;
                        margin: 0 auto;
                        position: relative;
                        .upbox {
                            width: 100%;
                            height: 100%;
                            .ds-flex(@justContent: center;@direction: column);
                            overflow: visible;
                            position: relative;
                            .up-icon {
                                .rem(font-size,60);
                                color: #999999;
                                .rem(margin-top,-10);
                                .rem(margin-bottom,10);
                            }
                            span {
                                display: block;
                                text-align: center;
                                .rem(font-size,18);
                                color: #999999;
                            }
                            img {
                                display: block;
                                max-width: 100%;
                                max-height: 100%;
                                .positionCenter;
                            }
                        }
                        .van-icon-Group- {
                            position: absolute;
                            right: -5px;
                            top: -5px;
                            padding: 5px;
                        }
                    }
                }
            }
        }
        .bottom {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            .rem(height,50);
            .rem(line-height,50);
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            overflow: hidden;
            .ds-flex(@wrap: nowrap);
            background: #ffffff;
            span {
                flex: 1;
                display: block;
                text-align: center;
                overflow: hidden;
                color: #666666;
                .rem(font-size,15);
            }
            button {
                flex: 1;
                overflow: hidden;
                display: block;
                height: 100%;
                .rem(line-height,50);
                padding: 0;
                border: 0;
                border-radius: 0;
                .rem(font-size,15);
            }
        }
    }
</style>
