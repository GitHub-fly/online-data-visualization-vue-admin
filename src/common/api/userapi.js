/*
 * @Description:
 * @Author: xunmi
 * @Version: 1.0
 * @Date: 2021-05-21 16:03:50
 */
import { post } from '../request'

export async function userLogin (obj) {
    return await post('/login', obj)
}