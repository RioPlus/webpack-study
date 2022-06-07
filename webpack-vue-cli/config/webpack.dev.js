const path = require("path");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const { DefinePlugin } = require("webpack");

const getStyleLoaders = (pre) => {
  return [
    "vue-style-loader",
    "css-loader",
    {
      //   处理css兼容
      // 配合package.json中的browserslist来指定兼容性
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: ["postcss-preset-env"],
        },
      },
    },
    pre,
  ].filter(Boolean);
};

module.exports = {
  entry: "./src/main.js",
  output: {
    path: undefined,
    filename: "static/js/[name].js",
    chunkFilename: "static/js/[name].chunk.js",
    assetModuleFilename: "static/media/[hash:10][ext][query]",
  },

  // 开发服务器配置
  devServer: {
    port: 5000,
    open: true,
    host: "localhost",
    hot: true, // true是默认值，默认开启热更新
    historyApiFallback: true, // 解决前端路由404问题
  },

  resolve: {
    extensions: [".vue", ".js", ".json"],
  },

  module: {
    rules: [
      // 处理css
      {
        test: /\.css$/,
        use: getStyleLoaders(),
      },
      // 处理less
      {
        test: /\.less$/,
        use: getStyleLoaders("less-loader"),
      },
      // 处理sass
      {
        test: /\.s[ac]ss$/,
        use: getStyleLoaders("sass-loader"),
      },
      // 处理styl
      {
        test: /\.styl$/,
        use: getStyleLoaders("stylus-loader"),
      },
      // 处理图片,转base64
      {
        test: /\.(jpe?g|png|gif|webp|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      //   处理其他资源，原封处理
      {
        test: /\.(woff2?|ttf)$/,
        type: "asset/resource",
      },
      // 处理js
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "../src"),
        loader: "babel-loader",
        options: {
          cacheDirectory: true, // 开启babel缓存
          cacheCompression: false, // 关闭babel压缩
        },
      },
      // 处理.vue文件
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ],
  },

  plugins: [
    new VueLoaderPlugin(),

    new DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),

    new EslintWebpackPlugin({
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules",
      cache: true,
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/eslintcache"
      ),
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
    }),
  ],

  mode: "development",
  devtool: "cheap-module-source-map",

  optimization: {
    splitChunks: {
      chunks: "all",
    },

    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}.js`,
    },
  },
};
