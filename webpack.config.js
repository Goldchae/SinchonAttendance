const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: [
    "./src/attend.ts",
    "./src/consts.ts",
    "./src/firebaseData.ts",
    "./src/form.ts",
    "./src/format.ts",
    "./src/time.ts",
  ],
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
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: [".tsx", ".ts", ".js", ".jsx", ".json", ".css"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Sinchon Attendance",
      template: "./src/index.html",
    }),
  ],
};
