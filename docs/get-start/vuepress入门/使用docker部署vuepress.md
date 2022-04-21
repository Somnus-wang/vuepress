# 使用docker部署vuepress

在本地写好代码之后，执行package.json中的脚本

```json
"docs:build": "vuepress build docs"
```

此时，项目就被打包成了dist文件夹，在服务器任意目录下新建文件夹，使用远程工具如xshell或mobaxtrem等将dist文件夹上传上去，并在该目录下新建dockerfile文件。

内容如下：

```dockerfile
# 设置基础镜像
FROM nginx
# 定义作者信息
MAINTAINER somnus
# 将dist文件中的内容复制到 /usr/share/nginx/html 这个目录下面
COPY dist/ /usr/share/nginx/html
```

随后使用docker命令构建镜像

```shell
# -t 是给镜像取名
# 最后一个点“.” 代表使用当前路径下的dockerfile文件，也可以指定使用其他路径的
docker build -t somnus-vuepress .
```

此时查看当前的镜像

```shell
docker images
```

再启动容器

```shell
# -d 代表以daemon线程运行
# --name 给容器取名
# -p 配置端口映射  宿主机端口:容器端口
# 最后是使用的镜像名称
docker run -id --name=myvuepress -p 3000:80 somnus-vuepress
```

现在容器应该正常运行起来了，使用以下命令查看是否运行

```shell
docker ps -a
```

最后在浏览器中访问测试

http://xxx:3000

xxx代表服务器公网ip

