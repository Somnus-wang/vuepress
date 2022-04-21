# Docker入门

## Docker概念

- Docker是一个开源的应用容器引擎
- 诞生于2013年初，基于Go语言实现
- Docker可以让开发者打包他们的应用以及依赖包到一个轻量级、可移植的容器中，然后发布到任何流行的Linux机器上
- 容器使用沙箱机制，相互隔离
- 容器性能开销极低



==总结==

docker是一种容器技术，解决软件跨环境迁移的问题



## 安装Docker

```shell
# 1.yum包更新到最新
yum update
# 2.安装需要的软件包，yum-util提供yum-config-manager功能，另外两个是devicemapper驱动依赖的
yum insatll -y yum-utils device-manager-persistent-data lvm2
# 3.设置yum源
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
# 4.安装docker，出现输入的界面都按y
yum install -y docker-ce
# 5.查看docker版本
docker -v
```

docker镜像加速（阿里云服务器专属地址）

加速器地址：https://59cf7npr.mirror.aliyuncs.com

配置镜像加速器

```shell
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://59cf7npr.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```



### Docker的架构

![docker架构](https://docs.docker.com/engine/images/architecture.svg)

#### Docker daemon

Docker 守护程序 ( `dockerd`) 侦听 Docker API 请求并管理 Docker 对象，例如图像、容器、网络和卷。守护进程还可以与其他守护进程通信以管理 Docker 服务。

#### Docker client

Docker 客户端 ( `docker`) 是许多 Docker 用户与 Docker 交互的主要方式。当使用诸如`docker run`之类的命令时，客户端会将这些命令发送到`dockerd`执行它们。该`docker`命令使用 Docker API。Docker 客户端可以与多个守护进程通信。



## Docker命令

```shell
# 启动dokcer
systemctl start docker
# 查看docker状态
systemctl status docker
# 关闭docker
systemctl stop docker
# 重启docker
systemctl restart docker
# 开机启动docker
systemctl enable docker
```



### Docker镜像相关命令

```shell
# 查看镜像
docker images
docker images -q  # 查看所有镜像id
# 搜索镜像
docker search redis
# 拉取镜像
docker pull redis:3.2
# 删除镜像
docker rmi [镜像id]
docker rmi redis:3.2
```



### Docker容器命令

```shell
# 查看容器
docker ps
# 创建容器
docker run -i -t --name=c1 centos:7 /bin/bash   
docke run -id --name=c2 centos:7    # -d 代表后台运行
exit # 退出容器
# 进入容器
docker exec -it c2 /bin/bash
# 启动容器
docker start c2
# 停止容器
docer stop c2
# 删除容器
docker rm [容器id]
docker rm [容器名称]
# 查看容器信息
docker inspect c2
```



## Docker容器的数据卷

- docker容器删除后，产生的数据会消失
- docker容器不能直接与外部机器交换文件
- 容器之间可以进行数据交互

==数据卷==

- 数据卷是宿主机中的一个目录，容器可以挂载在上面，修改可以同步
- 一个数据卷可以被多个容器同时挂载
- 一个容器也可以挂载多个数据卷

作用

1.容器数据持久化

2.外部机器和容器通信

3.容器之间可以交换数据



### 配置数据卷

```shell
# 创建启动容器时，使用-v参数 设置数据卷
docker run -v [宿主机目录:容器内目录]  # 目录必须为绝对路径，目录不存在会自动创建
```



### 数据卷容器

```shell
# 创建启动c3数据卷容器 使用-v
docker run -it --name=c3 -v /volume centos:7 /bin/bash
# 创建启动c1 c2容器，使用--volume-from参数 设置数据卷
docker run -it --name=c1 --volume-from c3 centos:7 /bin/bash
docker run -it --name=c2 --volume-from c3 centos:7 /bin/bash
```



## Docker应用部署

需求1：在docker中部署mysql，再通过外部mysql客户端操作mysql

实现步骤：1.搜索mysql镜像

​                   2.拉取mysql镜像

​                   3.创建容器

​				   4.操作容器中的mysql

- 容器内的网络服务和外部机器不能直接通信
- 外部机器可以和宿主机直接通信
- 宿主机可以和容器直接通信

通过端口映射让外部机器和容器进行通信，外部机器访问宿主机的3307端口，再将宿主机的3307端口与容器的端口3306做映射。

```shell
# 搜索镜像
docker search mysql
# 拉取mysql镜像
docker pull mysql:5.6
# 创建容器 设置端口映射 目录映射
mkdir ~/mysql
cd ~/mysql

docker run -id \
-p 3307:3306 \
--name=c_mysql \
-v $PWD/conf:/etc/mysql/conf.d \
-v $PWD/logs:/logs \
-v $PWD/data:/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=123456 \
mysql:5.6
```



需求2：在docker中部署Tomcat，通过外部机器访问Tomcat部署的项目

实现步骤：1.搜索mysql镜像

​                   2.拉取mysql镜像

​                   3.创建容器

​				   4.部署项目

​				   5.测试访问

```shell
# 拉取镜像
docker pull tomcat
# 创建容器  设置端口 目录映射
mkdir ~/tomcat
cd ~/tomcat

docker run -id --name=c_tomcat \
-p 8080:8080 \
-v $PWD:/usr/local/tomcat/webapps \
tomcat
```



需求3：在docker中部署nginx，通过外部机器访问nginx部署的项目

实现步骤：1.搜索nginx镜像

​                   2.拉取nginx镜像

​                   3.创建容器

​				   4.部署项目

​				   5.测试访问

```shell
mkdir ~/nginx
cd ~/nginx
mkdir conf
cd conf

vim nginx.conf
```

```shell
user  nginx;
worker_processes  1;
error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;
    
    keepalive_timeout  65;

    #gzip  on;
	
	include /etc/nginx/conf.d/*.conf;
}
```

```shell
docker run -id --name=c_nginx \
-p 80:80 \
-v $PWD/conf/nginx.conf:/etc/nginx/nginx.conf \
-v $PWD/logs:/var/log/nginx \
-v $PWD/html:/usr/share/nginx/html \
nginx
```



需求4：在docker中部署redis，通过外部机器访问redis部署的项目

实现步骤：1.搜索redis镜像

​                   2.拉取redis镜像

​                   3.创建容器

​				   4.测试访问

```shell
docker pull redis:5.0
# 创建容器 设置端口映射
docker run -id --name=c_redis -p 6379:6379 redis:5.0
# 使用外部机器连接redis
./redis-cli.exe -h 192.168.149.135 -p 6379
```



## Dockerfile

### docker镜像原理

Linux文件系统由bootfs和rootfs两部分组成：

- bootfs：包含bootloader（引导加载程序）和kernel（内核）
- rootfs：root文件系统，包含的就是典型的Linux系统的/dev /proc /bin /etc等标准目录和文件
- 不同的linux发行版，bootfs基本一样，而rootfs不同



- Docker镜像是由特殊文件系统叠加而成

- 最低端是bootfs，并使用宿主机的bootfs

- 第二层是root文件系统rootfs，称为base image

- 然后再往上可以叠加其他的镜像文件

- 统一文件系统（Union File System）技术能够在不同的层整合成一个文件系统，为这些层提供了一个统一的视角，这样就隐藏了多层的存在，在用户的角度看来，只存在一个文件系统
- 一个镜像可以放在另一个镜像的上面，位于下面的镜像称为父镜像，最底部的称为基础镜像

- 当从一个镜像启动容器时，Docker会在最顶层加载一个读写文件系统作为容器



### 镜像制作

1.容器转换成镜像

```shell
docker commit 容器id 镜像名称：版本号
# 镜像转换为压缩文件
docker save -o 压缩文件名称 镜像名称：版本号
# 将压缩文件转换为镜像
docker load -i 压缩文件名称
```



2.dockerfile

- Dockfile是一个文本文件

- 包含了一条条指令
- 每一条指令构建一层，基于基础镜像，最终构建出一个新的镜像
- 对于开发人员

| 关键字      | 作用                     | 备注                            |
| ----------- | ------------------------ | ------------------------------- |
| FROM        | 指定父镜像               | 指定dockerfile基于哪个image构建 |
| MAINTAINER  | 作者信息                 | 用来标明这个dockerfile谁写的    |
| LABEL       | 标签                     |                                 |
| RUN         | 执行命令                 |                                 |
| CMD         | 容器启动命令             |                                 |
| ENTRYPOINT  | 入口                     |                                 |
| COPY        | 复制文件                 | build的时候复制文件到image中    |
| ADD         | 添加文件                 | build的时候添加文件到image中    |
| ENV         | 环境变量                 |                                 |
| ARG         | 构建参数                 |                                 |
| VOLUME      | 定义外部可以挂载的数据卷 |                                 |
| EXPOSE      | 暴露端口                 |                                 |
| WORKDIR     | 工作目录                 |                                 |
| USER        | 指定执行用户             |                                 |
| HEALTHCHECK | 健康检查                 |                                 |
| ONBUILD     | 触发器                   |                                 |
| STOPSIGNAL  | 发送信号量到宿主机       |                                 |
| SHELL       | 指定执行的脚本shell      |                                 |



## Dockerfile案例

- 需求：自定义centos7镜像。1.默认登录路径为/usr 2.可以使用vim

```shell
# 拉取centos7的镜像
dokcer pull centos:7
# 定义父镜像
FROM centos:7
# 定义作者信息
MAINTAINER somnus
# 执行安装Vim命令
RUN yum install -y vim
# 设置默认的工作目录
WORKDIR /usr
# 定义容器启动执行的命令
CMD /bin/bash
```

在写好dockerfile之后，可以开始构建镜像了

```shell
docker build -f ./centos_dockerfile -t somnus_centos:1 .
# 镜像构建好之后，就可以运行了
docker run -it --name=c2 somnus_centos:1
```



- 需求：将springboot的项目部署在docker中运行

```shell
# 在写好一个springboot的项目之后，使用maven将其打成jar包，并上传到服务器指定路径
# 之后编写dockerfile
# 定义父镜像
FROM java:8
# 定义作者信息
MAINTAINER somnus
# 将jar包添加到容器
ADD dockerfile-test-0.0.1-SNAPSHOT.jar app.jar
# 定义容器启动执行的命令
CMD java -jar app.jar
# 通过docker build -f dockerfile文件路径 -t 镜像名称:版本

```



## Docker服务编排

服务编排：按照一定的业务规则批量管理容器

### Docker Compose

Docker Compose是一个编排多容器分布式部署的工具，提供命令集管理容器化应用的完整开发周期，包括服务构建，启动和停止。使用步骤：

1.利用Dockerfile定义运行环境镜像

2.使用docker-compose.yml定义组成应用的各服务

3.运行docker-compose up启动应用



## Docker容器虚拟化与传统虚拟机比较

容器就是将软件打包成标准化单元，以用于开发、交付和部署

- 容器镜像是轻量化的、可执行的独立软件包，包含软件运行所需要的所有内容：代码、运行时环境、系统工具、系统库和设置。
- 容器化软件在任何环境中都能始终如一地运行
- 容器赋予了软件独立性，使其免受外在环境差异的影响，从而有助于减少团队在相同基础设施上运行不同软件时的冲突。



相同点：

- 容器和虚拟机具有相似的资源隔离和分配优势

不同点

- 容器虚拟化的是操作系统，虚拟机虚拟化的是硬件
- 传统虚拟机可以运行不同的操作系统，容器只能运行同一类操作系统

| 特性       | 容器               | 虚拟机       |
| ---------- | ------------------ | ------------ |
| 启动       | 秒级               | 分钟级       |
| 硬盘使用   | 一般为MB           | 一般为GB     |
| 性能       | 接近原生           | 弱于         |
| 系统支持量 | 单机支持上千个容器 | 一般为几十个 |

