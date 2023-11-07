const path = require('path')
let { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    entry: './js/main.js',
    resolve: {
        alias: {
            vue: '@vue/compat'
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
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
                
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
    watch: true
}