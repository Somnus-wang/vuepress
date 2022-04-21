# Java的变量

## 数据类型

1.整型

byte 1字节（8bit）-128~127

```java
//若对byte赋值超过128 则会显示编译错误
//long型变量必须以“L”或“l”结尾
```

short  2字节 

int 4字节 

long 8字节

2.浮点型

float：单精度   4字节  结尾必须加“F”或“f”

double：双精度  8字节   通常采用此类型

3.字符型

char：（1字符=2字节） 内部只能写一个字符

```java
char c1 = ''; //定义char型变量，通常使用一对单引号
```

4.布尔型

boolean：只能取两个值之一：true、false   常常在条件判断、循环结构中使用



## 基本数据类型转换

1.自动类型提升

当容量小的数据类型与容量大的数据类型做运算时，结果自动提升为容量大的数据类型。（此时的容量大小指的是表示数的范围的大小）。特别的，当byte、char、short三种类型做运算时，结果为int类型。

2.强制类型转换

自动类型提升运算的逆运算。可能导致精度损失。

```java
double d1 = 12.3;
int i1 = (int)d1;
```

==整型常量默认为int型，对于浮点型默认为double。==



## String类型变量的使用

1.String属于引用数据类型

2.String可以和8种基本数据类型做运算，且运算只能是连接运算。

```java
String s1 = "Hello World!";
System.out.println(s1);

int number = 1001;
String numberStr = "学号";
System.out.println(number+numberStr); //1001学号
```

