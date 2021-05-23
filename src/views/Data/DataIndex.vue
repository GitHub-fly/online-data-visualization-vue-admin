<!--
 * @Description: 数据分析处理界面
 * @Author: xunmi
 * @Version: 1.0
 * @Date: 2021-05-18 21:29:26
-->
<template>
    <div>
        <div class="text-h5">系统中各类文件上传次数统计情况：</div>

        <v-card class="mt-6">
            <v-row no-gutters>
                <v-col cols="6" class="border">
                    <v-card flat tile outlined>
                        <ve-bar :data="chartData"></ve-bar>
                    </v-card>
                </v-col>
                <v-col cols="6" class="border">
                    <v-card flat tile outlined>
                        <ve-pie :data="chartData" :settings="chartSettings"></ve-pie>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script>
import { countNumber } from '../../common/api/sysdataapi'
export default {
    name: 'DataIndex',
    data: () => ({
        // 图表的配置项
        chartSettings: {
            roseType: 'radius',
            radius: 150,
            offsetY: 200,
        },
        chartData: {
            columns: ['name', 'number'],
            rows: [],
        },
    }),
    created() {
        this.initEchartsData()
    },
    methods: {
        async initEchartsData() {
            await countNumber().then((res) => {
                this.chartData.rows = res.data
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.border {
    // border: 1px solid red;
}
</style>
