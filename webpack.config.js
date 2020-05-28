const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    mode: 'development',
    devServer:{
        contentBase:'./dist',
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template:'./src/index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/, //会自动检测所有以.js结尾的文件
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
        
    
};