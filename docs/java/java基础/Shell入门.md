# Shell入门

Shell是一个命令行解释器，它接收应用程序/用户命令，然后调用操作系统内核。同时还是一个功能强大的编程语言，易编写、易调试、灵活性强。



## 脚本格式

脚本以#!/bin/bash开头（指定解析器）

1.需求：创建一个Shell脚本，输出helloworld

2.案例实操

```shell
## 创建脚本文件
touch helloworld.sh
## 写入内容
vim helloworld.sh
## 在文件中写入以下内容
#!/bin/bash
echo "helloworld"
## 保存退出后，执行脚本
sh helloworld.sh   ## 第一种
bash helloworld.sh   ## 第二种
## 修改权限后，可直接使用以下命令执行
## chmod 777 helloworld.sh
helloworld.sh
```



需求：在home/atguigu/目录下创建一个banzhang.txt，在banzhang.txt文件中增加“I love cls”

```shell
touch batch.sh
vim batch.sh
## 在脚本文件中输出以下内容
#!/bin/bash
cd /home/atguigu
touch banzhang.txt
echo "I love cls" >> banzhang.txt
```



## Shell中的变量

### 1.常用系统变量

```shell
$HOME $PWD $SHELL $USER
```

### 2.自定义变量

```shell
## 定义变量：变量=值
A=1
## 撤销变量
unset A
## 声明一个静态变量，不能unset
readonly B=3
```

### 3.注意事项

- 环境变量名建议大写
- 等号两侧不能有空格
- 在bash中，变量默认类型都是字符串类型，无法进行数值运算
- 变量的值如果有空格，需要使用双引号或单括号



可把变量提升为全局环境变量，可供其他Shell程序使用

```shell
export 变量名
```

### 4.特殊变量

$n: n为数字，$0代表该脚本名称，$1-$9代表第一到第九个参数，十以上的参数需要用大括号包含，如${10}

$#: 获取所有输入参数个数，常用于循环

$*: 代表命令行中所有的参数

$@: 代表命令行中所有的参数

$?: 最后一次执行的命令的返回状态。如果此变量为0，证明上一个命令正确执行，如果这个变量不为0，则证明上一个命令执行不正确



### 5.运算符

$((运算式))   或  $[运算式]

expr +,-,\*,/,%   加，减，乘，除，取余

注意：expr运算符间要有空格



### 6.条件判断

[ condition ]  （注意：condition前后要有空格）

注意：条件非空即为true，[ somnus ]返回true   []返回false



常用判断条件

1.两个整数之间比较

= 字符串比较 -lt 小于  -le 小于等于  -eq 等于 -gt 大于  -ge 大于等于  -ne 不等于

2.按照文件权限判断

-r 有读的权限   -w 有写的权限  -x有执行的权限

3.按照文件类型进行判断

-f文件存在并且是一个常规的文件

-e文件存在

-d文件存在并是一个目录

4.多条件判断

&&表示前一条命令执行成功时，才执行后一条命令，||表示上一条命令执行失败后，才执行下一条命令



### 7.流程控制

if判断:

```shell
if [ 条件表达式 ];then
	程序
fi
## 或者
if [ 条件表达式 ]
	then
		程序
fi
```

注意事项:

- [ 条件表达式 ],中括号和条件表达式之间必须有空格
- if后要有空格

案例实操

1.输入一个数字，如果是1，则输出banzhang zhen shuai,如果是2，则输出cls zhen mei，如果是其它，什么也不输出

```shell
touch if.sh
vim if.sh

#!/bin/bash

if [ $1 -eq 1 ]
then
	echo "banzhang zhen shuai"
elif [ $1 -eq 2 ]
then
	echo "cls zhen mei"
fi
```



case语句

```shell
case $变量名 in
	"值1")
		如果变量的值等于值1，则执行程序1
		;;
	"值2")
		如果变量的值等于值2，则执行程序2
		;;
	...省略其它分支...
	*)
		如果变量的值都是以上的值，则执行此程序
        ;;
esac
```

注意事项：

1. case行尾必须为单词“in”，每一个模式匹配必须以右括号“)”结束。

2. 双分号;;表示命令序列结束，相当于java中的break
3. 最后的*)表示默认模式，相当于java中的default

案例实操：

1.输入一个数字，如果是1，则输出banzhang，如果是2，则输出cls，如果是其它，输出renyao

```shell
touch case.sh
vim case.sh

#!/bin/bash
case $1 in
1)
	echo "banzhang"
;;
2)
	echo "cls"
;;
*)
	echo "renyao"
;;
esac
```



for循环

语法一

```shell
for(( 初始值;循环控制条件;变量变化 ))
	do
		程序
	done
```

案例实操：

1.从1加到100

```shell
touch for1.sh
vim for.sh

#!/bin/bash

s=0
for((i=1;i<=100;i++))
do
	s=$[$s+$i]
done

echo $s
```

语法二

```shell
for 变量 in 值1 值2 值3
do
	程序
done
```

打印所有输入的参数

```shell
touch for2.sh
vim for2.sh

#!/bin/bash

for i in $* ##一次性输出所有
do
	echo "banzhang xihuan $i"
done

for i in $@  ##一次输出一个
do
	echo "banzhang xihuan $i"
done
```



while循环

```shell
while [ 条件表达式 ]
do
	程序
done
```

案例实操：从1加到100

```shell
touch while.sh
vim while.sh

#!/bin/bash

s=0
i=1
while [ $i -le 100 ]
do
	s=$[$s + $i]
	i=$[$i + 1]
done
echo "$s"
```



### 8.read读取控制台输入

```shell
read(选项)(参数)
##选项 -p：指定读取值时的提示符  -t：指定读取值时等待的时间
##参数  变量：指定读取值的变量名
```

案例：提示七秒内，读取控制台输入的名称

```shell
touch read.sh
vim read.sh

#!/bin/bash

read -t 7 -p "Enter your name in 7 seconds " NAME
echo $NAME
```



### 9.函数

basename基本语法

```shell
basename [string/pathname] [suffix]
## basename命令会删掉所有的前缀包括最后一个（‘/’）字符，然后将字符串显示出来
## suffix为后缀，如果suffix被指定了，basename会将pathname或string中的suffix去掉
##例子
basename /home/atguigu/banzhang.txt   ## 结果为banzhang.txt
basename /home/atguigu/banzhang.txt .txt  ##结果为banzhang
```



dirname基本语法

```shell
dirname 文件绝对路径
##  从给定的包含绝对路径的文件名中去除文件名（非目录的部分），然后返回剩下的路径（目录的部分）

##例子
dirname /home/atguigu/banzhang.txt   ## 结果为/home/atguigu
```



自定义函数

```shell
[ function ] funname[()]
{
	Action;
	[return int;]
}
funname
```

经验技巧：

- 必须在调用函数之前，先声明函数，shell脚本是逐行运行。不会像其它语言一样先编译
- 函数返回值，只能通过$?系统变量获得，可以显式加：return返回，如果不加，将以最后一条命令运行结果，作为返回值。return后跟数值n(0-255)

案例实操：计算两个输出参数之和

```shell
touch fun.sh
vim fun.sh

#!/bin/bash

function sum()
{
	s=0;
	s=$[$1+$2]
	echo $s
}
read -p "input your parameter1:" P1
read -p "input your parameter2:" P2
sum $P1 $P2
```

 

### Shell工具

cut

cut的工作就是剪，具体地说就是在文件中负责剪切数据用的。cut命令从文件的每一行剪切字节、字符和字段并将这些字节、字符和字段输出。

```shell
cut [选项参数] filename
## 默认分隔符是制表符
## -f：列号，提取第几列
## -d：分隔符，按照指定分隔符分隔列
```

需求：切割cut.txt的第一列

```shell
touch cut.txt
vim cut.txt

dong shen
guan zhen
wo wo
lai lai
le le
## 切割cut.txt的第一列
cut -d " " -f 1 cut.txt
## 在cut.txt文件中切割出guan
cat cut.txt | grep "guan" | cut -d " " -f 1
## 选取系统PATH变量值，第2个“：”开始后的所有路径
echo $PATH | cut -d : -f 3-
## 切割ifconfig后打印的IP地址
ifconfig eth0 | grep "inet addr" | cut -d : -f 2| cut -d " " -f 1
```



sed

sed是一种流编辑器，它一次处理一行内容。处理时，把当前处理的行存储在临时缓冲区中，称为“模式空间”，接着用sed命令处理缓冲区中的内容，处理完成后，把缓冲区的内容发往屏幕。接着处理下一行，这样不断重复，直到文件末尾。文件内容并没有改变，除非使用重定向存储输出。

```shell
sed [选项参数] 'command' filename
## 选项参数：-e 直接在指令列模式上进行sed的动作编辑
## 命令功能：a 新增，a的后面可以接字符串，在下一行出现
##         d 删除
##		   s 查找并替换
```

```shell
## 数据准备
touch sed.txt
vim sed.txt
dong shen
guan zhen
wo wo
lai lai
le le

## 1.将“mei nv”这个单词插入到sed.txt第二行下，打印
sed "2a mei nv" sed.txt
## 2.删除sed.txt文件所有包含wo的行
sed "/wo/d" sed.txt
## 3.将sed.txt文件中wo替换为ni
sed "s/wo/ni/g" sed.txt
## 4.将sed.txt文件中的第二行删除并将wo替换成ni
sed -e "2d" -e "s/wo/ni/g" sed.txt
```



awk

一个强大的文本分析工具，把文件逐行的读入，以空格为默认分隔符将每行切片，切开的部分再进行处理分析

```shell
awk [选项参数] 'pattern{action1} pattern{action2}...' filename
## pattern:表示AWK在数据中查找的内容，就是匹配模式
## action:在找到匹配内容时所执行的一系列命令
## 选项参数 -F：指定输入文件的拆分隔符
##        -v：赋值一个用户定义变量
```

```shell
## 数据准备
sudo cp /etc/passwd ./
## 1.搜索passwd文件以root关键字开头的所有行，并输出该行的第7列
awk -F : '/^root/ {print $7}' passwd
## 2.搜索passwd文件以root关键字开头的所有行，并输出该行的第1列和第7列
awk -F : '/^root/ {print $1","$7}' passwd
## 3.只显示/etc/passwd的第一列和第七列，以逗号分割，且在所有行前面添加列名user，shell在最后一行添加“dahaige, /bin/zuishuai”
awk -F : 'BEGIN{print "user,shell"} {print $1","$7} END{print "dahaige, bin/zuishuai"}' passwd
## 4.将passwd文件中所有的用户id增加数值1并输出
awk -f : -v i=1 '{print $3+i}' passwd
```

awk的内置变量

```shell
FILENAME:文件名
NR:已读的记录数
NF:浏览记录的域的个数（切割后，列的个数）
```

```shell
## 1.统计passwd文件名，每行的行号，每行的列数
awk -F : '{print FILENAME "," NR"," NF}' passwd
## 2.切割IP
ifconfig eth0|grep "inet addr"|awk -F : '{print $2}'|awk -F " " '{print $1}'
## 3.查询sed.txt中空行所在的行号
awk '/^$/{print NR}' sed.txt
```



sort

sort命令是Linux中非常有用，它将文件进行排序，并将排序结果标准输出

```shell
sort(选项)(参数)
## -n 依照数值的大小排序
## -r 以相反的顺序来排序
## -t 设置排序时所用的分割字符
## -k 指定需要排序的列
## 参数：指定待排序的文件列表
```

```shell
## 数据准备
touch sort.sh
vim sort.sh

bb:40:5.4
bd:20:4.2
xz:50:2.3
cls:10:3.5
ss:30:1.6
## 1.按照“:”分割后的第三列倒序排序
sort -t : -k 3 -nr sort.sh
```

