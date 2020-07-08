/*!
vue.config.js
created by tyz
date: 2020-06-11
 */
const path = require("path");
const webpack = require('webpack')

function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/' //如果生产环境的目录有子子路径，这里就要设置
        : './',

    assetsDir: "public",

    css: {
        loaderOptions: {
            sass: {
                data: `@import "@/assets/scss/_global.scss";`
            }
        }
    },


    devServer: {
        port: 8088, // 端口号
        host: 'localhost',
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
        proxy:{
            '/api':{
                target: 'http://localhost:8084',
                changeOrigin: true,
                // pathRewrite:{
                //     '^/api': ''
                // }
            }

        }
    },

    chainWebpack: config => {
        config.resolve.alias
            .set("@", resolve("src"))
            .set("@assets", resolve("src/assets"))
            .set("@components", resolve("src/components"));

    },

    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: [
                path.resolve(__dirname, "src/assets/scss/_global.scss")
            ]
        }
    }
};
