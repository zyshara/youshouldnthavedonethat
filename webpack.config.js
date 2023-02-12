/*
 *  filename: webpack.config.js
 *  description: --
 **/

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncWebpackPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    entry: {
        home: './src/index.js'
    },
    module: {
        rules: [
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/i,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(jpe?g|png|gif|mp4)$/i, 
                exclude: /node_modules/,
                type: 'asset/resource',
            },
            {
                test: /\.svg$/i,
                use: [{
                    loader: '@svgr/webpack',
                    options: {
                        svgoConfig: {
                            plugins: [{
                                name: 'cleanupIDs',
                                active: false,
                            }]
                        }
                    }
                }],
            },
            {
                test: /\.s[ac]ss$/i,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
        ]
    },
    devServer: {
        static: './dist',
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            filename: './home.html',
            template: './templates/index.html',
            chunks: ['home'],
            title: 'ｙｏｕ ｓｈｏｕｌｄｎｔ ｈａｖｅ ｄｏｎｅ ｔｈａｔ',
            meta: {
                themeColor: '#000',
            },
        }),
        new BrowserSyncWebpackPlugin({
            host: '192.168.1.63',
            port: '8080',
            proxy: 'http://192.168.1.63:3000',
        }),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        alias: {
            CSS: path.resolve(__dirname, './assets/scss'),
            Fonts: path.resolve(__dirname, './assets/fonts'),
            Images: path.resolve(__dirname, './assets/images'),
            Models: path.resolve(__dirname, './assets/models'),
        }
    }
}
