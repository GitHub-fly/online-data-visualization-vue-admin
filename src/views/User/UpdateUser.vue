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
                <v-hover>
                    <template v-slot:default="{ hover }">
                        <v-card class="avatar" max-width="200" max-height="200">
                            <img style="height: 200px; width: 200px" class="br-1" :src="userInfo.avatar" />
                            <v-fade-transition>
                                <v-overlay v-if="hover" absolute color="#f5f5f5">
                                    <v-btn @click="avatarClick()"
                                        >修改头像
                                        <input
                                            type="file"
                                            @change="uploadAvatar($event)"
                                            ref="file"
                                            style="display: none"
                                            id="file"
                                            accept="image/jpg, image/jpeg, image/png"
                                        />
                                    </v-btn>
                                </v-overlay>
                            </v-fade-transition>
                        </v-card>
                    </template>
                </v-hover>
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
const clickoutside = {
    // 初始化指令
    bind(el, binding) {
        function documentHandler(e) {
            // 这里判断点击的元素是否是本身，是本身，则返回
            if (el.contains(e.target)) {
                return false
            }
            // 判断指令中是否绑定了函数
            if (binding.expression) {
                // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
                binding.value(e)
            }
        }
        // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
        el.__vueClickOutside__ = documentHandler
        document.addEventListener('click', documentHandler)
    },
    update() {},
    unbind(el) {
        // 解除事件监听
        document.removeEventListener('click', el.__vueClickOutside__)
        delete el.__vueClickOutside__
    },
}
import { updateInfo } from '../../common/api/userapi'
export default {
    name: 'UpdateUser',

    data: () => ({
        userInfo: {},
    }),
    created() {
        this.userInfo = this.$store.state.userInfo
    },
    //注册指令
    directives: { clickoutside },
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
        avatarClick() {
            this.$refs.file.click()
        },
        uploadAvatar(event) {
            const OSS = require('ali-oss')
            let client = new OSS({
                region: 'oss-cn-hangzhou',
                accessKeyId: 'LTAI4G4j1GuS21gFVBoM4Njf',
                accessKeySecret: 'Ws0Vnbtwz1Q5fVCCbseZJ6eSEiBG3X',
                bucket: 'xunmimi',
            })
            let timestamp = Date.parse(new Date())
            let imgUrl = 'img/' + timestamp + '.' + 'jpeg'
            var file = event.target.files[0] //获取文件流
            var _this = this
            client.multipartUpload(imgUrl, file).then(function (result) {
                let index = result.res.requestUrls[0].indexOf('?')
                let url = result.res.requestUrls[0].slice(0, index)
                _this.userInfo.avatar = url
            })
        },
        prev() {
            this.$router.go(-1)
        },
    },
}
</script>

<style lang="scss" scoped></style>
