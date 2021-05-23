<!--
 * @Description: 用户基本信息界面
 * @Author: xunmi
 * @Version: 1.0
 * @Date: 2021-05-18 21:59:42
-->
<template>
    <div ref="parentDiv" style="position: relitive" class="d-flex flex-column align-center justify-center">
        <v-card width="100%" height="60" class="d-flex align-center justify-end" tile elevation="0">
            <v-menu v-ripple offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="#00838f" style="color: #ffffff; cursor: pointer" v-bind="attrs" v-on="on">排序 </v-btn>
                </template>

                <v-list>
                    <v-list-item v-ripple v-for="(item, index) in dropdown_font" :key="index" style="cursor: pointer">
                        <v-list-item-title @click="orderTable(index)">{{ item }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-card>
        <v-data-table style="height: 100%; width: 100%" :headers="headers" :items="desserts" class="elevation-1 mt-3"></v-data-table>
    </div>
</template>

<script>
import { getUserBehavior, orderByFileNumber, orderByConnNumber } from '../../common/api/userapi.js'
export default {
    name: 'DataTypess',
    data: () => ({
        userInfo: [],
        user: { nickname: '', account: '', connNumber: '', fileUploadNumber: '', isLogin: '' },
        dropdown_font: ['上传文件次数降序', '连接数据库次数降序'],
        headers: [
            { text: 'nickname', value: 'nickname' },
            { text: 'account', value: 'account' },
            { text: 'connNumber', value: 'connNumber' },
            { text: 'fileUploadNumber', value: 'fileUploadNumber' },
            { text: 'isLogin', value: 'isLogin' },
        ],
        desserts: [],
        tableHeight: 0,
    }),
    created() {
        this.getUserInfo()
    },
    methods: {
        getUserInfo() {
            getUserBehavior().then((res) => {
                this.userInfo = res.data
                this.userInfo.forEach((item) => {
                    ;(this.user = { nickname: '', account: '', connNumber: '', fileUploadNumber: '', isLogin: '' }), (this.user = item)
                    console.log(this.user)
                    this.desserts.push(this.user)
                })
            })
        },
        orderTable(index) {
            this.desserts = []
            if (this.dropdown_font[index] == '上传文件次数降序') {
                orderByFileNumber().then((res) => {
                    this.userInfo = res.data
                    this.userInfo.forEach((item) => {
                        ;(this.user = { nickname: '', account: '', connNumber: '', fileUploadNumber: '', isLogin: '' }), (this.user = item)
                        console.log(this.user)
                        this.desserts.push(this.user)
                    })
                })
            } else if (this.dropdown_font[index] == '连接数据库次数降序') {
                orderByConnNumber().then((res) => {
                    this.userInfo = res.data
                    console.log(res.data)
                    this.userInfo.forEach((item) => {
                        ;(this.user = { nickname: '', account: '', connNumber: '', fileUploadNumber: '', isLogin: '' }), (this.user = item)
                        console.log(this.user)
                        this.desserts.push(this.user)
                    })
                })
            }
        },
    },
}
</script>

<style lang="scss" scoped></style>
