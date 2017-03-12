const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    site: path.join(__dirname, 'site', 'index.tsx'),
    dist: path.join(__dirname, 'dist'),
};

const commonConfig = {
    entry: PATHS.site,
    output: {
        filename: "[name].js",
        path: PATHS.dist
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Recipe Finder',
            appMountId: 'site',
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
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // },
};

function productionConfig() {
    return commonConfig;
}

function developmentConfig() {
    const config = {
        devServer: {
          // Enable history API fallback so HTML5 History API based
          // routing works. This is a good default that comes
          // in handy in more complicated setups.
          historyApiFallback: true,
          // Don't refresh if hot loading fails. If you want
          // refresh behavior, set hot: true instead.
          hotOnly: true,
          // Display only errors to reduce the amount of output.
          stats: 'errors-only',
          // Parse host and port from env to allow customization.
          //
          // If you use Docker, Vagrant or Cloud9, set
          // host: options.host || '0.0.0.0';
          //
          // 0.0.0.0 is available to all network devices
          // unlike default `localhost`.
          host: process.env.HOST, // Defaults to `localhost`
          port: process.env.PORT, // Defaults to 8080
          // Enable error/warning overlay
          overlay: {
            errors: true,
            warnings: true,
          },
    }, plugins: [
          new webpack.HotModuleReplacementPlugin(),
          new webpack.NamedModulesPlugin(),
        ],
    };
      return Object.assign(
        {},
        commonConfig,
        config,
        {
          plugins: commonConfig.plugins.concat(config.plugins),
        }
    );
}

module.exports = function(env) {
  console.log('env', env);
  switch (env) {
    case "development":
        return developmentConfig();
    case "production":
    default:
        return productionConfig();
  }
};