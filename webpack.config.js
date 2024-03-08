const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx", // './src/index.tsx' './src/index.js' './src/index.jsx
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
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
    historyApiFallback: true, // SPA 라우팅을 위해 필요
    open: true, // 서버 시작 시 브라우저 오픈
    compress: true,
    port: 9000,
    hot: true,
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: [".tsx", ".ts", ".js", ".jsx", ".json", ".css"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Sinchon Attendance Development",
      template: "./src/index.html",
    }),
  ],
};
