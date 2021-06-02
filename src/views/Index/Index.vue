<!--
 * @Description: 首页界面
 * @Author: xunmi
 * @Version: 1.0
 * @Date: 2021-05-18 21:29:26
-->
<template>
    <div style="height: 100%">
        <!-- 顶部 -->
        <v-app-bar style="z-index: 10; position: fixed" color="#81d4fa" dark>
            <v-icon large color="#fafafa"> mdi-domain </v-icon>

            <v-toolbar-title class="ml-8">后台管理</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-avatar class="mr-3" size="36">
                <img :src="this.userInfo.avatar" alt="John" />
            </v-avatar>

            <v-btn icon>
                <v-icon>mdi-heart</v-icon>
            </v-btn>

            <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <v-menu left bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item>
                        <v-list-item-title>
                            <router-link to="/"> 退出</router-link>
                        </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>
                            <router-link to="updateUser">个人信息</router-link>
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
            <!-- -->
        </v-app-bar>

        <div class="d-flex pt-16" style="height: 100%">
            <!-- 侧边栏 -->
            <v-navigation-drawer style="height: 100%; position: fixed" width="235" class="pt-14">
                <v-card height="100%" class="mx-auto" width="300">
                    <v-list height="100%" color="#b3e5fc">
                        <v-list-group v-for="item in items" :key="item.title" v-model="item.active" :prepend-icon="item.action" no-action>
                            <template v-slot:activator>
                                <v-list-item-content>
                                    <v-list-item-title v-text="item.title"></v-list-item-title>
                                </v-list-item-content>
                            </template>
                            <v-list-item ripple v-cursor v-for="child in item.items" :key="child.title" :to="child.path">
                                <v-list-item-content>
                                    <v-list-item-title v-text="child.title"></v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-group>
                    </v-list>
                </v-card>
                <!-- -->
            </v-navigation-drawer>

            <!-- 主题部分 -->
            <v-main style="height: 91%; padding-left: 235px">
                <!-- 给应用提供合适的间距 -->
                <v-container style="height: 100%" fluid>
                    <!-- 如果使用 vue-router -->
                    <router-view style="height: 100%" />
                </v-container>
            </v-main>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Index',
    data: () => ({
        userInfo: {},
        items: [
            {
                action: 'mdi-ticket',
                active: true,
                items: [
                    { title: '新增管理员', path: 'addAdmin' },
                    { title: '用户信息', path: 'userDataInfo' },
                ],
                title: '管理用户',
            },
            {
                action: 'mdi-silverware-fork-knife',
                items: [{ title: '修改数据源接入类型', path: 'dataType' }],
                title: '系统权限',
            },
            {
                action: 'mdi-school',
                items: [{ title: '数据分析', path: 'dataIndex' }],
                title: '系统数据',
            },
        ],
    }),
    created() {
        this.userInfo = this.$store.state.userInfo
    },
}
</script>

<style lang="scss" scoped></style>
