const path = require("path");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMiniMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

// 获取cross-env 定义的环境变量
const isProduction = process.env.NODE_ENV === "production";

const getStyleLoaders = (pre) => {
  return [
    // "style-loader",
    isProduction ? MiniCssExtractPlugin.loader : "style-loader",
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
    pre && {
      loader: pre,
      options:
        pre === "less-loader"
          ? {
              //   覆盖antd, less变量
              lessOptions: {
                modifyVars: { "@primary-color": "red" },
                javascriptEnabled: true,
              },
            }
          : {},
    },
  ].filter(Boolean);
};

module.exports = {
  entry: "./src/main.js",
  output: {
    path: isProduction ? path.resolve(__dirname, "../dist") : undefined,
    filename: isProduction
      ? "static/js/[name].[contenthash:10].js"
      : "static/js/[name].js",
    chunkFilename: isProduction
      ? "static/js/[name].[contenthash:10].chunk.js"
      : "static/js/[name].chunk.js",
    assetModuleFilename: "static/media/[hash:10][ext][query]",
    // 清除打包记录
    clean: true,
  },

  resolve: {
    extensions: [".jsx", ".js", ".json"],
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
        test: /\.jsx?$/,
        include: path.resolve(__dirname, "../src"),
        loader: "babel-loader",
        options: {
          // js hmr
          plugins: [!isProduction && "react-refresh/babel"].filter(Boolean),

          cacheDirectory: true, // 开启babel缓存
          cacheCompression: false, // 关闭babel压缩
        },
      },
    ],
  },

  plugins: [
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

    isProduction &&
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "../public"),
            to: path.resolve(__dirname, "../dist"),
            globOptions: {
              ignore: ["**/index.html"],
            },
          },
        ],
      }),

    isProduction &&
      new MiniCssExtractPlugin({
        filename: "static/css/[name].[contenthash:10].css",
        chunkFilename: "static/css/[name].[contenthash:10].chunk.css",
      }),

    !isProduction && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),

  mode: isProduction ? "production" : "development",
  devtool: isProduction ? "source-map" : "cheap-module-source-map",

  // 开发服务器配置
  devServer: {
    port: 5000,
    open: true,
    host: "localhost",
    hot: true, // true是默认值，默认开启热更新
    historyApiFallback: true, // 解决前端路由404问题
  },

  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        //   react, react-dom单独打包
        react: {
          test: /[\\/]node_modules[\\/]react(.*)/,
          name: "chunk-react",
          priority: 40,
        },
        // antd单独打包
        antd: {
          test: /[\\/]node_modules[\\/]antd[\\/]/,
          name: "chunk-antd",
          priority: 30,
        },
        // node_modules单独打包
        lib: {
          test: /[\\/]node_modules[\\/]/,
          name: "chunk-libs",
          priority: 20,
        },
      },
    },

    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}.js`,
    },
    // 是否需要压缩
    minimize: isProduction,
    minimizer: [new CssMiniMinimizerPlugin(), new TerserWebpackPlugin()],
  },
  performance: false, // 关闭性能分析，提升打包速度
};
