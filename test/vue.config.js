const path = require( 'path' )

function resolve ( dir ) {
  return path.join( __dirname, dir )
}

module.exports = {
  // publicPath: '/approvalflow/',
  publicPath: '/',
  lintOnSave: false,
  devServer: {
    port: 9030,
    host: '0.0.0.0',
    // useLocalIp: true,
    open:true,
    proxy: {
    '/api':{ // 要代理的接口名
        //target:'http://10.10.0.123:8088/planmanage',   // 要代理的接口地址
        target:'http://localhost:8088/planmanage',   // 要代理的接口地址
            changeOrigin:true,                            // 允许跨域
            pathRewrite:{'^/api':''}            // 接口名重写
          },
    }
  },

}
