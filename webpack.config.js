const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: {
    main: [
      "./src/attend.ts",
      "./src/consts.ts",
      "./src/firebaseData.ts",
      "./src/form.ts",
      "./src/format.ts",
      "./src/time.ts",
    ],
    state: "./src/state.css",
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader", // translates CSS into CommonJS
        ],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 9000,
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: [".tsx", ".ts", ".js", ".jsx", ".json", ".css"],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new HtmlWebpackPlugin({
      title: "Sinchon Attendance",
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["main"],
    }),
    // state.html을 위한 설정
    new HtmlWebpackPlugin({
      title: "Sinchon State",
      template: "./src/state.html",
      filename: "state.html",
      excludeChunks: ["main"],
      chunks: ["state"],
    }),
  ],
};
