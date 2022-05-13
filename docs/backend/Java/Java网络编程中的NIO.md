# Java网络编程中的NIO

![image-20220512213748124](https://gitee.com/Somnus-wang/picgo-drawing-bed/raw/master/image-20220512213748124.png)

## Java NIO概述

Java NIO（New IO或Non-Blocking IO）是从Java 1.4版本开始引入的一个新的IO API，可以替代标准的Java IO API。NIO支持面向缓冲区的、基于通道的IO操作。NIO将以更加高效的方式进行文件的读写操作。



### 阻塞IO

通常在进行同步IO操作时，如果读取数据，代码或阻塞直至有可读的数据。同样，当写入数据时也会阻塞至有数据可写。传统的Server/Client模式会基于TPR（Thread per Request），服务器为每一个请求建立一个线程，于是当请求很多时，会造成线程数量的剧增，为了避免这个问题，都采用了线程池模型，但是当线程池中所有的线程都在进行大文件操作时，再来一个新的请求，会导致无法处理。



### 非阻塞IO

NIO中非阻塞IO采用了基于Reactor模式的工作方法，IO调用不会被阻塞，相反是注册感兴趣的特定IO事件，如可读数据到达，新的套接字连接等等，在发生特定事件时，系统再通知我们。NIO中实现非阻塞IO的核心对象是Selector，Selector就是注册各种IO事件的地方，而且当我们感兴趣的事件发生时，就是对这个对象告诉我们所发生的事。

![image-20220512224550404](https://gitee.com/Somnus-wang/picgo-drawing-bed/raw/master/image-20220512224550404.png)

从图中可以看出，当有读写请求或其他注册事件发生时，可以从Selector中获得相应的SelectionKey，同时从SelectionKey中可以找到发生的事件和该事件所发生的的具体的SelectableChannel，以获得客户端发送过来的数据。

非阻塞指的是IO事件本身不阻塞，但是获取IO事件的select()方法是需要阻塞等待的。区别是阻塞的IO会阻塞在IO操作上，而NIO阻塞在事件获取上，没有事件就没有IO，从高层次看IO就不阻塞了。也就是说只有IO已经发生那么我们才评估IO是否阻塞，但是select()阻塞的时候IO还没有发生，何谈IO的阻塞呢？NIO的本质是延迟IO操作到真正发生IO的时候，而不是以前的只要IO流打开了就一直等待IO操作。



### NIO 概述

Java NIO由几个核心部分组成：

- Channels
- Buffers
- Selectors

除此之外还有很多类和组件，但Channel、Buffer和Selector构成了核心的API

#### Channel

Channel是双向的，而IO中的Stream是单向的。譬如：InputStream、OutputStream只能单向读或写，而Channel主要实现有FileChannel、DatagramChannel、SocketChannel，可以实现对文件、UDP、TCP的处理。

#### Buffer

NIO中关键的Buffer实现有：ByteBuffer、CharBuffer、DoubleBuffer、FloatBuffer、IntBuffer、LongBuffer、ShortBuffer，分别对应几种基本数据类型。

#### Selector

Selector运行单线程处理多个Channel，如果你的应用打开了多个通道，但每个连接的流量都很低，使用Selector就会很方便。例如在一个聊天服务器中，要是用Selector，得向Selector注册Channel，然后调用它的select()方法。这个方法会一直阻塞到有事件发生。一旦这个方法返回，线程就可以处理这些事件。



## Java NIO（Channel）

### Channel概述

Channel是一个通道，可以通过它进行读取或写入数据。NIO中通过channel封装了对数据源的操作，而不必关系数据源具体的物理结构。在大多数应用中，channel与文件描述符或者socket是一一对应的。channel通常是搭配buffer来传输数据的。

![image-20220513113449675](https://gitee.com/Somnus-wang/picgo-drawing-bed/raw/master/image-20220513113449675.png)

Channel是一个对象，可以通过它读取和写入数据，但是不会将字节直接写入通道中，所有的数据通过buffer对象来处理。读取数据的时候，先将数据读入到缓冲区，再从缓冲区获取数据；写入数据时也是将数据先写入到缓冲区。



### FileChannel介绍与示例

FileChannel类可以实现常用的read、write以及scatter/gather操作，同时它也提供了很多专用于文件的新方法。

| 方法                     | 描述                          |
| ------------------------ | ----------------------------- |
| int read(ByteBuffer dst) | 从FileChannel读取数据到Buffer |
|                          |                               |
|                          |                               |
|                          |                               |
|                          |                               |
|                          |                               |
|                          |                               |
|                          |                               |
|                          |                               |

从FileChannel读数据到Buffer

```java
public class ChannelTest {


    //通过FileChannel读取数据到buffer中
    public static void main(String[] args) throws Exception {
        //创建FileChannel
        RandomAccessFile aFile = new RandomAccessFile("E:\\ideaproject\\01.txt","rw");
        FileChannel channel = aFile.getChannel();

        //创建Buffer
        ByteBuffer buf = ByteBuffer.allocate(1024);

        //读取数据到buffer中
        int bytesRead = channel.read(buf);
        while(bytesRead!=-1){
            System.out.println("读取了"+bytesRead);
            buf.flip();
            while(buf.hasRemaining()){
                System.out.println((char)buf.get());
            }
            buf.clear();
            bytesRead = channel.read(buf);
        }
        aFile.close();
        System.out.println("结束了");
    }

}
```

从Buffer写数据到FileChannel

```java
public class ChannelTest1 {

    //FileChannel写操作
    public static void main(String[] args) throws Exception {
        //打开一个FileChannel
        RandomAccessFile aFile = new RandomAccessFile("E:\\ideaproject\\01.txt","rw");
        FileChannel channel = aFile.getChannel();

        //创建一个buffer对象
        ByteBuffer buffer = ByteBuffer.allocate(1024);

        String newDate = "data somnus";
        buffer.clear();

        //写入内容
        buffer.put(newDate.getBytes());
        buffer.flip();

        //FileChannel完成最终实现
        while(buffer.hasRemaining()){
            channel.write(buffer);
        }

        //关闭
        channel.close();
    }

}
```

通道间进行数据传输

```java
//通道之间进行数据传输
public class ChannelTest2 {

    public static void main(String[] args) throws Exception {
        //创建两个FileChannel
        RandomAccessFile aFile = new RandomAccessFile("E:\\ideaproject\\01.txt","rw");
        FileChannel fromChannel = aFile.getChannel();

        RandomAccessFile bFile = new RandomAccessFile("E:\\ideaproject\\02.txt","rw");
        FileChannel toChannel = bFile.getChannel();

        long position  = 0;
        long count = fromChannel.size();
        toChannel.transferFrom(fromChannel,position,count);

        //关闭通道
        aFile.close();
        bFile.close();
    }
}
```

