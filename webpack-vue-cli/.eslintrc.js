module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended"], // 这两个不用安装
  parserOptions: {
    parser: "@babel/eslint-parser", // 需要安装
  },
};
