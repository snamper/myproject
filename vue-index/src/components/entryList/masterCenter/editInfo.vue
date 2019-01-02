<template>
    <div id="editInfo">
        <div class="img_box">
            <div class="up-img">
                <van-uploader   :after-read="onRead" class="upbox">
                    <van-icon v-show="!head_img" name="weixiugongguanli" class="up-icon"/>
                    <img :src="cdn + head_img" alt="">
                </van-uploader>
                <i  v-show="head_img" class="van-icon van-icon-Group-" @click="head_img = ''"></i>
            </div>
            <p>点击上传头像</p>
            <p>建议上传真实照片</p>
        </div>
        <van-cell-group>
            <van-field label="姓名" v-model="true_name" input-align="right" placeholder="请输入用户名"/>
            <van-field label="身份证号" v-model="idcard" input-align="right" placeholder="请输入身份证号码"/>
            <van-cell title="性别" @click.native="showSex = true" :value="sexName" is-link/>
            <van-field label="住址" v-model="address" input-align="right" placeholder="请输入住址"/>
            <van-cell title="服务种类" @click="choseCate"  :value="cateName"  is-link/>
            <van-cell title="服务区域"  is-link :value="serverAddress"  @click = "choseArea" />
            <van-cell title="工作类型" @click.native="showVocation = true" :value="workName"   is-link/>
            <van-field label="手机" v-model="tel" input-align="right" placeholder="请输入手机号码"/>
            <van-field
                v-model="code"
                center
                clearable
                input-align="right"
                label="短信验证码"
                placeholder="请输入短信验证码"
            >
                <span slot="button" @click="sendMsg"  v-if="!showTime">获取验证码</span>
                <span slot="button" class="submit-code seconds" v-else>{{'(' + second + ')'}}</span>
            </van-field>
        </van-cell-group>
        <van-popup
            v-model="showSex"
            position="bottom"
        >
            <van-picker
                show-toolbar
                :columns="sexList"
                @confirm="getSex"
                @cancel="showSex = false"
            />
        </van-popup>
        <van-popup
            v-model="showVocation"
            class="vocation_box"
        >
            <van-radio-group v-model="type">
                <p class="title">请选择工作类型</p>
                <van-cell-group>
                    <van-cell title="全职" clickable @click="getWork1">
                        <van-radio name="1" />
                    </van-cell>
                    <van-cell title="兼职" clickable @click="getWork2">
                        <van-radio name="2" />
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
        </van-popup>
        <chose-area v-show="showChoseArea" @choseAreas = "getServerAddress"></chose-area>
        <chose-cate v-show="showChoseCate"   @choseCates = 'getCateList'></chose-cate>
        <div class="bottom">
            <van-button @click="subInfo" :loading="subLoading">修 改 完 成</van-button>
        </div>
    </div>
</template>

<script>
    import {Field, Cell, CellGroup, Picker, Popup, RadioGroup, Radio, Button, Uploader, Icon} from 'vant'
    import ChoseArea from '@/components/entryList/regMaster/choseArea'
    import ChoseCate from '@/components/entryList/regMaster/choseCate'
    import {editInfo, sendMsg, getMasterInfo, upLoadImg} from '@/api/master'
    export default {
        name: "editInfo",
        components: {
            [Field.name]: Field,
            [CellGroup.name]: CellGroup,
            [Picker.name]: Picker,
            [Popup.name]: Popup,
            [Cell.name]: Cell,
            [RadioGroup.name]: RadioGroup,
            [Radio.name]: Radio,
            [Button.name]: Button,
            [Uploader.name]: Uploader,
            [Icon.name]: Icon,
            ChoseArea,
            ChoseCate
        },
        data() {
            return {
                sexList: ["男", '女'],
                sexName: '男',
                sex: '1',                               //性别 ‘1’=> 男 ‘2’=> 女
                showSex: false,                         //显示性别picker
                workName: '全职',
                type: '1',                              //工作类型 ‘1’=> 全职 ‘2’=> 兼职
                showVocation: false,                    //显示工作类型选择框
                true_name: '',          //姓名
                idcard: '',             //身份证号
                tel: '',                //电话号码
                code: '',               //验证码
                showChoseArea: false,   //选择服务区域Flag
                address: '',            //住址
                serverAddress: '',      //服务区域 名字
                server_address_id: [],  //服务区域 id
                showChoseCate: false,               //选择服务种类Flag
                server_id: [],                      //服务种类 id
                cateName: '',                       //服务种类 名字
                second: 60,                         //验证码倒计时
                showTime: false,                    //验证码倒计时Flag
                subLoading: false,       //下一步 加载状态
                head_img: '',
                cdn: process.env.CDN
            }
        },
        created() {
            this.getInfo()
        },
        methods: {
            getInfo() {
                getMasterInfo().then((res)=>{
                    if (res.status == 1) {
                        res.data.server_address.forEach((v)=>{
                            this.serverAddress += v + '|'
                        })
                        res.data.project.forEach((v)=>{
                            this.cateName += v + '|'
                        })
                        this.cateName = this.cateName.substr(0,this.cateName.length - 1)
                        this.server_id = res.data.server_id
                        this.serverAddress = this.serverAddress.substr(0,this.serverAddress.length - 1)
                        this.server_address_id =  res.data.server_address_id
                        this.true_name = res.data.true_name
                        this.type = res.data.type
                        this.idcard = res.data.idcard
                        this.tel = res.data.tel
                        this.sex = res.data.sex
                        this.address = res.data.address
                        this.sexName = this.sexList[res.data.sex - 1]
                        this.head_img = res.data.head_img
                    }
                })
            },
            getSex(value,index) {
                this.sexName = value
                this.sex = index + 1
                this.showSex = false
            },
            getWork1() {
                this.type = "1"
                this.workName = "全职"
                this.showVocation = false
            },
            getWork2() {
                this.type = "2"
                this.workName = "兼职"
                this.showVocation = false
            },
            getServerAddress(msg) {
                this.serverAddress = ''
                this.showChoseArea = false
                this.server_address_id = []
                msg.forEach((v)=>{
                    this.server_address_id.push(v.value)
                    this.serverAddress += v.name + '|'
                })
                this.serverAddress = this.serverAddress.substr(0,this.serverAddress.length - 1)
            },
            choseArea() {
                this.$route.meta.title = "选择服务区域"
                this.$store.commit("SET_TITLE",this.$route.meta.title)
                this.showChoseArea = true
            },
            getCateList(msg) {
                this.cateName = ''
                this.showChoseCate = false
                this.server_id = []
                msg.forEach((v)=>{
                    this.server_id.push(v.id)
                    this.cateName += v.name + '|'
                })
                this.cateName = this.cateName.substr(0,this.cateName.length - 1)
            },
            choseCate() {
                this.$route.meta.title = "选择服务种类"
                this.$store.commit("SET_TITLE",this.$route.meta.title)
                this.showChoseCate = true
            },
            subInfo() {
                const params = {
                    true_name: this.true_name,
                    idcard: this.idcard,
                    sex: this.sex,
                    address: this.address,
                    server_id: this.server_id,
                    server_address_id: this.server_address_id,
                    type: this.type,
                    tel: this.tel,
                    code: this.code,
                    head_img: this.head_img
                }
                this.subLoading = true
                const _this = this
                editInfo(params).then((res)=>{
                    this.$toast(res.msg)
                    if (res.status == 1) {
                        this.subLoading = false
                        setTimeout(()=>{
                            this.$router.replace('/masterCenter')
                        },500)
                    } else {
                        setTimeout(()=>{
                            _this.subLoading = false
                        },500)
                    }
                })
            },
            sendMsg() {
                const params = {
                    tel: this.tel,
                    type: 1
                }
                const _this = this
                sendMsg(params).then((res)=>{
                    if (res.status == 1) {
                        this.showTime = true
                        const timer = setInterval(() => {
                            _this.second--
                            if (_this.second <= 0) {
                                clearInterval(timer)
                                this.showTime = false
                            }
                        }, 1000)
                    }
                })
            },
            onRead(file) {
                var formD = new FormData()
                formD.append("files", file.file)
                upLoadImg(formD).then((res)=>{
                    if (res.status == 1) {
                        this.head_img = res.data
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
    #editInfo {
        .positionFix(@bottom: 0);
        .vocation_box {
            width: 66.67%;
            border-radius: 10px;
            overflow: hidden;
            .title {
                color: #9d9d9d;
                .rem(font-size,13);
                .rem(line-height,44);
                padding: 0 10px;
            }
            /deep/ .van-icon {
                font-size: 0.48rem;
            }
            /deep/ .van-radio__input {
                height: 100%;
            }
        }
        /deep/ .van-cell {
            .rem(font-size, 13);
        }
        /deep/ .van-icon {
            font-size: 0.32rem;
        }
        /deep/ .van-cell__value {
            .ellipsis;
        }
        .bottom {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 1;
            .rem(height,50);
            .van-button {
                display: block;
                padding: 0;
                width: 100%;
                height: 100%;
                border: none;
                border-bottom-left-radius: 0;
                border-bottom-right-radius: 0;
                border-top-right-radius: 8px;
                border-top-left-radius: 8px;
            }
        }
        .img_box {
            padding: 10px;
            >p {
                text-align: center;
                .rem(font-size,12);
                .rem(line-height,16);
                color: #999999;
            }
            .up-img {
                .rem(width,50);
                .rem(height,65);
                box-sizing: border-box;
                border: 1px solid #f2f2f2;
                margin: 0 auto;
                position: relative;
                background: #ffffff;
                .upbox {
                    width: 100%;
                    height: 100%;
                    .ds-flex(@justContent: center;@direction: column);
                    overflow: visible;
                    position: relative;
                    .up-icon {
                        .rem(font-size,50);
                        color: #999999;
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
</style>
