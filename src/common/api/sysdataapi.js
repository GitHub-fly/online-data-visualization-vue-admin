/*
 * @Description:    系统数据模块接口
 * @Author: xunmi
 * @Version: 1.0
 * @Date: 2021-05-23 12:54:32
 */
import { post } from '../request'

export async function countNumber () {
    return await post('/countNumber')
}