const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');
const pagesRoot = path.resolve(__dirname, '../src/pages');
let entries = fs.readdirSync(pagesRoot).reduce((entries, page) => {
    // 文件夹名称作为入口名称，值为对应的路径，可以省略 `index.js`，webpack 默认会寻找目录下的 index.js 文件
    entries[page] = path.resolve(pagesRoot, page);
    return entries;
}, {});
const htmlPlugins = Object.keys(entries).map(page => new HtmlWebpackPlugin({
    template: `${entries[page]}/index.html`,
    filename: `${page}.html`,
    chunks: [page,'main']
}))

const config = {
    entry: Object.assign(entries, {
        main: path.resolve(__dirname, '../src/main.js')
    }),
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src')
        }
    },
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }]
    },
    plugins: [
        ...htmlPlugins,
        new CleanWebpackPlugin()
    ]
}


module.exports = config;
