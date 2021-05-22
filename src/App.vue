<!--
 * @Description:
 * @Author: xunmi
 * @Version: 1.0
 * @Date: 2021-05-18 21:10:09
-->
<template>
    <v-app>
        <AlertDialog></AlertDialog>
        <router-view style="height: 100%" />
    </v-app>
</template>

<script>
import AlertDialog from './components/AlertDialog'

export default {
    components: {
        AlertDialog,
    },
}
</script>

<style lang="scss">
/* 所有文字都不允许被选择 */
* {
    user-select: none;
}
/* 所有按钮都变为手指头的样式 */
.v-btn {
    cursor: pointer;
}

/* 滚动条样式设置 */
*::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 8px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 5px;
}

*::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    height: 30px;
    background: rgb(183, 183, 183);
}

*::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    border-radius: 5px;
    background: rgb(229, 229, 229);
}
</style>
