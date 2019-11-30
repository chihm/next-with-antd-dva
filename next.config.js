const withLessExcludeAntd = require('./next-less.config.js')
 
// choose your own modifyVars
const modifyVars = require('./antd-modify-vars')
 
if (typeof require !== 'undefined') {
  require.extensions['.less'] = (file) => {}
}
 
module.exports = withLessExcludeAntd({
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: '[local]___[hash:base64:5]',
    },
    lessLoaderOptions: {
      javascriptEnabled: true,
      modifyVars: modifyVars
    }
})








/*
const path = require('path');
const withLess = require('@zeit/next-less');

const modifyVars = require('./antd-modify-vars');

module.exports = withLess({
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars, // make your antd custom effective
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ]

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      });
    }

    return config
  },
})
*/