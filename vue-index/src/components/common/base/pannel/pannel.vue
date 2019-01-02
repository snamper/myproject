<template>
    <section :class="[panelClass,cname]">
        <div class="top" v-if="hasTitle">
            <h4>
                <span class="title_left">{{ titleLeft }}&#8194;·&#8194;</span>
                <span class="title_right">{{ titleRight }}</span>
            </h4>
            <slot name="bot">GUESS WHAT YOU LIKE</slot>
        </div>
        <slot name="list"/>
    </section>
</template>

<script>
    export default {
        name: "pannel",
        props: {
            cname: {
                type: String,
                default: "",
            },
            titleLeft: {
                type: String,
                default: "",
            },
            titleRight: {
                type: String,
                default: "",
            },
            hasTitle: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                panelClass: "panel",
            }
        }
    }
</script>

<style scoped lang="less">
    .panel {
        .ds-flex(@justContent: center,@direction: column);
        .pannel(@beforeBg: url(./bd_left.png) no-repeat,@afterBg: url(./bd_right.png) no-repeat,@bgcolor: #f2f2f2);
    }
</style>

