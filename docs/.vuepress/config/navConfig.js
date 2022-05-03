module.exports = [
    { text: '首页', link: '/' },
    { text: '关于作者', link: '/about' },
    //{ text: '快速开始', link: '/前端/Vuepress入门/vuepress快速上手' },
    {
        text: '操作系统',
        items: [
            { text: '内存管理', link: '/' },
            { text: '进程管理', link: '/' },
            { text: '文件系统', link: '/' },
        ]
    },
    {
        text: '计算机网络',
        items: [
            { text: 'HTTP协议', link: '/network/http/HTTP常见知识点' },
            { text: 'TCP协议', link: '/network/tcp/TCP协议详解' },
        ]
    },
    {
        text: '前端',
        items: [
            { text: 'Vuepress', link: '/前端/Vuepress入门/vuepress快速上手' },
        ]
    },
    {
        text: '后端',
        items: [
            { text: 'Java', link: '/后端/Java/Java中的数组' },
            { text: '设计模式', link: '/后端/设计模式/单例模式' },
            { text: 'MySQL', link: '/后端/MySQL/MySQL简介' },
            { text: 'Redis', link: '/后端/Redis/Redis的数据结构' },
            { text: 'Web服务器', link: '/后端/Web服务器/Tomcat详解' },
            { text: 'Shell', link: '/后端/Shell/Shell入门' },
        ]
    },
    {
        text: '算法',
        items: [
            { text: '排序算法', link: '/' },
        ]
    },
    {
        text: '面试',
        items: [
            { text: 'JVM八股文', link: '/'},
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