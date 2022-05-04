const headConfig = require("./config/headConfig.js");
const pluginsConfig = require("./config/pluginsConfig.js");
const navConfig = require("./config/navConfig.js");
const sidebarConfig2 = require("./config/sidebarConfig2.js");

module.exports = {
    title: "somnus",
    head: headConfig,
    plugins: pluginsConfig,
    themeConfig: {
        lastUpdated: '更新时间',
        logo: '/assets/img/123.png',
        nav: navConfig,
        sidebar: sidebarConfig2,
        //sidebar: 'auto',
    }
}