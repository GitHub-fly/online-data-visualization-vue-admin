<!--
 * @Description: 修改基本信息界面
 * @Author: xunmi
 * @Version: 1.0
 * @Date: 2021-05-18 21:35:37
-->
<template>
    <v-card class="d-flex flex-column">
        <v-card width="100%" height="80%" class="d-flex">
            <v-card width="20%" height="100%" class="d-flex flex-column align-center" tile elevation="0">
                <v-card height="140" width="140" class="mt-10">
                    <v-img src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg" width="100%" height="100%"></v-img>
                </v-card>
                <v-btn color="#006064" style="color: #ffffff" class="mt-3">修改头像</v-btn>
            </v-card>
            <v-card width="80%" height="100%" tile elevation="0" class="d-flex flex-column justify-space-around">
                <v-card
                    width="80%"
                    height="80"
                    class="d-flex justify-space-around align-center"
                    tile
                    elevation="0"
                    style="boder-bottom: 1px solid #f3f3f3"
                >
                    <v-card width="10%" tile elevation="0" class="d-flex align-center"
                        ><span style="font-weight: bold; font-size: 18px">昵称</span></v-card
                    >
                    <v-card width="60%" tile elevation="0" class="d-flex align-center">
                        <v-text-field :placeholder="userInfo.nickname" v-model="userInfo.nickname"></v-text-field>
                    </v-card>
                </v-card>
                <v-card
                    width="80%"
                    height="80"
                    class="d-flex justify-space-around align-center"
                    tile
                    elevation="0"
                    style="boder-bottom: 1px solid #f3f3f3"
                >
                    <v-card width="10%" tile elevation="0" class="d-flex align-center"
                        ><span style="font-weight: bold; font-size: 18px">账号</span></v-card
                    >
                    <v-card width="60%" tile elevation="0" class="d-flex align-center">
                        <v-text-field :placeholder="userInfo.account" v-model="userInfo.account" :disabled="true"></v-text-field>
                    </v-card>
                </v-card>
                <v-card
                    width="80%"
                    height="80"
                    class="d-flex justify-space-around align-center"
                    tile
                    elevation="0"
                    style="boder-bottom: 1px solid #f3f3f3"
                >
                    <v-card width="10%" tile elevation="0" class="d-flex align-center"
                        ><span style="font-weight: bold; font-size: 18px">密码</span></v-card
                    >
                    <v-card width="60%" tile elevation="0" class="d-flex align-center">
                        <v-text-field :placeholder="userInfo.password" v-model="userInfo.password"></v-text-field>
                    </v-card>
                </v-card>
                <v-card
                    width="80%"
                    height="80"
                    class="d-flex justify-space-around align-center"
                    tile
                    elevation="0"
                    style="boder-bottom: 1px solid #f3f3f3"
                >
                    <v-card width="10%" tile elevation="0" class="d-flex align-center"
                        ><span style="font-weight: bold; font-size: 18px">性别</span></v-card
                    >
                    <v-card width="60%" tile elevation="0" class="d-flex align-center">
                        <v-text-field :placeholder="userInfo.sex" v-model="userInfo.sex"></v-text-field>
                    </v-card>
                </v-card>
                <v-card
                    width="80%"
                    height="80"
                    class="d-flex justify-space-around align-center"
                    tile
                    elevation="0"
                    style="boder-bottom: 1px solid #f3f3f3"
                >
                    <v-card width="10%" tile elevation="0" class="d-flex align-center"
                        ><span style="font-weight: bold; font-size: 18px">居住地</span></v-card
                    >
                    <v-card width="60%" tile elevation="0" class="d-flex align-center">
                        <v-text-field :placeholder="userInfo.hometown" v-model="userInfo.hometown"></v-text-field>
                    </v-card>
                </v-card>
            </v-card>
        </v-card>
        <v-card width="100%" height="15%" class="d-flex align-center justify-space-around" tile elevation="0">
            <v-btn color="#006064" style="color: #ffffff" @click="updateUserInfo">保存</v-btn>
            <v-btn color="#006064" style="color: #ffffff" @click="prev"> 返回 </v-btn>
        </v-card>
    </v-card>
</template>

<script>
import { updateInfo } from '../../common/api/userapi'
export default {
    name: 'UpdateUser',

    data: () => ({
        userInfo: {},
    }),
    created() {
        this.userInfo = this.$store.state.userInfo
    },
    methods: {
        updateUserInfo() {
            let alertObj = {}
            updateInfo(this.userInfo).then((res) => {
                if (res.code == 1) {
                    alertObj = {
                        type: 'success',
                        content: '信息修改成功',
                    }
                } else if (res.code == 200012) {
                    alertObj = {
                        type: 'success',
                        content: '信息修改失败',
                    }
                }
                this.GLOBAL.pushAlertArrObj(alertObj)
            })
        },
        prev() {
            this.$router.go(-1)
        },
    },
}
</script>

<style lang="scss" scoped></style>
