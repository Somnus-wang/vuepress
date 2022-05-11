# Linux常用软件安装教程

## Node.js

1. 打开[node.js官方中文网站](http://nodejs.cn/)，在下载中找到LTS（长期支持版本）

![image-20220510160714699](https://gitee.com/Somnus-wang/picgo-drawing-bed/raw/master/image-20220510160714699.png)

2. 下载好安装包之后，将其上传至服务器中，我选择的是默认路径/root/

   ![image-20220510160936112](https://gitee.com/Somnus-wang/picgo-drawing-bed/raw/master/image-20220510160936112.png)

3. 将其进行解压并移动其它文件夹

   ```shell
   ## 解压
   tar -xf node-v16.15.0-linux-x64.tar.xz
   ## 移动到/usr/local/node
   mv node-v16.15.0-linux-x64 /usr/local/node
   ```

4. 添加环境变量

   ```shell
   ## 打开/etc/profile
   vim /etc/profile
   
   ## 在末尾添加如下几行
   export NODEJS=/usr/local/node
   export PATH=$NODEJS/bin:$PATH
   
   ## 最后重新加载配置
   source /etc/profile
   ```

5. 测试是否成功安装

   ```shell
   ## 在任意路径下
   node -v
   ```

   如果出现版本号，说明成功安装

   ![image-20220510161753706](https://gitee.com/Somnus-wang/picgo-drawing-bed/raw/master/image-20220510161753706.png)



## JDK

1. 打开[oracle官方JDK8下载地址](https://www.oracle.com/java/technologies/downloads/#java8)(需注册登录方可下载)

   ![image-20220510164547347](https://gitee.com/Somnus-wang/picgo-drawing-bed/raw/master/image-20220510164547347.png)

   根据处理器指令集架构选择对应的版本进行下载，随后上传至服务器

2. ```shell
   ## 解压安装包
   tar -zxvf jdk-8u333-linux-x64.tar.gz
   
   ## 在根目录下创建DATA文件夹，可以将以后下载的应用都放在此文件夹下
   cd #
   cd ..
   mkdir DATA
   
   ## 将解压后的文件移动到/DATA/jdk
   mv jdk1.8.0_333 /DATA/jdk
   
   ## 添加环境变量
   vim /etc/profile
   
   ## 在末尾添加如下代码
   export JAVA_HOME=/DATA/jdk
   export CLASSPATH=$CLASSPATH:$JAVA_HOME/lib/
   export PATH=$PATH:$JAVA_HOME/bin
   
   ## 保存退出后刷新
   source /etc/profile
   ```

3. 检测是否安装成功

   ```shell
   ## 在任意路径下输入
   java -version
   ```

   如出现版本信息，则安装成功。

   ![image-20220510165323105](https://gitee.com/Somnus-wang/picgo-drawing-bed/raw/master/image-20220510165323105.png)



## Nginx

1. 在/usr/local下创建nginx目录

   ```shell
   cd /usr/local
   mkdir nginx
   
   ## 进入nginx目录
   cd nginx
   ```

2. 到[nginx](http://nginx.org/en/download.html)官网获取下载地址

   ![image-20220510170936734](https://gitee.com/Somnus-wang/picgo-drawing-bed/raw/master/image-20220510170936734.png)

右键复制链接地址，在服务器命令行使用wget进行下载

```shell
wget http://nginx.org/download/nginx-1.20.2.tar.gz

## 对其进行解压
tar -zxvf nginx-1.20.2.tar.gz
## 进入目录
cd nginx-1.20.2
```

执行./configure命令

- 若出现

  ![image-20220510174203455](https://gitee.com/Somnus-wang/picgo-drawing-bed/raw/master/image-20220510174203455.png)

则表示缺少pcre库，则需安装pcre

```shell
yum install -y pcre pcre-devel
```

- 若出现

  ![image-20220510174353045](https://gitee.com/Somnus-wang/picgo-drawing-bed/raw/master/image-20220510174353045.png)

```shell
## 则需安装zlib
yum install -y zlib zlib-devel
```

- 若执行完成出现

  ![image-20220510174511606](https://gitee.com/Somnus-wang/picgo-drawing-bed/raw/master/image-20220510174511606.png)

```shell
## 表示没有使用openssl功能，继续安装
yum install -y openssl openssl-devel
## 安装sha1
yum install -y perl-Digest-SHA1.x86_64
## 最后执行
./configure --with-http_stub_status_module --with-http_ssl_module
```

若出现

![image-20220510174733192](https://gitee.com/Somnus-wang/picgo-drawing-bed/raw/master/image-20220510174733192.png)

那么configure就通过了。

```shell
## 注意
./configure --prefix=/usr/local/nginx-1.7.0 \
--with-http_ssl_module --with-http_spdy_module \
--with-http_stub_status_module --with-pcre

–with-http_stub_status_module：支持nginx状态查询
–with-http_ssl_module：支持https
–with-http_spdy_module：支持google的spdy,想了解请百度spdy,这个必须有ssl的支持
–with-pcre：为了支持rewrite重写功能，必须制定pcre
```



3. 执行编译

   ```shell
   make  ## 确定你的服务器有安装make，如果没有安装请执行yum install make
   
   make install
   ```

4. 配置环境变量

   ```shell
   ## 在/etc/profile 中加入：
   export NGINX_HOME=/usr/local/nginx
   export PATH=$PATH:$NGINX_HOME/sbin
   
   ## 使配置文件生效
   source /etc/profile
   ```

   在任意目录下执行

   ```shell
   nginx -v
   ```

   出现![image-20220510175612911](https://gitee.com/Somnus-wang/picgo-drawing-bed/raw/master/image-20220510175612911.png)

   表示安装成功。

5. 运行

   ```shell
   /usr/local/nginx/sbin/nginx
   ```

   访问服务器ip地址的80端口，出现

   ![image-20220510185848618](https://gitee.com/Somnus-wang/picgo-drawing-bed/raw/master/image-20220510185848618.png)

   表示成功启动。



## Docker

1. 进入[docker官网文档](https://docs.docker.com/engine/install/centos/)安装docker

   - 先卸载旧版本

   ![image-20220510190603303](https://gitee.com/Somnus-wang/picgo-drawing-bed/raw/master/image-20220510190603303.png)

   ```shell
   sudo yum remove docker \
                     docker-client \
                     docker-client-latest \
                     docker-common \
                     docker-latest \
                     docker-latest-logrotate \
                     docker-logrotate \
                     docker-engine
   ```

   

   - 在新主机上首次安装Docker Engine之前，要设置Docker存储库，之后就可以从存储库安装和更新 Docker。安装`yum-utils`包（提供`yum-config-manager` 实用程序）并设置**稳定**的存储库。

   ```shell
   sudo yum install -y yum-utils
   sudo yum-config-manager \
       --add-repo \
       https://download.docker.com/linux/centos/docker-ce.repo
   ```

   - 安装Docker Engine

   ```shell
   sudo yum install docker-ce docker-ce-cli containerd.io docker-compose-plugin
   ```

   2. 安装成功后输入

      ```shell
      docker --version
      ```

   若出现dokcer版本号，表示成功安装。

   ![image-20220510191552124](https://gitee.com/Somnus-wang/picgo-drawing-bed/raw/master/image-20220510191552124.png)

   3. 启动docker

      ```shell
      sudo systemctl start docker
      ```

   4. 配置docker镜像加速

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




## Docker Compose

1. 进入[Docker官网docker-compose界面](https://docs.docker.com/compose/install/#install-the-binary-manually)

   ![image-20220511104045231](https://gitee.com/Somnus-wang/picgo-drawing-bed/raw/master/image-20220511104045231.png)

2. ```shell
   ## 使用curl下载docker-compose二进制文件
   curl -SL https://github.com/docker/compose/releases/download/v2.5.0/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose
   ## 对其添加可执行权限
   sudo chmod +x /usr/local/bin/docker-compose
   ## 测试安装
   docker-compose --version
   ```

   ![image-20220511112439868](https://gitee.com/Somnus-wang/picgo-drawing-bed/raw/master/image-20220511112439868.png)

若出现版本信息表示成功安装。



## Git

### 方式一

1. 使用yum安装git

   ```shell
   yum install -y git
   ## 查看git版本
   git --version
   ```

   ![image-20220511133514497](https://gitee.com/Somnus-wang/picgo-drawing-bed/raw/master/image-20220511133514497.png)

2. 设置用户名和邮箱

   ```shell
   ## 设置用户名
   git config --global user.name Somnus-wang
   ## 设置邮箱地址
   git config --global user.email 1059345965@qq.com
   ## 查看git配置
   git config --list
   ```

3. 绑定github远程仓库

   ```shell
   ## 在本地生成ssh key
   ssh-keygen -t rsa -C "邮箱地址"
   ```

   后续会出现三个待确认的选项，一路确定。此时ssh密钥就生成了，默认路径为/root/.ssh/id_rsa.pub

   使用vim打开id_rsa.pub，将里面的内容复制到github的ssh设置中。

   ![image-20220511134920974](https://gitee.com/Somnus-wang/picgo-drawing-bed/raw/master/image-20220511134920974.png)

此时，就可以进行git的相关操作了。