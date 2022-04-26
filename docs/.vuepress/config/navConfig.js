module.exports = [
    { text: '首页', link: '/' },
    { text: '关于作者', link: '/about' },
    {
        text: '快速开始',
        items: [
            { text: 'MarkDown', link: '/get-start/markdown/md快速入门' },
            { text: 'Vuepress', link: '/get-start/vuepress入门/vuepress快速上手' },
        ]
    },
    {
        text: '计算机网络',
        items: [
            { text: 'HTTP协议', link: '/network/http/HTTP常见知识点' },
            { text: 'TCP协议', link: '/network/tcp/TCP详解' },
        ]
    },
    {
        text: 'Java',
        items: [
            { text: 'Java基础', link: '/java/java基础/面向对象' },
            { text: 'Java高级', link: '/java/java高级/Java集合' },
            { text: '设计模式', link: '/java/设计模式/单例模式' },
        ]
    },
    {
        text: '数据库',
        items: [
            { text: 'MySQL', link: '/database/MySQL/MySQL简介' },
            { text: 'Redis', link: '/database/Redis/Redis的数据结构' },
        ]
    },
    {
        text: '云原生',
        items: [
            { text: 'docker', link: '/cloudnative/docker/Docker入门' },
            { text: 'kubernetes', link: '/cloudnative/kubernetes/kubernetes入门' },
        ]
    },
    {
        text: '摸鱼',
        items: [
            { text: 'bilibili', link: 'https://www.bilibili.com/' },
            { text: 'douyu', link: 'https://www.douyu.com/' },
            { text: 'DOTA2', link: 'https://www.dota2.com/' },
        ]
    },
]