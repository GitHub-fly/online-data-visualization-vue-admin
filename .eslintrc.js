/*
 * @Description:
 * @Author: ycshang
 * @Version: 1.0
 * @Date: 2021-05-22 10:22:27
 */
module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ["plugin:vue/essential"],
    parserOptions: {
        parser: "babel-eslint",
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    },
}
