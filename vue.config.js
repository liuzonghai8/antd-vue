const path = require('path')

function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    devServer: {
        host: '0.0.0.0',
        port: '3030',
        disableHostCheck: true
    },

    chainWebpack: (config) => {
        config.resolve.alias
            .set('@$', resolve('src'))
            .set('@api', resolve('src/api'))
            .set('@assets', resolve('src/assets'))
            .set('@comp', resolve('src/components'))
            .set('@views', resolve('src/views'))
            .set('@layout', resolve('src/layout'))
            .set('@static', resolve('src/static'))
    },

    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    /* less 变量覆盖，用于自定义 ant design 主题 */
                    'primary-color': '#20985C',
                    // @primary-color: #1890ff;                         // 全局主色
                    // @link-color: #1890ff;                            // 链接色
                    // @success-color: #52c41a;                         // 成功色
                    // @warning-color: #faad14;                         // 警告色
                    // @error-color: #f5222d;                           // 错误色
                    // @font-size-base: 14px;                           // 主字号
                    // @heading-color: rgba(0, 0, 0, .85);              // 标题色
                    // @text-color: rgba(0, 0, 0, .65);                 // 主文本色
                    // @text-color-secondary : rgba(0, 0, 0, .45);      // 次文本色
                    // @disabled-color : rgba(0, 0, 0, .25);            // 失效色
                    // @border-radius-base: 4px;                        // 组件/浮层圆角
                    // @border-color-base: #d9d9d9;                     // 边框色
                    // @box-shadow-base: 0 2px 8px rgba(0, 0, 0, .15);  // 浮层阴影
                },
                javascriptEnabled: true,
            }
        }
    }
} 
