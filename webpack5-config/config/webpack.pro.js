const base = require("./webpack.base.js");
const { merge } = require("webpack-merge");

module.exports = merge(base, {
  // mode: production 压缩
  mode: "production",
});
