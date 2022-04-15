module.exports = {
    title:"somnus",
    head:[
        ['link',{rel:'icon',href:'/favicon.ico'}],
        ['meta',{name:'author',content:'somnus-wang'}],
        ['meta',{name:'keywords',content:'vuepress介绍'}],
    ],
    themeConfig: {
      lastUpdated:'更新时间',
      logo: '/assets/img/123.png',
      nav: [
        { text: '首页', link: '/' },
        { text: '关于作者', link: '/about' },
        {
            text: '计算机网络',
            items: [
                { text: 'HTTP协议', link: '/http/HTTP常见知识点' },
                { text: 'TCP协议', link: '/http/TCP协议详解' },
            ]
        },
        {
            text: 'Java',
            items: [
                { text: '面向对象', link: '/Java/面向对象' },
                { text: 'Java集合', link: '/Java/Java集合' },
                { text: 'Java多线程', link: '/Java/Java多线程' },
            ]
        },
        {
            text: 'Redis',
            items: [
                { text: 'Redis数据结构', link: '/Redis/Redis的数据结构' },
            ]
        },
        {
            text: 'MySQL',
            items: [
                { text: 'MySQL的索引', link: '/' },
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
      ],
      sidebar:[
          '',
          'about',
          {
            title:'markdown基本语法',
            path:'/markdown/md快速入门',
            collapsable:false,
            sidebarDepth:1,
          },
          {
            title:'HTTP详解',
            path:'/http/',
            collapsable:false,
            sidebarDepth:1,
            children:[
                '/http/HTTP常见知识点',
            ]
          },
          {
            title:'Java',
            path:'/Java/',
            collapsable:false,
            sidebarDepth:1,
            children:[
                '/Java/面向对象',
                '/Java/Java集合',
                '/Java/Java多线程',
            ]
          },
          {
            title:'Redis详解',
            path:'/Redis/',
            collapsable:false,
            sidebarDepth:1,
            children:[
                '/Redis/Redis的数据结构',
            ]
          },
        ]
    }
}