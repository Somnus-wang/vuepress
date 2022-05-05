const moment = require('moment');
const secret = require('./secret');

module.exports = {
    '@vuepress/last-updated': {
        transformer: (timestamp) => {
            moment.locale("zh-cn")
            return moment(timestamp).format("lll")
        }
    },
    '@vssue/vuepress-plugin-vssue': {
        // 设置 `platform` 而不是 `api`
        platform: 'github-v4',

        // 其他的 Vssue 配置
        owner: 'Somnus-wang',
        repo: 'vuepress',
        clientId: secret.clientId,
        clientSecret: secret.clientSecret,
        locale: 'zh',
        autoCreateIssue: true,
    },
    '@vuepress/back-to-top': true,
    //"vuepress-plugin-auto-sidebar": {
    //    output:{
    //        filename:'config/sidebarConfig1'
    //    },
    //    title:{
    //        mode:"uppercase",
    //    }
    //},
}