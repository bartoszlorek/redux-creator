var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: [
        'babel-polyfill',
        './test/integration/index.js',
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'script.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    devtool: 'cheap-module-source-map',
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, '/test/integration'),
        port: 3000
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}