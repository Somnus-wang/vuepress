# 使用docker部署vuepress

## 手动部署

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



## 自动部署

首先在每次修改完本地代码文件之后，使用git将项目文件上传到github，可以在项目的文件路径下打开git bash输入以下命令

```shell
git add .
git commit -m "描述信息"
git push
```

这样项目就会同步到我们的github仓库中。

使用远程ssh工具连接到服务器，在github中配置好服务器的公钥，安装好git，就可以从远程github仓库中拉取项目文件了。

```shell
## 进入或创建一个文件夹存放拉取下来的项目文件，我的路径是/home/docker-project
git clone xxx
## 此时就得到了项目文件，进入项目目录
cd vuepress
## 安装项目package.json中依赖项的模块
npm install
## 打包项目文件
vuepress build docs
## 打包完成后会生成dist文件夹，将此文件夹复制到与上文中dockerfile所在的目录，-r表示可以移动目录文件
cp -r /home/docker-project/vuepress/docs/.vuepress/dist /home/docker-project/somnus_vuepress/dist
## 随后进入dockerfile所在目录
cd /home/docker-project/somnus_vuepress
## 使用dockerfile构建镜像
docker build -f ./vuepress_dockerfile -t somnus-vuepress .
## 运行镜像
docker run -id --name=myvuepress -p 3000:80 somnus-vuepress
```

此时浏览器访问服务器ip的3000端口就可以访问了。

完整的脚本文件如下：

```shell
## 指定Shell解释器
#!/bin/bash
## 停止当前运行的容器
docker stop myvuepress
## 删除当前运行的容器
docker rm myvuepress
## 删除旧版本的镜像文件
docker rmi somnus-vuepress
## 进入旧版本dist文件所在目录
cd /home/docker-project/somnus_vuepress
## 删除旧版本的dist文件夹
rm -rf dist/
## 进入旧版本项目文件所在目录
cd /home/docker-project
## 删除旧版本项目文件
rm -rf vuepress/
## 拉取最新项目文件
git clone git@github.com:Somnus-wang/vuepress.git
## 进入项目目录
cd vuepress
## 安装项目package.json中依赖项的模块
npm install
## 打包项目文件
vuepress build docs
## 打包完成后会生成dist文件夹，将此文件夹复制到与上文中dockerfile所在的目录，-r表示可以移动目录文件
cp -r /home/docker-project/vuepress/docs/.vuepress/dist /home/docker-project/somnus_vuepress/dist
## 进入dockerfile所在目录
cd /home/docker-project/somnus_vuepress
## 构建docker镜像
docker build -f ./vuepress_dockerfile -t somnus-vuepress .
## 运行镜像
docker run -id --name=myvuepress -p 3000:80 somnus-vuepress
```

