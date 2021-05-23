<!--
 * @Description: 新增管理员界面
 * @Author: xunmi
 * @Version: 1.0
 * @Date: 2021-05-18 21:34:52
-->
<template>
    <div ref="parentDiv" style="position: relitive" class="d-flex flex-column align-center justify-center">
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
            {
                text: 'Dessert (100g serving)',
                align: 'start',
                value: 'name',
            },
            { text: 'Calories', value: 'calories' },
            { text: 'Fat (g)', value: 'fat' },
            { text: 'Carbs (g)', value: 'carbs' },
            { text: 'Protein (g)', value: 'protein' },
            { text: 'Iron (%)', value: 'iron' },
        ],
        desserts: [
            {
                name: 'Frozen Yogurt',
                calories: 159,
                fat: 6.0,
                carbs: 24,
                protein: 4.0,
                iron: '1%',
            },
            {
                name: 'Ice cream sandwich',
                calories: 237,
                fat: 9.0,
                carbs: 37,
                protein: 4.3,
                iron: '1%',
            },
            {
                name: 'Eclair',
                calories: 262,
                fat: 16.0,
                carbs: 23,
                protein: 6.0,
                iron: '7%',
            },
            {
                name: 'Cupcake',
                calories: 305,
                fat: 3.7,
                carbs: 67,
                protein: 4.3,
                iron: '8%',
            },
            {
                name: 'Gingerbread',
                calories: 356,
                fat: 16.0,
                carbs: 49,
                protein: 3.9,
                iron: '16%',
            },
            {
                name: 'Jelly bean',
                calories: 375,
                fat: 0.0,
                carbs: 94,
                protein: 0.0,
                iron: '0%',
            },
            {
                name: 'Lollipop',
                calories: 392,
                fat: 0.2,
                carbs: 98,
                protein: 0,
                iron: '2%',
            },
            {
                name: 'Honeycomb',
                calories: 408,
                fat: 3.2,
                carbs: 87,
                protein: 6.5,
                iron: '45%',
            },
            {
                name: 'Donut',
                calories: 452,
                fat: 25.0,
                carbs: 51,
                protein: 4.9,
                iron: '22%',
            },
            {
                name: 'KitKat',
                calories: 518,
                fat: 26.0,
                carbs: 65,
                protein: 7,
                iron: '6%',
            },
        ],
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
                var admin = {}
            })
        },
        addAdmin() {
            let alertObj = {}
            addAdmin(this.admin).then((res) => {
                console.log(res)
                if (res.code == 1) {
                    alertObj = {
                        type: 'success',
                        content: '管理员添加成功',
                    }
                    this.admin = {}
                    this.IsAddAdmin = false
                } else if (res.code == 20010) {
                    alertObj = {
                        type: 'error',
                        content: '该管理员已存在',
                    }
                    this.admin = {}
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
