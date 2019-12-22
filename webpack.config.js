const path = require('path');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: "development",
    entry: {
        main: './src/main.js',
        login: './src/login.js',
        register: './src/register.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'build/javascripts')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    'vue-loader'
                ]
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: ['html-loader']
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: {
                                path: 'postcss.config.js'
                            }
                        }

                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: 'file-loader',
                exclude: path.resolve(__dirname, 'src/images'),
                options: {
                    name(file) {
                        if (process.env.NODE_ENV === 'development') {
                            return '[path][name].[ext]';
                        }
                        return '[contenthash].[ext]';
                    },
                    outputPath: 'asset/img',
                    esModule: false
                }
            },
        ],
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            template: './src/main.html',
            filename: './../main.html',
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            template: './src/login.html',
            filename: './../login.html',
            chunks: ['login']
        }),
        new HtmlWebpackPlugin({
            template: './src/register.html',
            filename: './../register.html',
            chunks: ['register']
        }),
        new VueLoaderPlugin(),
        new CopyPlugin([{
            from: path.resolve(__dirname, 'src/php'),
            to: path.resolve(__dirname, 'build/php')
        }]),
        new CopyPlugin([{
            from: path.resolve(__dirname, 'src/images'),
            to: path.resolve(__dirname, 'build/images')
        }])
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
        }
    }
    ,
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        port: 9000,
        hot: true,
    }
} 