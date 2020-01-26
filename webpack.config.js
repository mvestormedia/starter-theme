const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");

module.exports = {
  context: __dirname,
  entry: {
    frontend: ["./src/sass/style.scss", "./src/js/navigation.js"]
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name]-bundle.js"
  },
  mode: "development",
  devtool: "cheap-eval-source-map",
  externals: {
    jquery: "jQuery"
  },
  module: {
    rules: [
      {
        enforce: "pre",
        exclude: /node_modules/,
        test: /\.jsx$/,
        loader: "eslint-loader"
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader"
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          { loader: "resolve-url-loader" },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images/",
              name: "[name].[ext]"
            }
          },
          "img-loader"
        ]
      }
    ]
  },
  plugins: [
    new StyleLintPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new BrowserSyncPlugin({
      files: "**/*.php",
      proxy: "https://something.mvestor.test:8890"
    })
  ]
};
