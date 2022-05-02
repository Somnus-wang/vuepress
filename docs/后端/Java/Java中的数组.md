# Java中的数组

## 数组概述

- Java中的引用数据类型有三种：数组、对象、接口
- 数组本身为引用数据类型，数组中的元素可以使任何数据类型，包括基本数据类型和引用数据类型
- 创建数组对象时会在内存中开辟一块连续的空间，数组名中的引用为这块空间的首地址
- 数组长度一旦确定，就不能修改



## 数组的内存解析

```java
int[] arr = new int[]{1,2,3};
//arr存放着数组的地址值，放在栈中，而实际创建出来的数组存放在堆空间
```



## 二维数组的解析

对于二维数组的理解，可以看成是一维数组array1又作为另一个一维数组array2的元素而存在。其实，从底层数据结构的运行机制来看，其实根本没有二维数组。



## 数组中涉及到的常见算法：排序算法

衡量排序算法的优劣：

- 时间复杂度：分析关键字的比较次数和记录的移动次数
- 空间复杂度：分析排序算法需要多少辅助内存
- 稳定性：若两个记录A和B的关键字值相等，但排序后A、B的先后次序保持不变，则称这种排序算法是稳定的



排序算法分类：内部排序和外部排序

- 内部排序：整个排序过程不需要借助于外部存储器（如磁盘等），所有的排序操作都在内存中完成。
- 外部排序：参与排序的数据非常多，数据量非常大，计算机无法把整个排序过程放在内存中完成，必须借助外部存储器（如磁盘等）。外部排序最常见的是多路归并排序。可以认为外部排序是由多次内部排序组成。



十大内部排序算法：

- 选择排序：直接选择排序、堆排序
- 交换排序：冒泡排序、快速排序
- 插入排序：直接插入排序、折半插入排序、希尔排序
- 归并排序
- 桶式排序
- 基数排序



### 冒泡排序

排序思想：

1.比较相邻的元素。如果第一个比第二大（升序），就交换他们两个。

2.对每一对相邻的元素作同样的工作，从开始第一对到结尾的最后一对。这步做完之后，最后的元素会是最大的数。

3.针对所有的元素重复以上的步骤，除了最后一个。

4.持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较为止。

```java
public class BubbleSort {

    public static void main(String[] args) {
        int[] arr = {2,5,1,9,6,3,7,4,8};   			//定义乱序数组
        long l1 = System.nanoTime();				//获取当前纳秒数
        for(int i=0;i<arr.length-1;i++){			
            for(int j=0;j<arr.length-i-1;j++){		
                if(arr[j]>arr[j+1]){				//比较相邻元素
                    arr[j] = arr[j]^arr[j+1];
                    arr[j+1] = arr[j+1]^arr[j];
                    arr[j] = arr[j]^arr[j+1];		//使用异或对数据元素进行交换
                }
            }
        }
        long l2 = System.nanoTime();				//获取排完序之后的纳秒数
        System.out.println(Arrays.toString(arr));	//输出此时的数组元素
        System.out.println("花费的时间为："+(l2-l1)+" ns");//获取排序耗费的时间
    }
}
//结果：
//[1, 2, 3, 4, 5, 6, 7, 8, 9]
//花费的时间为：2400 ns
```



### 快速排序

快速排序由图灵奖获得者Tony Hoare发明，被列为20世纪十大算法之一，是迄今为止所有内排序算法中速度最快的一种。冒泡排序的升级版，交换排序的一种。快速排序的时间复杂度为O(nlog(n))。

排序思想：

1.将列表第一个值设为中心轴，且将左指针放在此（指针空缺）

2.在剩下的列表中，右指针为列表的最后一个值

3.开始判断右指针的值是否大于中心轴，若小于中心轴，则将此值放入左指针空缺，此时右指针为空缺，同时左指针向右移

4.当左指针指向的值大于中心轴，则将此值放入右指针空缺，同时右指针左移。重复步骤3和4.

5.当左指针与右指针重合时，将中心轴的值赋给指针

6.再将中心轴左边和右边看成新的列表，进行快速排序

```java
public class QuickSort {

    public static void main(String[] args) {
        int[] arr = {2,5,1,9,6,3,7,4,8};
        long l1 = System.nanoTime();
        quickSort(arr,0,arr.length-1);
        long l2 = System.nanoTime();
        System.out.println(Arrays.toString(arr));
        System.out.println("花费的时间为："+(l2-l1)+" ns");
    }

    public static void quickSort(int[] arr,int low,int high){
        if(low>=high){
            return;
        }
        int start = low;
        int end = high;
        int midValue = arr[low];
        boolean flag = true;
        while(true){
            if(flag){
                if(midValue>arr[high]){
                    arr[low] = arr[high];
                    low++;
                    flag = false;
                }else if(midValue<arr[high]){
                    high--;
                }
            }else{
                if(midValue<arr[low]){
                    arr[high] = arr[low];
                    high--;
                    flag = true;
                }else if(midValue>arr[low]){
                    low++;
                }
            }
            if(low==high){
                arr[low]=midValue;
                break;
            }
        }
        quickSort(arr,start,low-1);
        quickSort(arr,low+1,end);
    }
}

//输出结果
//[1, 2, 3, 4, 5, 6, 7, 8, 9]
//花费的时间为：3700 ns
```



### Arrays工具类的使用

java.util.Arrays类即为操作数组的工具类，包含了用来操作数组（比如排序和搜索）的各种方法。

| 1    | boolean equals(int[] a,int[] b)   | 判断两个数组是否相等       |
| ---- | --------------------------------- | -------------------------- |
| 2    | String toString(int[] a)          | 输出数组信息               |
| 3    | void fill(int[] a,int val)        | 将指定的值填充到数组中     |
| 4    | void sort(int[] a)                | 对数组进行排序             |
| 5    | int binarySearch(int[] a,int key) | 对排序后的数组进行二分查找 |

测试

```java
public class ArraysTest {
    public static void main(String[] args) {

        //1.判断两个值是否相等
        int[] arr1 = new int[]{1,2,3,4};
        int[] arr2 = new int[]{1,3,2,4};
        System.out.println(Arrays.equals(arr1, arr2));//fasle

        //2.输出数值信息
        System.out.println(Arrays.toString(arr1));//[1, 2, 3, 4]

        //3.将指定的值填充到数组中
        Arrays.fill(arr1,10);
        System.out.println(Arrays.toString(arr1));//[10, 10, 10, 10]

        //4.排序
        Arrays.sort(arr2);
        System.out.println(Arrays.toString(arr2));//[1, 2, 3, 4]

        //5.二分查找
        int[] arr3 = new int[]{-98,-34,2,34,54,66,79,105,210,333};
        int index = Arrays.binarySearch(arr3,210);
        System.out.println(index);//8
    }
}
```

