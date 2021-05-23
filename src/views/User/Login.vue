<!--
 * @Description:  登录界面
 * @Author: xunmi
 * @Version: 1.0
 * @Date: 2021-05-19 13:22:37
-->
<template>
    <div class="d-flex justify-center align-center bg-div">
        <div class="form-div pa-2">
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field v-model="account" :counter="10" :rules="accountRules" label="账号" required dark></v-text-field>

                <v-text-field v-model="password" type="password" :rules="passwordRules" label="密码" required dark></v-text-field>

                <v-checkbox style="width: 40%" v-model="checkbox" label="记住密码" dark></v-checkbox>

                <v-row no-gutters class="px-2 mt-6" justify="space-between">
                    <v-btn width="100" :disabled="!valid" color="success" @click="validate"> 登录 </v-btn>

                    <v-btn width="100" color="warning" @click="reset"> 注册 </v-btn>
                </v-row>
            </v-form>
        </div>
    </div>
</template>

<script>
import { userLogin } from '../../common/api/userapi.js'
export default {
    name: 'Login',
    data: () => ({
        valid: true,
        account: '123123',
        accountRules: [(v) => !!v || '请输入账号'],
        password: '123123',
        passwordRules: [(v) => !!v || '请输入密码', (v) => (v && v.length >= 6) || '密码至少6位'],
        checkbox: false,
    }),
    methods: {
        validate() {
            this.$refs.form.validate()
            let alertObj = {}
            userLogin({ account: this.account, password: this.password }).then((res) => {
                console.log(res)
                if (res.code == 1) {
                    alertObj = {
                        type: 'success',
                        content: '登录成功',
                    }
                    setTimeout(() => {
                        this.$router.push({
                            path: '/index',
                        })
                    }, 1000)
                } else if (res.code == 20009) {
                    alertObj = {
                        type: 'error',
                        content: '用户不存在',
                    }
                } else if (res.code == 20002) {
                    alertObj = {
                        type: 'error',
                        content: '密码错误',
                    }
                }
                this.GLOBAL.pushAlertArrObj(alertObj)
            })
        },
        reset() {
            this.$refs.form.reset()
        },
    },
}
</script>

<style lang="scss" scoped>
.bg-div {
    background-repeat: no-repeat;
    background-position: center center;
    width: 100%;
    height: 100%;
    position: absolute;
    background-size: cover;
    background-image: url('../../assets/pic/bg.jpg');
    overflow: overlay;
}
.form-div {
    width: 23%;
    border-radius: 10px;
    // background-color: #fff;
}
</style>
