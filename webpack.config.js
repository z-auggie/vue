// 引入path
const path = require('path')
// 引入html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 创建html-webpack-plugin实例
const htmlPlugin = new HtmlWebpackPlugin({
  // 找到硬盘中的index.html文件
  template: path.join(__dirname, './src/index.html'),
  // 设置写入内存中的文件名字
  filename: 'index.html'
})

const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: 'development', //development开发环境不压缩  production上线环境压缩
  entry: path.resolve(__dirname, 'src/main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [ //所有webpack插件的配置节点
    htmlPlugin,
    new VueLoaderPlugin()
  ],
  module: { //配置所有第三方loader模块
    rules: [ // 第三方模块的匹配规则
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      // {test:/\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']},
      // 处理图片路径：limit 给定的值是图片的大小（单位：byte） 如果给定的limit大小 大于 图片大小那么会解析成base64格式的字符串，小于或等于则不会转为base64格式的字符串
      {
        test: /\.(jpg|png|gif|bmp|jpeg)$/,
        use: 'url-loader?limit=7632&[hash:8]-name=[name].[ext]'
      },
      // 处理字体文件
      {
        test: /\.(eot|ttf|svg|woff|woff2)$/,
        use: 'url-loader'
      },
      // ES6高级语法处理
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },

      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.js'
    }
  }
}