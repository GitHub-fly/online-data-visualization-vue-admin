<!--
 * @Description: 新增管理员界面
 * @Author: xunmi
 * @Version: 1.0
 * @Date: 2021-05-18 21:34:52
-->
<template>
    <div ref="parentDiv" style="position: relitive" class="d-flex flex-column align-center justify-center pt-6">
        <v-card width="100%" height="60" class="d-flex align-center" tile elevation="0">
            <v-btn @click="IsAddAdmin = true" color="#00838f" style="color: #ffffff">新增管理员</v-btn>
        </v-card>
        <v-overlay :value="IsAddAdmin" style="position: absolute; z-index: 1"></v-overlay>
        <v-card style="position: absolute; z-index: 100" width="450" height="400" v-if="IsAddAdmin" class="d-flex flex-column">
            <v-card height="70%" class="d-flex justify-space-around" tile elevation="0">
                <v-card width="30%" height="100%" class="d-flex justify-center" tile elevation="0">
                    <v-card width="80%" height="120" style="margin-top: 15px; border-radius: 10%" tile elevation="0">
                        <v-img src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg" height="100%" width="100%"></v-img>
                    </v-card>
                </v-card>
                <v-card width="55%" height="100%" class="mt-6" tile elevation="0">
                    <v-text-field placeholder="昵称" v-model="admin.account"></v-text-field>
                    <v-text-field placeholder="账号" v-model="admin.nickname"></v-text-field>
                    <v-text-field placeholder="初始密码:111111" :disabled="true"></v-text-field>
                </v-card>
            </v-card>
            <v-card height="20%" class="d-flex align-center justify-space-around" tile elevation="0">
                <v-btn color="#81d4fa" style="color: #ffffff" @click="addAdmin">确定</v-btn>
                <v-btn color="#e1f5fe" @click="IsAddAdmin = false">取消</v-btn>
            </v-card>
        </v-card>
        <v-data-table style="height: 100%; width: 100%" :headers="headers" :items="desserts" class="elevation-1 mt-3"></v-data-table>
    </div>
</template>

<script>
import { getAllAdmin, addAdmin } from '../../common/api/userapi.js'
export default {
    name: 'AddAdmin',
    data: () => ({
        adminInfo: [],
        IsAddAdmin: false,
        admin: { avatar: 'https://cdn.vuetifyjs.com/images/parallax/material2.jpg', account: '', nickname: '', password: '111111' },
        headers: [
            { text: 'account', value: 'account' },
            { text: 'avatar', value: 'avatar' },
            { text: 'sex', value: 'sex' },
            { text: 'nickname', value: 'nickname' },
            { text: 'hometown', value: 'hometown' },
            { text: 'password', value: 'password' },
            { text: 'createTime', value: 'createTime' },
            { text: 'isLogin', value: 'isLogin' },
            { text: 'roleId', value: 'roldId' },
            { text: 'isDisabled', value: 'isDisabled' },
            { text: 'updateTime', value: 'updateTime' },
            { text: 'userId', value: 'userId' },
        ],
        desserts: [],

        tableHeight: 0,
    }),
    created() {
        this.getAllAdminInfo()
    },
    methods: {
        getParentDivHeight() {
            console.log(this.$refs.parentDiv.offsetHeight)
        },
        getAllAdminInfo() {
            getAllAdmin().then((res) => {
                this.adminInfo = res.data
                console.log(res.data)
                this.desserts = res.data
            })
        },
        addAdmin() {
            let alertObj = {}
            addAdmin(this.admin).then((res) => {
                console.log(this.admin)
                if (res.code == 1) {
                    this.getAllAdminInfo()
                    alertObj = {
                        type: 'success',
                        content: '管理员添加成功',
                    }
                    ;(this.admin = {
                        avatar: 'https://cdn.vuetifyjs.com/images/parallax/material2.jpg',
                        account: '',
                        nickname: '',
                        password: '111111',
                    }),
                        (this.IsAddAdmin = false)
                } else if (res.code == 20010) {
                    alertObj = {
                        type: 'error',
                        content: '该管理员已存在',
                    }
                    this.admin = {
                        avatar: 'https://cdn.vuetifyjs.com/images/parallax/material2.jpg',
                        account: '',
                        nickname: '',
                        password: '111111',
                    }
                }
                this.GLOBAL.pushAlertArrObj(alertObj)
            })
        },
    },
    mounted() {
        this.getParentDivHeight()
    },
}
</script>

<style lang="scss" scoped></style>
