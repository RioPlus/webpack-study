const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 通过 npm 安装
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader"); // webpack5 引入

module.exports = {
  entry: "./src/main.js",
  output: {
    //   打包输出目录,必须是绝对路径
    path: path.join(__dirname, "../dist"),
    // 打包生成文件
    filename: "js/bundle.js",
  },

  module: {
    rules: [
      // css文件解析
      {
        test: /\.css$/,
        // style-loader把样式输出到页面  css-loader用于转换css文件
        // use: ["style-loader", "css-loader"],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              //   esModule: false,
              publicPath: "../",
            },
          },
          "css-loader",
        ],
      },
      // less文件解析
      {
        test: /\.less$/,
        // style-loader把样式输出到页面  css-loader用于转换css文件
        // use: ["style-loader", "css-loader"],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
            },
          },
          "css-loader",
          "less-loader",
        ],
      },
      // 配置图片解析, 默认都是base64， 这里是webpack4写法移植改造
      //   {
      //     test: /\.(jpg|png|gif|bmp|jpeg)$/,
      //     // webpack5要加上这个type: "javascript/auto" 以及options中的esModule：false
      //     type: "javascript/auto",
      //     use: {
      //       loader: "url-loader",
      //       options: {
      //         limit: 8 * 1024,
      //         // 必须写上
      //         esModule: false,
      //         name: "[name].[hash:8].[ext]",
      //         // 以下两者配置图片输出位置
      //         publicPath: "../images/",
      //         outputPath: "images/",
      //       },
      //     },
      //   },

      //  配置图片解析：webpack5中的写法
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset",
        //解析
        parser: {
          //转base64的条件
          dataUrlCondition: {
            maxSize: 10 * 1024, // 10kb  10kb以内转成base64,减少请求
          },
        },
        exclude: path.resolve(__dirname, "node_modules"),
        generator: {
          filename: "images/[name].[hash:8].[ext]",
        },
      },
      // 配置babel
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      // 配置vue-loader
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
    ],
  },
  plugins: [
    //   清空dist
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
    // 入口处引入的css文件分离出来
    new MiniCssExtractPlugin({
      filename: "src/index.css",
    }),
    new VueLoaderPlugin(),
  ],
};
