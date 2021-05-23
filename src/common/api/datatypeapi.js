/*
 * @Description:    系统权限模块接口
 * @Author: xunmi
 * @Version: 1.0
 * @Date: 2021-05-22 17:56:51
 */
import { post } from '../request'

export async function allDataTypeInfo () {
    return await post('/allDataTypeInfo')
}

export async function addOne (obj) {
    return await post('/addOne', obj)
}

export async function updateInfo (obj) {
    return await post('/updateInfo', obj)
}