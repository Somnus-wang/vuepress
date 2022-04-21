module.exports = [
    '',
    'about',
    {
        title: 'markdown基本语法',
        path: '/markdown/md快速入门',
        collapsable: false,
        sidebarDepth: 1,
    },
    {
        title: 'HTTP详解',
        path: '/http/',
        collapsable: false,
        sidebarDepth: 1,
        children: [
            '/http/HTTP常见知识点',
        ]
    },
    {
        title: 'Java',
        path: '/Java/',
        collapsable: false,
        sidebarDepth: 1,
        children: [
            '/Java/面向对象',
            '/Java/Java集合',
            '/Java/Java多线程',
        ]
    },
    {
        title: 'Redis详解',
        path: '/Redis/',
        collapsable: false,
        sidebarDepth: 1,
        children: [
            '/Redis/Redis的数据结构',
        ]
    },
]