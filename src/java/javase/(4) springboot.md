---
title: 04 SpringBoot
article: false
category:
  - javase
---

## 一、 Spring 核心基础

### 1.1 IOC 和 AOP

（1）**IOC (控制反转)**：将对象的创建、配置和生命周期管理的权限由代码交给了 Spring 容器。核心思想是解耦，底层主要通过“反射 + 工厂模式”实现。 

（2）**DI (依赖注入)**：是 IOC 的具体实现方式，Spring 容器在运行期间，动态地将依赖关系注入到对象之中。常见的注入方式有构造器注入、Setter 方法注入和字段注入（`@Autowired`）。 

（3）**AOP (面向切面编程)**：能够在不修改原有业务代码的情况下，对程序的功能进行统一增强。底层主要基于动态代理（JDK 动态代理和 CGLIB 动态代理）。  应用场景：全局异常处理、统一日志记录、接口限流、权限校验、事务管理等。

### 1.2 Spring 常见注解

（1）**声明 Bean 的注解**：`@Component`（通用）、`@Controller`（Web 层）、`@Service`（业务层）、`@Repository`（持久层）。 （2）**配置类相关注解**：`@Configuration`（声明配置类）、`@Bean`（向容器中注入方法的返回值）、`@Import`（导入其他配置类或组件）。 

```java
// 假设这是别人写好的安全图纸，我们准备用 @Import 把它引进来
@Configuration
public class SecurityConfig {
    @Bean
    public SecurityManager securityManager() {
        return new SecurityManager(); // 返回一台安全管理设备
    }
}

// ---------------------------------------------------------

// 1. 【@Configuration】声明这是一份图纸（Redis 配置车间）
// 3. 【@Import】同时，把外部的安全图纸也合并进来
@Configuration
@Import(SecurityConfig.class)
public class RedisConfig {

    // 2. 【@Bean】图纸里规划了一台具体的设备：RedisTemplate
    @Bean
    public RedisTemplate<String, Object> myRedisTemplate() {
        // 在方法内部，我们手动组装这台机器
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setHostName("127.0.0.1");
        template.setPort(6379);
        
        // 组装完成后，返回这台机器。
        // 加上了 @Bean，Spring 就会把这个 template 搬进它的工厂里。
        return template; 
    }
}
```

自己写的代码用 `@Component` 自动扫描装配，第三方 jar 包里的类必须用 `@Bean` 手动实例化注入。

（3）**注入相关的注解**：`@Value`（注入基本数据或配置属性）、`@Autowired` 和 `@Resource`。

### 1.3 @Autowired 和 @Resource 的区别

（1）**来源不同**：`@Autowired` 是 Spring 框架提供的注解；`@Resource` 是 Java EE（JSR-250 规范）提供的注解（Spring 进行了兼容）。 （2）**注入机制不同**：`@Autowired` 默认按照**类型（byType）**进行装配，如果同类型的 Bean 有多个，则配合 `@Qualifier` 按照名称装配；`@Resource` 默认按照**名称（byName）**进行装配，如果找不到名称匹配的 Bean，再退化为按类型装配。

### 1.4 Spring Bean 的作用域

（1）**Singleton (单例)**：默认作用域，Spring IoC 容器中只会存在一个共享的 Bean 实例。 

（2）**Prototype (原型)**：每次通过容器获取 Bean 时，都会创建一个新的实例。 

（3）**Web 环境作用域**：`Request`（每次 HTTP 请求创建一个实例）、`Session`（同一个 HTTP Session 共享一个实例）、`Application`（全局 ServletContext 共享一个实例）。

### 1.5 Spring 中的设计模式

（1）**工厂模式**：`BeanFactory` 和 `ApplicationContext` 创建 Bean 对象。 

（2）**单例模式**：Spring Bean 的默认作用域就是单例。 

（3）**代理模式**：Spring AOP 功能的底层实现。 一对一强关联

（4）**观察者模式**：Spring 的事件驱动模型（`ApplicationEvent` 和 `ApplicationListener`）。  本质是Pub/Sub（发布-订阅）机制，一对多，发布者不认识订阅者。

（5）**模板方法模式**：`JdbcTemplate`、`RestTemplate` 等。

## 二、 Web 开发与 MVC 架构

### 2.1 MVC的本质

MVC 是 Model、View 和 Controller 的缩写，分别代表 Web 应用程序中的 3 种职责。

**Model（模型层）**：系统的核心大脑。负责所有的数据结构定义（实体类/JavaBean）以及核心业务逻辑的运算（Service 层）和数据持久化操作（Dao 层）。它**绝对不关心**数据最终会以什么样的方式（HTML/JSON）展示给用户。

**View（视图层）**：系统的展示终端。只负责一件事：拿到 Model 吐出的数据，把它渲染成客户端能看懂的格式（如 JSP、Thymeleaf，或者现代前后端分离架构中的 JSON 数据）。它**绝对不包含**任何复杂的逻辑判断。

**Controller（控制层）**：系统的交通枢纽。负责接收 HTTP 请求，解析参数，调用对应的 Model 跑业务，然后把跑完的数据塞给对应的 View 进行渲染。它是串联 M 和 V 的**调度者**。

### 2.2 Spring MVC

![](https://jiwang.cc.cd/PicGo/java/javase/2026-1776339843-15f52f.png)

#### **（1）框架内置组件**

- **前端控制器 (`DispatcherServlet`)**：整个 Spring MVC 的心脏和总调度室。所有的外部 HTTP 请求全部先打到这里，由它统一分发。极大降低了其他组件之间的直接耦合。
- **处理器映射器 (`HandlerMapping`)**：系统的“路由表”。它负责根据用户请求的 URL 和 Method，在内存中查找到底应该由哪个具体的 Controller 方法来处理。
- **处理器适配器 (`HandlerAdapter`)**：系统的“执行引擎”。因为开发者写的 Controller 千奇百怪，`DispatcherServlet` 不知道怎么直接调用，必须通过适配器，利用反射机制去执行目标方法。
- **视图解析器 (`ViewResolver`)**：系统的“翻译官”。把开发者返回的逻辑视图名称（比如返回了一个字符串 `"index"`），拼接上前缀和后缀，解析成真实的物理视图文件路径（如 `/WEB-INF/jsp/index.jsp`）。

#### **（2）开发者自定义组件**

- **处理器 (`Handler` / 即你写的 `Controller`)**：真正执行具体业务的分发逻辑，调用 Service 层，最后封装好数据和视图返回（通常返回 `ModelAndView`，现代架构多返回 `@ResponseBody` 包装的 JSON）。
- **视图 (`View`)**：真正用于数据渲染的模板或接口。

#### （3）一个 HTTP 请求的底层执行逻辑

**寻址路由**：`DispatcherServlet` 收到请求，调用 **`HandlerMapping`**。`HandlerMapping` 根据 URL 解析出具体的处理器（包括拦截器和 Handler），并将其封装成一个执行链返回给 `DispatcherServlet`。

**准备执行**：`DispatcherServlet` 获取到 Handler 后，调用对应的 **`HandlerAdapter`**。

**执行业务**：`HandlerAdapter` 提取 HTTP 请求中的参数，利用反射调用你手写的 **`Handler` (Controller)** 方法。你的代码在此处调用 Service 跑完业务后，会组装一个 **`ModelAndView`** 对象（包含业务数据 Model 和视图名称 View）返回给 `HandlerAdapter`。

**结果回传**：`HandlerAdapter` 将接收到的 `ModelAndView` 原封不动地传递回核心调度器 **`DispatcherServlet`**。

**视图解析**：`DispatcherServlet` 拿到逻辑视图名后，调用 **`ViewResolver`**。视图解析器根据配置，将其解析为真正的物理视图对象（View），并返回给 `DispatcherServlet`。

**渲染响应**：**`DispatcherServlet`** 拿着 View 对象和 Model 数据进行视图渲染（即将动态数据填充到 HTML/JSP 等模板中）。最终，将渲染好的页面或数据转化为 HTTP 响应报文，返回给浏览器展示。

------

## 三、 Spring 事务管理

### 3.1 Spring 事务基础

（1）**声明式事务**：通过 `@Transactional` 注解实现，底层基于 AOP，拦截方法执行，在方法开始前开启事务，结束后提交或回滚事务。 

（2）**传播行为**：

​	**REQUIRED（默认 - 同生共死）**：如果有大事务就加入，没事务就新建。大家绑在一条船上，任何一步报错，全部一起回滚。

​	**REQUIRES_NEW（自立门户）**：不管外面有没有事务，都强行开一个全新的独立事务。自己干完就直接提交，外面就算报错回滚，也影响不到我。

### 3.2 事务失效的原因

（1）**方法修饰符非 public**：`@Transactional` 只能应用在 public 方法上，否则 AOP 代理无法拦截，事务失效。 

（2）**同类内部方法调用**：类内部的方法 A 调用本类的带有 `@Transactional` 的方法 B 时，因为绕过了代理对象直接调用了 `this` 的方法，导致事务失效。 

（3）**异常被捕获（吞掉）**：如果在事务方法中使用了 `try-catch` 捕获了异常且没有再次抛出，Spring 会认为方法正常执行，从而提交事务而不是回滚。 

（4）**抛出受检异常**：Spring 默认只在发生 `RuntimeException` 或 `Error` 时回滚。如果抛出普通 `Exception`（如 `IOException`），除非配置了 `@Transactional(rollbackFor = Exception.class)`，否则不会回滚。

（5）**数据库引擎不支持**：例如 MySQL 中使用了 MyISAM 引擎（不支持事务），必须改为 InnoDB。

------

## 四、 SpringBoot 核心原理

### 4.1 SpringBoot 自动装配的原理

**（1）触发开关**：主类上的 `@SpringBootApplication` 开启了自动装配的大门，它通过内部的 `@EnableAutoConfiguration` 指派选择器开始工作。

**（2）收集候选（读清单）**：选择器去**当前 Classpath（即你 `pom.xml` 采购来的所有 Jar 包）**中，搜集所有名为 `.imports` 的文本清单。此时只是拿到了一堆“配置类全限定名”的字符串。

**（3）按需筛选（条件过滤）**：**这是“以 Jar 汰 Jar”的关键环节**。Spring 通过 **ASM 字节码技术**（不加载类，只读字节码）去扫描这些候选类头上的 `@Conditional` 注解。

- 如果 `@ConditionalOnClass` 要求的类在你的 Classpath 里找不到（说明你没在 `pom` 里引这个依赖），该配置类直接被**淘汰**。
- 如果 `@ConditionalOnMissingBean` 发现你已经在代码里手写了同名的 Bean，官方配置类也会被**淘汰**。

**（4）精准实例化**：只有通过了重重筛选、真正符合你当前 `pom` 环境和配置要求的配置类，才会被**通过反射真正加载进内存**，并完成 Bean 的注册。

### 4.2 SpringBoot 的启动流程

SpringBoot 的启动是通过 `SpringApplication.run()` 方法触发的一系列有序的容器初始化操作。

![img](https://jiwang.cc.cd/PicGo/java/javase/2026-1776339843-a1b737.png)

> SpringBoot 的启动本质上是**从静态配置到动态服务**的转化过程，可以分为三个核心阶段：

- **第一步：构建环境（Environment）** 先把所有的 `yml` 配置、环境变量、命令行参数整合到一起。**这一步是为了“定规则”**——决定程序跑在哪个端口、连哪个数据库。
- **第二步：初始化容器（Context）** 根据应用类型（Web 还是普通应用）实例化一个空的 Spring 容器。**这一步是“搭架子”**——此时容器里还没有业务对象，只是一个准备装载 Bean 的空壳。
- **第三步：刷新与激活（Refresh）** 这是最核心的 `refresh()` 过程。它会做三件大事：**解析自动装配清单**、**利用反射实例化所有 Bean**、以及**点燃内嵌的 Tomcat**。

## 五、代理服务

- **正向代理：** 替**“客户端”**发请求（例如本地配置代理访问外部明确服务如 Google）。
- **反向代理：** 替**“服务端”**接收并分发请求（如 Nginx 负载均衡，对外隐藏内部真实服务器 IP）。