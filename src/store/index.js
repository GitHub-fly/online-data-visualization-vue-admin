/*
 * @Description:
 * @Author: xunmi
 * @Version: 1.0
 * @Date: 2021-05-19 14:25:10
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // 提示框数组
        alertArr: [
            // {
            //     type: '',
            //     content: ''
            // }
        ],
        userInfo:{}
    },
    mutations: {
        /**
         * @description:   给提示框数组追加一个数据
         * @param {*} state
         * @param {*} obj   JSON 字符串类型 ---> 被添加的数据
         * @return {*}
         */
        pushAlertArrObj (state, obj) {
            state.alertArr.push(JSON.parse(obj))
        },
    },
    actions: {},
    modules: {},
})
