<template>
    <div id="reg-auditing">
        <img src="./reg_auditing.png" alt="">
    </div>
</template>

<script>
    export default {
        name: "regAuditing"
    }
</script>

<style scoped lang="less">
    #reg-auditing {
        .positionFix(@bottom: 0);
        background: @themeBgColor;
        img {
            width: 100%;
            display: block;
        }
    }
</style>
