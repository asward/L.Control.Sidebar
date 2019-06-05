const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'L.Control.Sidebar.css',
            chunkFilename: 'L.Control.Sidebar.css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it uses publicPath in webpackOptions.output
                            publicPath: '../',
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    'css-loader',
                ],
            },
        ],
    },
    entry: './src/L.Control.Sidebar.js',
    mode: "development",
    watch: true,
    output: {
        filename: 'L.Control.Sidebar.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'var',
        library: 'sidebar',
        globalObject: 'this.L.control.'

    },
    devtool: 'source-map',
    
};