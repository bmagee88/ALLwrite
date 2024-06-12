const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
  },
  // mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "..", "./src/index.html"), // Path to your HTML template
    }),
  ],
  // devServer: {
  //   contentBase: "./build", // Serve content from the 'build' directory
  // },
};
