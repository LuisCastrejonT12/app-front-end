module.exports = {
    devServer: {
      proxy: {
        '/reqres': {
          target: 'https://reqres.in/',
            "pathRewrite": { '^/reqres': '' },
            "changeOrigin": true,
            "secure": false
        },
        '/jsonplaceholder': {
          target: 'https://jsonplaceholder.typicode.com/',
            "pathRewrite": { '^/jsonplaceholder': '' },
            "changeOrigin": true,
            "secure": false
        }
      }
    }
  }