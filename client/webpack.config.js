const path = require('path')
const webpack = require('webpack')
const dotenv = require('dotenv-webpack')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    entry: './js/main.js',
    resolve: {
        alias: {
            vue: '@vue/compat',
            'Components@': path.resolve(__dirname, 'js', 'components'),
            'Styles@': path.resolve(__dirname, 'css')
        }
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        compatConfig: {
                            MODE: 2
                        }
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  "style-loader",
                  "css-loader",
                  "sass-loader",
                ],
              }
        ]
    },
    plugins: [
        new dotenv(),
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,
        })
    ],
    watch: true
}