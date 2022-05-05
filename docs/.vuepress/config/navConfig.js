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
            { text: 'Vuepress', link: '/frontend/vuepress/' },
        ]
    },
    {
        text: '后端',
        items: [
            { text: 'Java', link: '/backend/Java/Java的变量' },
            { text: '设计模式', link: '/backend/DesignPatterns/单例模式' },
            { text: 'MySQL', link: '/backend/MySQL/MySQL简介' },
            { text: 'Redis', link: '/backend/Redis/Redis的数据结构' },
            { text: 'Web服务器', link: '/backend/webserver/Tomcat详解' },
            { text: 'Shell', link: '/backend/Shell/Shell入门' },
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
        ]
    },
    {
        text: '学习资源',
        items: [
            { text: '尚硅谷', link: 'https://space.bilibili.com/302417610' },
            { text: '小林coding', link: 'https://xiaolincoding.com/' },
            { text: '代码随想录', link: 'https://www.programmercarl.com/' },
            { text: 'git', link: 'https://git-scm.com/about' },
            { text: '编程自学之路', link: 'https://r2coding.com/#/README' },
            { text: 'Github', link: 'https://github.com/' },
            { text: '光学仿真网站', link: 'https://design.3doptix.com/' },
            { text: '加速🚀', link: 'http://steampp.net/' },
        ]
    },
]