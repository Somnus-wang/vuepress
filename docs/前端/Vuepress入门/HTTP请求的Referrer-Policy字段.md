## HTTP请求的Referrer-Policy字段

记录一个由于http请求头中由于Referrer-Policy（来源策略）导致的博客网站的第三方图床图片不显示的问题。

在使用vuepress搭建个人博客网站时，由于会在文章中插入大量的图片，而如果每次引用的图片都保存在本地的话，数量太多之后就不好管理，故引入了PicGo图床工具与Gitee结合，将图片都放在Gitee的开源仓库中，这样的话在写markdown文档时，可以直接将图片的引用地址都设置在图床中，[具体操作点击此处](https://zhuanlan.zhihu.com/p/373197860)。



但是将图片都上传到图床之后，发现网站上的图片都无法访问了，也没有报错，就是加载不出来

![屏幕截图 2022-04-29 225219](https://gitee.com/Somnus-wang/picgo-drawing-bed/raw/master/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202022-04-29%20225219.png)

在看了浏览器的请求信息后，显示如下：

![image-20220429230300965](https://gitee.com/Somnus-wang/picgo-drawing-bed/raw/master/image-20220429230300965.png)

可以看到访问图片的状态码都是403禁止访问，同时可以注意到此时的Referrer Policy为：strict-origin-when-cross-origin，在查询一些资料之后知道，得到：

- http请求体的header中有一个referrer字段，用来表示发起http请求的源地址信息，这个referrer信息是可以省略但是不可修改的，就是说你只能设置是否带上这个referrer信息，不能定制referrer里面的值。

- 服务器端在拿到这个referrer值后就可以进行相关的处理，比如图片资源，可以通过referrer值判断请求是否来自本站，若不是则返回403或者重定向返回其他信息，从而实现图片的防盗链。上面出现403就是因为，请求的是别人服务器上的资源，但把自己的referrer信息带过去了，被对方服务器拦截返回了403。

- 在前端可以通过meta来设置referrer policy(来源策略)，具体可以设置哪些值以及对应的结果参考[这里](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Referrer-Policy)。所以针对上面的403情况的解决方法，就是把referrer设置成`no-referrer`，这样发送请求不会带上referrer信息，对方服务器也就无法拦截了。

故解决的方法就是在HTML代码的head中添加

```javascript
<meta name="referrer" content="no-referrer"/>
```

体现在我们的网站中就是在headConfig.js文件中加入

```java
module.exports = [
    //['link', { rel: 'icon', href: '/favicon.ico' }],
    //['meta', { name: 'author', content: 'somnus-wang' }],
    //['meta', { name: 'keywords', content: 'vuepress介绍' }],
    ['meta', { name: 'referrer', content: 'no-referrer' }],
]
```

此时就可以看到我们的图片就加载正常了

![image-20220429231134713](https://gitee.com/Somnus-wang/picgo-drawing-bed/raw/master/image-20220429231134713.png)

![image-20220429231209683](https://gitee.com/Somnus-wang/picgo-drawing-bed/raw/master/image-20220429231209683.png)



参考：

> https://www.jianshu.com/p/56df73d0d128