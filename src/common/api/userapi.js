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
export async function getAllAdmin (obj) {
    return await post("/allUserInfo", obj)
}
export async function addAdmin (obj) {
    return await post("/addAdmin", obj)
}
export async function updateInfo (obj) {
    return await post("/updateUserInfo", obj)
}
export async function getUserBehavior (obj) {
    return await post("/getUserBehavior", obj)

}
export async function orderByFileNumber (obj) {
    return await post("/orderByFileNumber", obj)

}
export async function orderByConnNumber (obj) {
    return await post("/orderByConnNumber", obj)

}




