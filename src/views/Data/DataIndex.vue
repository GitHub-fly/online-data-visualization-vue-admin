<!--
 * @Description: 数据分析处理界面
 * @Author: xunmi
 * @Version: 1.0
 * @Date: 2021-05-18 21:29:26
-->
<template>
    <div>
        <div>
            <div class="text-h5">系统中各类文件上传次数统计情况：</div>
            <v-card class="mt-6">
                <v-row no-gutters>
                    <v-col cols="6" class="border">
                        <v-card flat tile outlined>
                            <ve-histogram :extend="extend" :data="chartDataOfFileType"></ve-histogram>
                        </v-card>
                    </v-col>
                    <v-col cols="6" class="border">
                        <v-card flat tile outlined>
                            <ve-pie :data="chartDataOfFileType" :settings="chartSettings"></ve-pie>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card>
        </div>

        <div class="mt-6">
            <div class="text-h5">各时间段内用户调用接口的次数分析：</div>
            <v-card class="mt-6">
                <v-row no-gutters>
                    <v-col class="border">
                        <v-card flat tile outlined class="overflow-x-auto">
                            <ve-line :extend="extend" :data="chartDataOfApiNum"></ve-line>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card>
        </div>
    </div>
</template>

<script>
import { countNumber, handleApiNum } from '../../common/api/sysdataapi'
export default {
    name: 'DataIndex',
    data: () => ({
        extend: {
            series: {
                label: {
                    normal: {
                        show: true,
                    },
                },
            },
        },
        // 图表的配置项
        chartSettings: {
            roseType: 'radius',
            radius: 150,
            offsetY: 200,
        },
        chartDataOfFileType: {
            columns: ['name', 'number'],
            rows: [],
        },
        chartDataOfApiNum: {
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
                this.chartDataOfFileType.rows = res.data
            })
            await handleApiNum().then((res) => {
                this.chartDataOfApiNum.rows = res.data
            })
        },
    },
}
</script>

<style lang="scss" scoped></style>
