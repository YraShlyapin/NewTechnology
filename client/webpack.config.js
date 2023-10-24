const path = require('path')
let { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    entry: './js/main.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
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
    ]
}