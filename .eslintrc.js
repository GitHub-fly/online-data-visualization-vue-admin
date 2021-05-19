/*
 * @Description:
 * @Author: xunmi
 * @Version: 1.0
 * @Date: 2021-05-18 21:10:09
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
        'vue/valid-v-slot': ['error', { allowModifiers: true }]
    },
}