const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // connect plugin
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // connect plugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/**
 * Keep the following in mind:
 * - Webpack is a bundler that allows us to bundle
 *   and build our projects with ease.
 * 
 * - Babel is a transpiler allowing us to achieve backwards
 *   compatibility by turning our "new" JavaScript code into
 *   older JavaScript/EcmaScript versions.
 * 
 * - PostCSS is used to minify our CSS code, resulting in smaller 
 *   package sizes and faster load times via the browsers cache.
 */

module.exports = {
  devtool: "inline-source-map", // This option lets you choose a style of source mapping in a browser to enhance the debugging process.
  entry: {
    main: "./src/pages/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: "",
  },
  target: ["web", "es5"],
  stats: "errors-only", // only output when errors happen
  mode: "development",
  devServer: {
    static: path.resolve(__dirname, "./dist"), // specifies a folder from where to serve the application and its contents
    compress: true, // this will speed up file loading in development mode
    port: 8080, // will open your site at localhost:8080 (you can use another port)
    open: true, // site will open automatically in the browser after executing npm run dev
    liveReload: true,
    hot: false,
  },
  module: {
    rules: [ // this is an array of rules
      // add an object containing rules for Babel to it
      {
        // a regular expression that searches for all js files
        test: /\.js$/,
        // all files must be processed by babel-loader
        loader: "babel-loader",
        // exclude the node_modules folder, we don't need to process files in it
        exclude: "/node_modules/"
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            // add an options object
            options: { importLoaders: 1 }
          },
          // add postcss-loader
          "postcss-loader"
        ]
      },
      {
        // add the rule for processing files (explains how webpack should transfer the files to the dist folder, the 'type' property is responsible for this)
      test: /\.(png|svg|jpg|jpeg|webp|gif|woff(2)?|eot|ttf|otf)$/,
      type: "asset/resource"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: "./src/index.html" // path to our index.html file
      }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin()
  ],
};
