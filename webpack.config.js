const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'none',
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // file-loader로 파일로 만들어줌.
      // {
      //   test: /\.(png|jpe?g|gif)$/i,
      //   loader: 'file-loader',
      //   options: {
      //     publicPath: './dist/src/assets',
      //     name: '[name].[ext]?[hash]',
      //   },
      // },
      // 용량 50000 미만인 녀석을 base64로 인코딩해서 인라인으로 넣어줌.
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'url-loader',
        options: {
          name: '[path][name].[ext]',
          limit: 50000,
          fallback: require.resolve('file-loader'),
        },
      },
    ],
  },
  devServer: {
    port: 8080,
    open: true,
    hot: true,
    // html 파일도 변경 시 hot reload
    watchContentBase: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        // changeOrigin: true,
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      // index.html 템플릿을 기반으로 빌드 결과물을 추가해줌
      template: 'src/index.html',
    }),
  ],
};
