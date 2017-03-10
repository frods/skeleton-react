const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    site: path.join(__dirname, 'site', 'index.tsx'),
    dist: path.join(__dirname, 'dist'),
};

module.exports = {
    entry: PATHS.site,
    output: {
        filename: "[name].js",
        path: PATHS.dist
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Recipe Finder',
        }),
    ],


    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                loader: 'tslint-loader',
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: "source-map-loader",
            },
            {
                test: /\.tsx?$/,
                loaders: ['awesome-typescript-loader'],
            }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
};