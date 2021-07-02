/*
 * @Description:
 * @Author: xunmi
 * @Version: 1.0
 * @Date: 2021-05-18 21:17:20
 */
module.exports = {
    devServer: {
        host: '127.0.0.1',
        port: 8888,
        https: false,
        open: true,
        hotOnly: true,
    },
    outputDir: './dist_admin',
    assetsDir: './assets/',
    publicPath: './',
    indexPath: './index.html',
    transpileDependencies: ['vuetify'],
}
