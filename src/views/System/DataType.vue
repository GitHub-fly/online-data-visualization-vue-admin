<!--
 * @Description: 控制数据源接入类型界面
 * @Author: xunmi
 * @Version: 1.0
 * @Date: 2021-05-18 21:56:43
-->
<template>
    <div>
        <v-data-table style="height: 100%" :headers="headers" :items="desserts" sort-by="calories" class="elevation-1">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>数据源接入类型</v-toolbar-title>
                    <!-- <v-divider class="mx-4" inset vertical></v-divider> -->
                    <v-spacer></v-spacer>

                    <!-- 新增对话框 -->
                    <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"> 新增类型 </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="headline">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.name" label="名称"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.cover" label="封面"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-select
                                                v-model="editedItem.isDisabled"
                                                :items="['true', 'false']"
                                                value="false"
                                                label="禁用"
                                            ></v-select>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
                                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                    <!-- 是否删除对话框 -->
                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>

            <!-- 操作按钮区域 -->
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
                <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>

            <template v-slot:no-data>
                <v-btn color="primary" @click="initialize"> Reset </v-btn>
            </template>
        </v-data-table>
    </div>
</template>

<script>
import { allDataTypeInfo, addOne, updateInfo } from '../../common/api/datatypeapi.js'
export default {
    name: 'DataTypess',

    data: () => ({
        dialog: false,
        dialogDelete: false,
        headers: [
            {
                text: '序号',
                align: '',
                value: 'id',
                divider: true,
                width: 80,
            },
            {
                text: '名称',
                divider: true,
                value: 'name',
            },
            {
                text: '封面',
                divider: true,
                align: 'center',
                value: 'cover',
                sortable: false,
                groupable: true,
            },
            {
                text: '禁用',
                divider: true,
                align: 'center',
                value: 'isDisabled',
                sortable: false,
                width: 80,
            },
            {
                text: '创建时间',
                divider: true,
                value: 'createTime',
                class: 'header',
            },
            {
                text: '修改时间',
                divider: true,
                value: 'updateTime',
            },
            {
                text: 'Actions',
                divider: true,
                align: 'center',
                value: 'actions',
                sortable: false,
            },
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
            name: '',
            cover: '',
            isDisabled: 'false',
        },
        defaultItem: {
            name: '',
            cover: '',
            isDisabled: 'false',
        },
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },

    created() {
        this.initialize()
    },

    methods: {
        async initialize() {
            await allDataTypeInfo().then((res) => {
                if (res.code == 1) {
                    res.data.forEach((item) => {
                        if (item.isDisabled == 1) {
                            item.isDisabled = 'false'
                        } else {
                            item.isDisabled = 'true'
                        }
                    })
                    this.desserts = res.data
                }
            })
        },

        editItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.desserts.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        async save() {
            this.editedItem = this.switchIsDisabled(this.editedItem, true)
            if (this.editedIndex > -1) {
                await updateInfo(this.editedItem).then((res) => {
                    if (res.code == 1) {
                        let dataTypeObj = res.data
                        this.editedItem = this.switchIsDisabled(dataTypeObj, false)
                        Object.assign(this.desserts[this.editedIndex], this.editedItem)
                    }
                })
            } else {
                await addOne(this.editedItem).then((res) => {
                    if (res.code == 1) {
                        let dataTypeObj = res.data
                        this.editedItem = this.switchIsDisabled(dataTypeObj, false)
                        this.desserts.push(this.editedItem)
                        this.close()
                    } else {
                        this.GLOBAL.pushAlertArrObj({
                            type: 'error',
                            content: res.msg,
                        })
                    }
                })
            }
            this.close()
        },

        switchIsDisabled(obj, isNumber) {
            if (isNumber) {
                if (obj.isDisabled == 'true') {
                    obj.isDisabled = 0
                } else {
                    obj.isDisabled = 1
                }
            } else {
                if (obj.isDisabled == 0) {
                    obj.isDisabled = 'true'
                } else {
                    obj.isDisabled = 'false'
                }
            }
            return obj
        },
    },
}
</script>

<style lang="scss" scoped>
.header {
    background-color: red;
    font-size: 20px;
    color: red;
}
</style>
