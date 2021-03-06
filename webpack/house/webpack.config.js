const path = require('path');
const fs = require('fs');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: {
        app: path.join(__dirname, 'src/app.js')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader'
        },{
            test: /\.css$/,
            loader: ["style-loader", "css-loader"]
        },{
            test: /\.(jpg|png|gif|jpeg|eot|ttf|woff|woff2|svg)$/,
            loader: 'url-loader'
        },{
            test: /\.(sass|scss)$/,
            loader: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }]
    },
    devServer: {
        port: 8080,
        before(app) {
            app.get('/api',(req, res) => {
                let filepath = path.join(__dirname,'static/data/data.json');
                let filedata = fs.readFileSync(filepath);
                res.end(filedata.toString());
            });
        }
    },
    plugins: [
        new Webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            inject: true
        })
    ]
}