<template>
    <div class="row">
        <div class="item">
            <div class="img">
                <slot name="img"></slot>
            </div>
            <div class="info">
                <slot name="title" class="title"></slot>
                <slot name="pay_num" class="pay_num"></slot>
                <slot name="bot" class="bottom"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "single"
    }
</script>

<style scoped lang="less">
    .row {
        width: calc(~"100% - 20px");
        background: #fff;
        border-radius: 5px;
        margin-top: 10px;
        margin-left: 10px;
        float: left;
        overflow: hidden;
        &.column {
            width: calc(~"100% - 20px");
            margin: 10px auto;
            float: inherit;
            border-radius: 8px;
            overflow: hidden;
            .item {
                .ds-flex(@direction: row,@wrap: nowrap,@align: stretch);
                .img {
                    .padBox(@width:35.2%,@paddingBot: 35.2%);
                    margin-right: 10px;
                }
                .info {
                    flex: 1;
                    overflow: hidden;
                    margin-top: 0;
                    .ds-flex(@direction: column,@wrap: nowrap,@justContent: space-between,@align: flex-start);
                }
            }
        }
        .item {
            padding: 10px;
            margin-top: 5px;
            .ds-flex(@direction: column);
            .img {
                .padBox(@width: 20%);
                img {
                    .positionCenter;
                    max-width: 100%;
                    max-height: 100%;
                    display: block;
                }
            }
            .info {
                width: 100%;
                overflow: hidden;
                .title {
                    .rem(font-size,12);
                    color: #333333;
                    .rem(line-height,20);
                    .rem(height,40);
                    .ellipsiMore;
                }
                .pay_num {
                    .rem(font-size,12);
                    .rem(line-height,22);
                    color: #999999;
                }
                .bottom {
                    .ds-flex(@wrap: nowrap,@align: flex-end);
                    line-height: 1.5;
                    overflow: hidden;
                    .now_price {
                        .rem(font-size,17);
                        color: @themeColor;
                    }
                    .old_price {
                        .rem(font-size,12);
                        color: #999999;
                        text-decoration: line-through;
                    }
                }
            }
        }
    }
</style>
