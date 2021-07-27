const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
       
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env','@babel/preset-react'],
            plugins: [
              "jsx-control-statements",
              "@babel/transform-runtime"
            ]
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'imgs/[name].[ext]',
            },
          },
        ],
      },
    ]
  },
  
  plugins: [
  
    new HtmlWebpackPlugin({
        inject:true,
        template: "build/index.html",
        filename: "index.html"
    }),
  ],
  
};