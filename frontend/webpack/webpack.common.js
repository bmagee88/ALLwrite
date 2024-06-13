const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: path.resolve(__dirname, "..", "./src/index.tsx"), // Entry point of your application
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      vm: require.resolve("vm-browserify"),
      buffer: require.resolve("buffer"),
      stream: require.resolve("stream-browserify"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [{ loader: "babel-loader" }],
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: {
          loader: "url-loader",
        },
      },
      {
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      // {
      //   test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
      //   type: "asset/resource",
      // },
      // {
      //   test: /\.(woff(2)?|eot|tff|oft|svg|)$/,
      //   type: "asset/inline",
      // },
    ],
  },
  output: {
    path: path.resolve(__dirname, "..", "./build"), // Output directory
    filename: "bundle.js", // Output filename
    publicPath: "/",
  },
  devServer: {
    static: path.resolve(__dirname, "..", "./build"),
    compress: true,
    port: 8080,
    historyApiFallback: true, // This tells the server to fallback to index.html for 404s
    proxy: {
      "/api": {
        target: "http://localhost:8000", // Proxy API requests to your backend server
        // changeOrigin: true,
        // secure: false,
      },
    },
    hot: true,
  },
  // mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "..", "./src/index.html"), // Path to your HTML template
    }),
    new webpack.HotModuleReplacementPlugin(), // Enable HMR
  ],
  // devServer: {
  //   contentBase: "./build", // Serve content from the 'build' directory
  // },
};
