# Tomcat详解

## Tomcat基础

### web概念

1.软件架构

c/s  客户端/服务器端     qq  360

b/s  浏览器/服务器端



2.资源分类

1.静态资源：所有用户访问后，得到的结果都是一样的，成为静态资源。静态资源可以直接被浏览器解析

如html css javascript jpg

2.动态资源：每个用户访问相同的资源后，得到的结果可能不一样，称为动态资源。动态资源被访问后，需要先转换为静态资源，再返回给浏览器，通过浏览器进行解析。

如servlet jsp  php  asp



3.网络通信三要素

1.IP

2.端口

3.传输协议



4.Tomcat目录结构

| 目录    | 目录下文件                | 说明                                                         |
| ------- | ------------------------- | ------------------------------------------------------------ |
| bin     | /                         | 存放Tomcat的启动、停止等批处理脚本文件                       |
|         | startup.bat、shutdown.bat | 用于windows下的启动脚本                                      |
|         | startup.sh、shutdown.sh   | 用于linux下的启动脚本                                        |
| conf    | /                         | 用于存放Tomcat的相关配置文件                                 |
|         | Catalina                  | 用于存储针对每个虚拟机的Context配置                          |
|         | context.xml               | 用于定义所有web应用均需加载的Context配置，如果web指定了自己的context.xml，该文件将被覆盖 |
|         | catalina.properties       | Tomcat的环境变量配置                                         |
|         | catalina.policy           | Tomcat运行的安全策略配置                                     |
|         | logging.properties        | Tomcat的日志配置文件                                         |
|         | server.xml                | Tomcat服务器的核心配置文件                                   |
|         | tomcat-users.xml          | 定义Tomcat默认的用户及角色映射配置信息                       |
|         | web.xml                   | Tomcat中所有应用默认的部署描述文件，主要定义了基础servlet和mime映射 |
| lib     | /                         | Tomcat服务器的依赖包                                         |
| logs    | /                         | Tomcat默认的日志存放目录                                     |
| webapps | /                         | Tomcat默认的web应用部署目录                                  |
| work    | /                         | Web应用JSP代码生成和编译的临时目录                           |



5.Tomcat启动停止

```
双击 bin/startup.bat 文件   //启动
双击 bin/shutdown.bat 文件  //停止
访问 http://localhost:8080
```



## Tomcat架构

如果不使用Tomcat作为web服务器，那么http服务器直接调用具体业务类，它们是紧耦合的。

但是在使用Tomcat之后，http服务器不直接调用业务类，而是把请求交给容器来处理，容器通过Servlet接口调用业务类。因此Servlet接口和Servlet容器的出现，达到了Http服务器与业务类解耦的目的。而Servlet接口和Servlet容器这一整套规范叫做Servlet规范。Tomcat按照servlet规范的要求实现了Servlet容器，同时它们也具有http服务器的功能。作为Java程序员，如果我们要实现新的业务功能，只需要实现一个servlet，并把它注册到Tomcat（Servlet容器）中，剩下的事情就由Tomcat帮我们处理了。



### Servlet容器工作流程

为了解耦，http不直接调用servlet，而是把请求交给Servlet容器来处理。当客户端请求某个资源时，http服务器会用一个ServletRequest对象把客户端的请求信息封装起来，然后调用Servlet容器的service方法，Servlet容器拿到请求后，根据请求的URL和Servlet的映射关系，找到相应的Servlet，如果Servlet还没有被加载，就用反射机制创建这个Servlet，并调用Servlet的init方法来完成初始化，接着调用Servlet的service方法来处理请求，把ServletResponse对象返回给http服务器，http服务器会把响应发送给客户端。



### Tomcat整体架构

![Tomcat基本架构](https://gitee.com/Somnus-wang/picgo-drawing-bed/raw/master/1928247-20200722195633574-852188578.png)



Tomcat需要实现两个核心的功能：

- 处理Socket连接，负责网络字节流与Request和Response对象的转化。
- 加载和管理Servlet，以及具体处理Request请求。

因此Tomcat设计了两个核心组件，连接器(Connector)和容器(Container)来分别做这两件事。连接器负责对外交流，容器负责内部处理。



### 连接器-Coyote

Coyote是Tomcat的连接器框架的名称，是Tomcat服务器提供的供客户端访问的外部接口。客户端通过Coyote与服务器建立连接、发送请求并接受响应。

Coyote封装了底层的网络通信（Socket请求及相应处理），为Catalina容器提供了统一的接口，是Catalina容器与具体的请求协议和IO操作完全解耦。Coyote将Socket输入转换封装为Request对象，交由Catalina容器进行处理，处理请求完成后，Catalina通过Coyote提供的Response对象将结果写入输出流。

Coyote作为独立的模块，只负责具体协议和IO的相关操作，与Servlet规范没有直接关系，因此即便是Request和Response对象也并未实现Servlet规范对应的接口，而是在Catalina中将他们进一步封装为ServletRequest和ServletResponse。



IO模型与协议

在Coyote中，Tomcat支持多种IO模型和应用层协议

| IO模型 | 描述                                              |
| ------ | ------------------------------------------------- |
| NIO    | 非阻塞IO，采用Java NIO类库实现                    |
| NIO2   | 异步IO，采用JDK 7最新的NIO2类库实现               |
| APR    | 采用Apache可移植运行库实现，是c/c++编写的本地库。 |

支持的应用层协议

| 应用层协议 | 描述                                                  |
| ---------- | ----------------------------------------------------- |
| HTTP/1.1   | 这是大部分Web应用采用的访问协议                       |
| AJP        | 用于和Web服务器集成，已实现对静态资源的优化和集群部署 |
| HTTP/2.0   | 大幅度提升了Web性能                                   |

其中IO模型属于传输层。

高内聚功能：

网络通信         ======》 实现：Endpoint

应用层协议解析    ======》 实现：Processor

Tomcat Request/Response与ServletRequest/ServletResponse的转化     ======》 实现：Adapter

组件之间通过抽象接口交互，可以封装变化

Endpoint负责提供字节流给Processor，Processor负责提供Tomcat Request对象给Adapter， Adapter负责提供ServletRequest对象给容器

![连接器的结构](https://gitee.com/Somnus-wang/picgo-drawing-bed/raw/master/1928247-20200722202410957-53516740.png)





### 容器-Catalina

Catalina负责管理Server，而Server表示整个服务器。Server下面有多个服务Service，每个服务都包含着多个连接器组件和一个容器组件。在Tomcat启动的时候，会初始化一个Catalina的实例。

Catalina各个组件的职责：

| 组件      | 职责                                                         |
| --------- | ------------------------------------------------------------ |
| Catalina  | 负责解析Tomcat的配置文件，以此来创建服务器Server组件，并根据其命令来对其进行管理 |
| Server    | 服务器表示整个Catalina Servlet容器以及其它组件，负责组装并启动Servlet引擎，Tomcat连接器。Server通过实现Lifecycle接口，提供了一种优雅的启动和关闭整个系统的方式 |
| Service   | 服务是Server内部的组件，一个Server包含多个service。它将若干个Connector组件绑定到一个Container上 |
| Connector | 连接器，负责处理客户端的通信，它负责接收客户请求，然后转发给容器处理 |
| Container | 容器，负责处理用户的Servlet请求，并返回对象给web用户的模块   |

多层容器的设计

容器的层次结构：Tomcat设计了4中容器，分别是Engine、Host、Context、Wrapper

Engine表示引擎，用来管理多个虚拟站点，一个Service最多只能有一个Engine

Host代表一个虚拟主机，或者说一个站点，可以给Tomcat配置多个虚拟主机地址，一个虚拟主机下可以部署多个Web应用程序

Context代表一个Web应用程序

Wrapper表示一个Servlet，一个Web应用程序中可能会有多个Servlet

通过使用一种分层的架构，使得Servlet容器具有很好的灵活性



Tomcat 的整体架构包含了两个核心组件连接器和容器。连接器负责对外交流，容器负责内部处理。连接器用 ProtocolHandler 接口来封装通信协议和 I/O 模型的差异，ProtocolHandler 内部又分为 Endpoint 和 Processor 模块，Endpoint 负责底层 Socket 通信，Processor 负责应用层协议解析。连接器通过适配器 Adapter 调用容器。



请求定位Servlet的过程：

Tomcat是怎么确定请求是由哪个Wrapper容器里的Servlet来处理的呢==》Tomcat是用Mapper组件来完成这个任务的。

Mapper组件的功能就是将用户请求的URL定位到一个Servlet，它的工作原理是：Mapper组件里保存了Web应用的配置信息，其实就是容器组件与访问路径的映射关系，比如Host容器里配置的域名、Context容器里的Web应用路径，以及Wrapper容器里Servlet映射的路径，这些配置信息就是一个多层次的Map

当一个请求到来时，Mapper组件通过解析请求URL里的域名和路径，再到自己保存的Map里去查找，就能定位到一个Servlet。一个请求URL最后只会定位到一个Wrapper容器，也就是一个Servlet

![定位Servlet](https://gitee.com/Somnus-wang/picgo-drawing-bed/raw/master/1928247-20200722210138743-469594230.png)



## Tomcat的启动流程

 ![Tomcat启动流程](https://gitee.com/Somnus-wang/picgo-drawing-bed/raw/master/1928247-20200723111417040-1354541951.png)

- Tomcat本质上是一个Java程序，因此startup.sh脚本会启动一个JVM来运行Tomcat的启动类Bootstrap
- Bootstrap的主要任务是初始化Tomcat的类加载器，并且创建Catalina
- Catalina是一个启动类，它通过解析server.xml、创建相应的组件，并调用Server的start方法
- Server组件的职责就是管理Service组件，它会负责调用Service的start方法
- Service组件的职责就是管理连接器和顶层容器Engine，因此它会调用连接器和Engine的start方法

这些启动类或者组件不处理具体请求，任务主要是“管理”，管理下层组件的生命周期，并且给下层组件分配任务，也就是把请求路由到负责“干活”的组件。



引用：

> https://www.cnblogs.com/liushoudong/p/13363271.html