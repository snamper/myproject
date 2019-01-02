<template>
    <transition name="page">
        <div id="find_details">
            <div class="details">
                <h4 class="title">{{details.title}}</h4>
                <div class="sub_title">
                    <p>{{details.add_time}}</p>
                    <p><i class="van-icon" style="margin: 0 5px">&#xe619;</i>{{details.click}}</p>
                </div>
                <div class="content" v-html="details.content"></div>
            </div>
        </div>
    </transition>
</template>

<script>
    import {getDetail} from 'api/zixun'
    import {Cell, CellGroup} from 'vant'
    import wxShare from 'common/js/wxShare'

    export default {
        name: "findDetails",
        data() {
            return {
                details: {},
                cdn: process.env.CDN
            }
        },
        beforeRouteLeave(to, from, next) {
            from.meta.isBack = true
            next()
        },
        mounted() {
            this.getDetail()
        },
        methods: {
            getDetail() {
                getDetail({id: this.$route.query.id}).then((res) => {
                    if (res.status == 1) {
                        res.data.add_time = res.data.add_time.replace(/\-/g, "/").substr(0, 10)
                        this.details = res.data
                        // 在文章里的微信分享
                        wxShare(this.details.title, this.details.discription, this.cdn + this.details.img)
                    }
                })
            }
        },
        components: {
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup
        }
    }
</script>

<style scoped lang="less">
    #find_details {
        .positionFix(@bottom: 0);
        background: @themeBgColor;
        .details {
            padding: 10px;
            background: #ffffff;
            .title {
                .rem(font-size, 17);
                line-height: 2;
                color: #333333;
                text-align: center;
            }
            .sub_title {
                .rem(font-size, 12);
                .rem(line-height, 25);
                .ds-flex(@justContent: space-between);
                > p {
                    color: #999999;
                }
                border-bottom: 1px solid #e5e5e5;
            }
            .content {
                .rem(font-size, 14);
                .rem(line-height, 24);
                padding: 10px 0;
                p {
                    .rem(font-size, 14);
                    .rem(line-height, 24);
                    color: #666666;
                }
                img {
                    display: block;
                    max-width: 100%;
                    margin: 0 auto;
                }
            }
        }
        .article_list {
            margin-top: 10px;
            padding: 10px;
            background: #ffffff;
            > h4 {
                .rem(font-size, 14);
                line-height: 2;
                color: #333333;
            }
            /deep/ .van-cell {
                margin-top: 10px;
                background: @themeBgColor;
                border-left: 1px solid @themeColor;
            }
            /deep/ .van-icon {
                color: #999999;
                font-size: 0.32rem;
            }
            /deep/ .van-cell__title {
                overflow: hidden;
                .ellipsis;
            }
        }
        .small_title {
            .rem(font-size, 12);
            text-align: center;
            color: @themeColor;
        }
        .like_list {
            width: 100%;
            overflow: hidden;
            padding-bottom: 10px;
            .pay_num {
                width: calc(~"100% - 1rem");
            }
            .bottom {
                overflow: initial !important;
                p {
                    width: calc(~"100% - 1rem");
                    color: @themeColor;
                    .rem(font-size, 17);
                }
            }
        }
    }

    .page-enter-active, .page-leave-active {
        transition: all 1s ease-in-out;
    }

    .page-enter, .page-leave-to
        /* .list-leave-active for below version 2.1.8 */ {
        opacity: 0;
        transform: translateX(50%);
    }
</style>
