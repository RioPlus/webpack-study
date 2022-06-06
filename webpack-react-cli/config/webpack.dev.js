const path = require("path");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const getStyleLoaders = (pre) => {
  return [
    "style-loader",
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
          plugins: ["react-refresh/babel"],

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

    new ReactRefreshWebpackPlugin(),
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
