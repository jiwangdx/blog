---
title: 00 Java算法刷题必备知识速查
article: false
category:
  - 代码笔记
  - LC Hot100
  - 语法
---

> 整理了 Java 刷算法题最常用的 API 和技巧，按功能分类，方便快速查阅

---

## 一、基础语法差异

### 1.1 获取长度

| 类型 | 语法 | 说明 |
|------|------|------|
| 数组 | `arr.length` | 属性，无括号 |
| 字符串 | `str.length()` | 方法，有括号 |
| 集合 | `collection.size()` | 方法 |

### 1.2 字符大小写转换

```java
Character.toUpperCase(c);  // 转大写
Character.toLowerCase(c);  // 转小写
```

---

## 二、字符串（String / StringBuilder）

### 2.1 String 常用方法

```java
str.length();              // 长度
str.charAt(i);             // 取第 i 个字符
str.indexOf(sub);          // 子串首次出现位置（-1 表示不存在）
str.lastIndexOf(sub);      // 子串最后一次出现位置
str.substring(l, r);       // 截取 [l, r)，左闭右开
str.equals(other);         // 内容比较（不能用 ==）
str.equalsIgnoreCase(other); // 忽略大小写比较
str.replace(a, b);        // 替换所有 a 为 b
str.replaceAll(regex, b); // 正则替换
str.trim();                // 去除首尾空白字符
str.split("\\s+");         // 按空白字符切分（返回 String[]）
str.toCharArray();         // 转字符数组
str.contains(sub);         // 是否包含子串
str.startsWith(prefix);    // 是否以 prefix 开头
str.endsWith(suffix);      // 是否以 suffix 结尾
```

### 2.2 StringBuilder（可变字符串）

```java
StringBuilder sb = new StringBuilder();
sb.append(x);              // 追加
sb.insert(i, x);           // 在位置 i 插入
sb.delete(i, j);           // 删除 [i, j)
sb.setCharAt(i, c);        // 设置第 i 个字符（O(1)）
sb.reverse();              // 反转
sb.toString();             // 转 String
sb.length();               // 长度
```

> **注意**：String 是不可变的，每次操作都会创建新对象；StringBuilder 可变，效率更高

### 2.3 字符数组 ↔ 字符串

```java
char[] chs = s.toCharArray();      // String -> char[]
String s = new String(chs);        // char[] -> String
String s = String.valueOf(chs);    // char[] -> String
```

---

## 三、数组（Array）

### 3.1 Arrays 常用方法

```java
import java.util.Arrays;

int[] arr = new int[n];             // 创建长度为 n 的数组
Arrays.fill(arr, value);            // 填充数组
Arrays.sort(arr);                   // 升序排序
Arrays.sort(arr, Collections.reverseOrder()); // 降序（注意：基本类型数组不能直接用）

// 基本类型数组转包装类数组再排序
Integer[] arr = Arrays.stream(original).boxed().toArray(Integer[]::new);
Arrays.sort(arr, Comparator.reverseOrder());  // 降序

Arrays.binarySearch(arr, key);       // 二分查找（必须先排序）
Arrays.equals(arr1, arr2);          // 比较数组内容
Arrays.toString(arr);               // 数组转字符串
```

### 3.2 数组拷贝

```java
int[] copy = Arrays.copyOf(arr, newLength);           // 拷贝并可改变长度
int[] copy = Arrays.copyOfRange(arr, from, to);       // 拷贝区间 [from, to)
int[] copy = arr.clone();                              // 浅拷贝
```

### 3.3 数组转 List

```java
List<Integer> list = Arrays.asList(arr);              // 数组转 List（固定长度）
List<Integer> list = new ArrayList<>(Arrays.asList(arr)); // 可变长 List
```

---

## 四、List（列表）

### 4.1 创建与基本操作

```java
List<Integer> list = new ArrayList<>();        // 推荐用 ArrayList
List<Integer> list = new LinkedList<>();      // 适合频繁插入删除

list.add(e);                    // 末尾添加
list.add(i, e);                 // 在位置 i 插入
list.get(i);                    // 获取第 i 个元素
list.set(i, e);                 // 设置第 i 个元素
list.remove(i);                 // 按索引删除（返回被删元素）
list.remove(Object o);          // 按元素删除（返回是否成功）
list.clear();                   // 清空
list.isEmpty();                 // 是否为空
list.size();                    // 大小
list.contains(o);               // 是否包含
list.indexOf(o);                // 首次出现位置
```

### 4.2 遍历方式

```java
// 方式1：下标遍历（推荐 ArrayList）
for (int i = 0; i < list.size(); i++) {
    Integer x = list.get(i);
}

// 方式2：增强 for 循环
for (Integer x : list) {
}

// 方式3：迭代器（适合遍历中删除）
Iterator<Integer> it = list.iterator();
while (it.hasNext()) {
    Integer x = it.next();
    if (条件) {
        it.remove();           // 正确删除方式
    }
}
```

### 4.3 List 排序

```java
Collections.sort(list);                       // 升序
Collections.sort(list, (a, b) -> a - b);      // 升序（自定义）
Collections.sort(list, (a, b) -> b - a);      // 降序（自定义）

list.sort((a, b) -> a - b);                   // 方式2：List 对象方法
list.sort(Comparator.naturalOrder());        // 方式3：自然序升序
list.sort(Comparator.reverseOrder());        // 方式4：自然序降序

Collections.reverse(list);                   // 反转列表
```

### 4.4 注意事项

```java
// remove 的坑：Integer 和 int 混淆
list.remove(10);              // 错误：按索引删，会越界或删错
list.remove(Integer.valueOf(10));  // 正确：删除元素 10
list.remove(10);              // 正确：如果 10 在 List.size() 范围内，是按索引删
```

---

## 五、Set（集合）

### 5.1 创建与基本操作

```java
Set<Integer> hashSet = new HashSet<>();      // 无序、O(1) 平均
Set<Integer> treeSet = new TreeSet<>();      // 有序（红黑树），O(log n)
Set<Integer> linkedHashSet = new LinkedHashSet<>(); // 保持插入顺序

hashSet.add(e);              // 添加
hashSet.remove(e);           // 删除
hashSet.contains(e);         // 是否包含
hashSet.size();              // 大小
hashSet.clear();             // 清空
hashSet.isEmpty();           // 是否为空
```

### 5.2 遍历方式

```java
// 方式1：增强 for 循环
for (Integer x : set) {
}

// 方式2：迭代器（适合遍历中删除）
Iterator<Integer> it = set.iterator();
while (it.hasNext()) {
    Integer x = it.next();
    if (条件) {
        it.remove();        // 正确删除方式
    }
}
```

### 5.3 Set 排序

```java
// HashSet 排序：转 List 再排序
List<Integer> list = new ArrayList<>(hashSet);
Collections.sort(list);                  // 升序
list.sort(Comparator.reverseOrder());   // 降序

// TreeSet：创建时指定排序规则
TreeSet<Integer> ts = new TreeSet<>();                    // 默认升序
TreeSet<Integer> ts = new TreeSet<>(Comparator.reverseOrder()); // 降序

// TreeSet 取首个/末个元素
Integer first = ts.first();         // 最小元素
Integer last = ts.last();           // 最大元素
Integer higher = ts.higher(x);      // 大于 x 的最小元素
Integer lower = ts.lower(x);        // 小于 x 的最大元素
```

---

## 六、Map（映射）

### 6.1 创建与基本操作

```java
Map<String, Integer> hashMap = new HashMap<>();      // 无序、O(1) 平均
Map<String, Integer> treeMap = new TreeMap<>();     // 按 key 排序
Map<String, Integer> linkedHashMap = new LinkedHashMap<>(); // 保持插入顺序

hashMap.put(k, v);                 // 插入/修改
hashMap.get(k);                    // 获取（不存在返回 null）
hashMap.getOrDefault(k, defaultVal); // 获取，不存在则返回默认值
hashMap.containsKey(k);            // 是否包含 key
hashMap.containsValue(v);         // 是否包含 value
hashMap.remove(k);                 // 删除
hashMap.size();                    // 大小
hashMap.clear();                   // 清空
hashMap.isEmpty();                 // 是否为空
```

### 6.2 遍历方式

```java
// 方式1：遍历 entry（最推荐）
for (Map.Entry<String, Integer> entry : map.entrySet()) {
    String key = entry.getKey();
    Integer value = entry.getValue();
}

// 方式2：遍历 key
for (String key : map.keySet()) {
    // map.get(key);
}

// 方式3：遍历 value
for (Integer value : map.values()) {
}

// 方式4：迭代器（适合遍历中删除）
Iterator<Map.Entry<String, Integer>> it = map.entrySet().iterator();
while (it.hasNext()) {
    Map.Entry<String, Integer> entry = it.next();
    if (条件) {
        it.remove();              // 正确删除方式
    }
}
```

### 6.3 Map 排序

```java
// 按 key 排序：使用 TreeMap
TreeMap<String, Integer> treeMap = new TreeMap<>(Comparator.reverseOrder());

// 按 value 排序：转 List 排序
List<Map.Entry<String, Integer>> list = new ArrayList<>(map.entrySet());
list.sort((a, b) -> a.getValue() - b.getValue());      // 按 value 升序
list.sort((a, b) -> b.getValue() - a.getValue());     // 按 value 降序
```

---

## 七、Queue / Deque（队列）

### 7.1 Queue（普通队列）

```java
Queue<Integer> queue = new ArrayDeque<>();     // 推荐：效率高
Queue<Integer> queue = new LinkedList<>();    // 也可

queue.offer(x);        // 入队（返回是否成功）
queue.add(x);         // 入队（失败抛异常）
queue.poll();         // 出队（队列空返回 null）
queue.remove();       // 出队（队列空抛异常）
queue.peek();         // 查看队首（队列空返回 null）
queue.element();      // 查看队首（队列空抛异常）
queue.isEmpty();      // 是否为空
queue.size();         // 大小
```

### 7.2 Deque（双端队列）

```java
Deque<Integer> deque = new ArrayDeque<>();    // 推荐

// 当普通队列用
deque.offerLast(x);      // 入队尾
deque.pollFirst();       // 出队首

// 当栈用（比 Stack 快）
deque.push(x);           // 压栈（等价 offerFirst）
deque.pop();            // 弹栈（等价 pollFirst）
deque.peek();           // 查看栈顶（等价 peekFirst）
```

---

## 八、PriorityQueue（优先队列 / 堆）

### 8.1 创建

```java
// 小根堆（默认）
PriorityQueue<Integer> minHeap = new PriorityQueue<>();

// 大根堆
PriorityQueue<Integer> maxHeap = new PriorityQueue<>((a, b) -> b - a);

// 自定义排序（以最小年龄为例）
PriorityQueue<Person> pq = new PriorityQueue<>((a, b) -> a.age - b.age);
```

### 8.2 基本操作

```java
pq.offer(x);      // 入堆
pq.poll();       // 出堆顶
pq.peek();       // 查看堆顶
pq.size();       // 大小
pq.isEmpty();    // 是否为空
```

### 8.3 常用场景

- Top K 问题
- 滑动窗口中位数
- 贪心算法（需要取最值时）
- 合并有序流

---

## 九、Comparator（比较器）详解

### 9.1 Lambda 写法

```java
// 升序
(a, b) -> a - b

// 降序
(a, b) -> b - a

// 多字段排序
(a, b) -> {
    if (!a.x.equals(b.x)) return a.x - b.x;   // 先按 x 升序
    return a.y - b.y;                         // x 相同，按 y 升序
}
```

### 9.2 Comparator 工具类写法（推荐）

```java
import java.util.Comparator;

// 单字段
Comparator<Node> cmp = Comparator.comparingInt(a -> a.x);

// 降序
Comparator<Node> cmp = Comparator.comparingInt(a -> a.x).reversed();

// 多字段
Comparator<Node> cmp = Comparator
    .comparingInt(a -> a.x)
    .thenComparingInt(a -> a.y);

// 使用
list.sort(cmp);
Collections.sort(list, cmp);
```

### 9.3 各场景排序写法

| 场景 | 升序 | 降序 |
|------|------|------|
| `List.sort()` | `(a,b) -> a-b` | `(a,b) -> b-a` |
| `Arrays.sort(包装类数组)` | 默认 | `Comparator.reverseOrder()` |
| `TreeSet` | 默认 | `new TreeSet<>(Comparator.reverseOrder())` |
| `PriorityQueue` | 默认 | `new PriorityQueue<>(Comparator.reverseOrder())` |
| `TreeMap` | 默认 | `new TreeMap<>(Comparator.reverseOrder())` |

> **注意**：基本类型数组 `int[]` 不能用 `Comparator`，需要转 `Integer[]`

### 9.4 Collections.reverse()

```java
Collections.reverse(list);     // 反转 List 元素顺序（O(n)，底层是交换）
```

---

## 十、常见数据结构复杂度

### 10.1 时间复杂度速查

| 数据结构 | 访问 | 查找 | 插入 | 删除 | 特点 |
|----------|------|------|------|------|------|
| `int[]` | O(1) | O(n) | O(n) | O(n) | 最基础 |
| `ArrayList` | O(1) | O(n) | O(n) | O(n) | 尾部操作均摊 O(1) |
| `LinkedList` | O(n) | O(n) | O(1)* | O(1)* | *指已知位置 |
| `HashSet` | - | O(1) | O(1) | O(1) | 平均复杂度 |
| `TreeSet` | - | O(log n) | O(log n) | O(log n) | 有序 |
| `HashMap` | - | O(1) | O(1) | O(1) | 平均复杂度 |
| `TreeMap` | - | O(log n) | O(log n) | O(log n) | key 有序 |
| `Deque` | O(1) | - | O(1) | O(1) | 头尾操作 |
| `PriorityQueue` | O(1) | - | O(log n) | O(log n) | 堆顶为最值 |

### 10.2 各数据结构选择建议

| 场景 | 推荐选择 |
|------|----------|
| 需要下标随机访问 | `ArrayList` |
| 频繁头尾操作 | `ArrayDeque` / `LinkedList` |
| 需要去重 | `HashSet` |
| 需要有序去重 | `TreeSet` |
| 键值对映射 | `HashMap` |
| 需要按 key 排序 | `TreeMap` |
| 取 Top K | `PriorityQueue` |
| 保持插入顺序去重 | `LinkedHashSet` / `LinkedHashMap` |

---

## 十一、常用工具类

### 11.1 Math

```java
Math.max(a, b);           // 最大值
Math.min(a, b);           // 最小值
Math.abs(x);              // 绝对值
Math.pow(a, b);           // a 的 b 次方
Math.sqrt(x);             // 平方根
Math.floor(x);            // 向下取整
Math.ceil(x);             // 向上取整
Math.round(x);            // 四舍五入
```

### 11.2 Integer

```java
Integer.MAX_VALUE;        // int 最大值 (2^31-1)
Integer.MIN_VALUE;        // int 最小值 (-2^31)
Integer.parseInt(s);      // 字符串转 int
Integer.valueOf(s);       // 字符串转 Integer
Integer.toString(x);     // int 转字符串
```

### 11.3 Long

```java
Long.MAX_VALUE;           // long 最大值
Long.MIN_VALUE;           // long 最小值
Long.parseLong(s);        // 字符串转 long
```

### 11.4 Character

```java
Character.isDigit(c);     // 是否数字
Character.isLetter(c);   // 是否字母
Character.isLetterOrDigit(c); // 是否字母或数字
Character.isUpperCase(c); // 是否大写
Character.isLowerCase(c); // 是否小写
Character.toUpperCase(c); // 转大写
Character.toLowerCase(c); // 转小写
```

---

## 十二、常见技巧

### 12.1 输入输出

```java
import java.util.*;

Scanner in = new Scanner(System.in);

// 读取下一个 token
int n = in.nextInt();
long l = in.nextLong();
double d = in.nextDouble();
String s = in.next();              // 读取下一个单词（遇空白停止）
String line = in.nextLine();       // 读取整行（可能需先 next() 消费换行）

// 读取多行
while (in.hasNext()) {
    String s = in.next();
}

// 快读（推荐用于大数据量）
BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
String line = br.readLine();
String[] parts = line.split("\\s+");

// 快写
StringBuilder sb = new StringBuilder();
sb.append(x).append("\n");
System.out.print(sb);
```

### 12.2 数组初始化

```java
int[] arr = new int[n];        // 默认 0
Integer[] arr = new Integer[n]; // 默认 null
int[] arr = {1, 2, 3};         // 字面量
int[][] arr = new int[m][n];   // 二维数组
```

### 12.3 判断素数

```java
boolean isPrime(int x) {
    if (x < 2) return false;
    for (int i = 2; i * i <= x; i++) {
        if (x % i == 0) return false;
    }
    return true;
}
```

### 12.4 最大公约数 / 最小公倍数

```java
// 最大公约数（欧几里得算法）
int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}

// 最小公倍数
int lcm(int a, int b) {
    return a / gcd(a, b) * b;
}
```

### 12.5 溢出处理

```java
// 使用 long 防止溢出
long result = 1L * a * b;  // 至少一个 long

// 或者用 Math.multiplyExact（溢出抛异常）
try {
    long result = Math.multiplyExact(a, b);
} catch (ArithmeticException e) {
    // 处理溢出
}
```
