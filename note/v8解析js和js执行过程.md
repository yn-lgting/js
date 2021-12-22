

### 1. 浏览器内核

1. GecKo: 早期被火狐和netscape使用
2. trident(cuai等特): 微软开发, ie使用
3. Webkit: 苹果基于khtml开发, 开源, safari 和早期的chrome都在用
4. Blink: 是Webkit的分支, google开发, 用于chrome, edge等
5. 浏览器内核也成为: 排版引擎, 渲染引擎, 样板引擎  

### 2. 浏览器渲染过程

1. 当我们在浏览器中输入某个网址时, 会通过dns解析器映射到某个服务器地址, 服务器一般会返回一个html文件, 浏览器拿到对应文件后会进行parser(解析)生成对应的dom树和样式树,期间遇到js代码时, 会停止解析, 去加载js代码 然后将dom树和样式树融合成渲染树, 最后进行绘制在浏览器中展示出来.

### 3. Js引擎

* 解释: js是一门高级编程语言, 最终必须转化成机器指令去执行, 而js交给node后最终都是被cpu执行, 而这个转化的过程就需要js引擎去处理

#### 4.常见的浏览器引擎

1. SpiderMonkey: 第一款js引擎, 由js作者开发(Brendan Eich 布兰登 - 艾克)开发
2. Chaka: 微软开发, ie使用
3. jsCore: webkit中的js引擎, 苹果开发, 小程序中的js由jscore执行
4. V8: Google开发

#### 5. 浏览器内核跟浏览器引擎的关系

* 浏览器内核负责HTML解析, 布局, 渲染等相关工作
* 浏览器引擎负责解析执行js代码

#### 4. V8引擎原理

##### 1. 介绍

1. v8是由c++编写的js和webAssembiy(另一种可执行在浏览器中的语言 -- web伞不累)， 用于浏览器或Node.js等
2. 能实现ECMAScript在各种操作系统上运行， 它可以独立运行， 也能嵌入到任何C++应用程序中

##### 2. 解析js过程

1. v8拿到浏览器内核给的js源代码后首先会进行（parse）词法分析和语法分析生成对应（AST -- abstract syntax code)抽象语法树

   * **词法分析**： 会生成对应的tokens, 其本身是一个数组， 里面存储多个json对象来记录对应的源代码，

     ​	例如： const uname = 'lgt'

     ​	生产tokens：[ 

     ​		{type: 'keyword'， value：‘const’},

      		{type: 'identifier(唉灯特fai奥)', value: 'name'}

     ​		...

     ​	]

   * **语法分析**： 再次分析词法分析

   * **js如何被解析(parse过程)**

     1. v8引擎拿到js源码后， 由（Stream）进行编码转换

     2. Scanner回进行词法分析生成多个tokens

     3. 经过**parse**和**preparse** tokens会被转化为AST抽象语法树

        ![image-20211031030915272](C:\Users\gtam\AppData\Roaming\Typora\typora-user-images\image-20211031030915272.png)

        ![image-20211031030302625](C:\Users\gtam\AppData\Roaming\Typora\typora-user-images\image-20211031030302625.png)

        * **parse**: 直接将tokens转化为AST

        * **preParse**称之为预解析

          * 因为不是所有js代码,在一开始都会被执行, 那么对所有的js直接生成AST会影响网页的运行效率

          * 所以v8实现了**Lazy Parsing(延迟解析)**, 他的作用是将不必要的函数进行预解析,也就是只暂时解析需要的内容, 而对于函数的**全量解析**(全部解析)是在函数调用时才进行 

            ```js
            function a() {
              b() {} // 预解析
            }
            a()   // a会解析
            ```

            

2. 拿到抽象语法树之后通过解释器（Ignition）转为字节码（ byteCode), 因为js代码可能在不同环境下执行，（ 比如： mac， windows, 不同系统环境的cpu能解析的机器指令是不一样的）， 而字节码是v8引擎已经规定好的字节码， 然后将字节码转为不同环境下执行的机器指令， 体现在浏览器或node中。

   * ignition设计之初是为了减少移动端设备内存占用， 在这之前通过Full-codegen基准编译器生成的代码几乎占用chrome浏览器三分之一的堆内存， 而通过ignition优化的js代码在ARM64的移动设备上的内存占用下降了9倍

3. v8引擎在将AST转化为字节码时， 会收集类型信息等操纵去优化性能， 

   * TurboFan 可以为每个支持的平台编写更少的体系结构代码。在这个阶段中，体系结构代码只需要编写一次，而且很少需要更改。这些变化为V8提供了更容易维护和可扩展的特性。

   * 例子： 

     ```js
     function sum (a, b) {
       return a + b
     }
     /*
     	1.未优化的情况: sum每次执行都会将字节码变为汇编指令且再由汇编指令执行机器指令， 每次执行都会进行转化
     	2. 优化情况： 当sum函数频繁调用时， ignition会为该函数添加hot标识（热函数）， 且turboFan将其直接转化为优化过后的机器指令，每次调用直接会去执行优化过后的机器指令
     	3. 引发问题： 每次正常传递的number类型时， 可以直接去执行优化指令， 由于js是动态语言， 没有类型限制， 此时如果传入了字符串， 而字符串相加又是拼接操作， 他跟数字相加的机器指令是不一样的， 此时他会方向优化， 将其指令转化为回字节码，以字节码的方式再次编译，在cpu上运行
     	4. 总结： 所以类型限制很重要， 如果使用typeScript， 其运行效率可能回更高。
     */
     sum (1, 2)
     sum ('a', 'b')
     ```

     

4. v8充分多进程，主进程负责获取代码，编译生成机器码，有专门负责优化的进程，还有一个监控进程负责分析那些代码执行比较慢，以遍Crankshaft （克run客shaft）做优化，最后还有一个就是GC进程，负责内存垃圾回收。

### 4.js执行过程

#### 1. 初始化全局对象Global Object

* js引擎在执行之前会在堆内存中创建Global Object, 简称GO,
  * 该对象所有的作用域(scope)都可以访问
  * 里面包含了 Math, Date, Array 等
  * 其中有一个window对象指向的是自己

#### 2. 执行上下文栈

* js引擎内部有一个执行上下文栈(Execution Context Stack(栈), 简称ESC), 它用于执行代码的调用栈

* 首先会执行全局代码块

  * 执行全局的代码块时, 会创建一个Global Execution Context(EGC), 全局执行上下文;
  * GEC 会被放入 ECS中执行, 生成VO(variable[可变的, 可调节的]  Object)指向GO

* 全局上下文放入到执行上下文栈中包括一下内容

  1. 在代码执行前, **parse转成AST的过程中. 会将全局定义的变量函数**等加入到GO中, 但是不会赋值(值都是undefined),这个过程也成为**作用域提升**

  2. 在执行全局上下文时, 进行全局变量的赋值, 或执行其他函数

     ![image-20211031035458445](C:\Users\gtam\AppData\Roaming\Typora\typora-user-images\image-20211031035458445.png)

     ![image-20211031035633312](C:\Users\gtam\AppData\Roaming\Typora\typora-user-images\image-20211031035633312.png)

#### 3. 执行遇到函数时的情况(总结 + 图解)

* **个人总结:** 当js执行遇到函数时, v8引擎会在内存中开辟一块空间, 存储该函数的父级作用域(parent scope) **注意: 父级作用域在编译时已经被确定了, 所有跟在哪里调用是没关系的**, 和函数执行上下文, 并将其空间地址赋值给GO或AO(如果是全局作用域定义的函数则赋值给GO中对应属性,反之AO), 跟普通变量有所区别它存储的是一个空间地址, 此时代码开始执行, 执行到函数调用时, 就算在函数定义前调用, 也是可以成功调用其函数的. 

  **调用过程**: 首先将函数执行上下文推入主执行栈中, 然后生成VO对象,指向AO, 其AO对象主要存储着形参, 定义的变量, arguments等, 最后开始执行代码块, 第一步赋值形参, 然后如果在函数内部在定义某个变量前打印该变量, 值是undefined , 当代码执行完成之后, 会将其从主执行栈中弹出, 后续销毁

  **作用域链**: 当函数查找一个自身不存在的属性时, 会想其上层作用域(parent scope)查找, **上层作用域链在创建函数执行上下文时, 就已经被确定了**.

  

  * 下图面试题1解释
    1. **return在代码真正执行时, 才会生效, 他不会阻碍AO的编译**, 所以此时a是undefined

   ![image-20211101013901729](C:\Users\gtam\AppData\Roaming\Typora\typora-user-images\image-20211101013901729.png)

  * 面试题2

    ```js
    function foo() {
      var a = b = 10 // 相当于 var a = 10; b = 10 // 在js中没有用关键字声明的变量, 会添加到GO中
      
    }
    foo()
    console.log(a) // a is not defined
    console.log(b) // 将前一句注释 打印10
    ```

    

  ```js
  var uname = 'lgt'
  
  function foo() {
    console.log(uname); // lgt
  }
  
  function bar() {
    var uname = 'bar'
    foo()
  }
  
  bar()
  ```

  以上函数执行图解

  ![image-20211101010100165](C:\Users\gtam\AppData\Roaming\Typora\typora-user-images\image-20211101010100165.png)

* 在js执行时遇到函数时, 会根据函数体创建一个函数执行上下文(Functional Execution Contest 简称FEC), 压入到上下文执行栈中

1. 在函数执行上下文中, 包含三部分内容

   一. 在解析函数成为AST抽象语法树时, 会创建一个Activation Object(AO)

   *  AO中包含形参, arguments, 函数定义和指向函数对象, 定义的变量

   二. 形成作用域链, 由VO和父级VO组成,查找时, 会一层层查找
   
   三. this的绑定

#### 3.1 到底什么是VO

##### 1. VO在早期ECMA的版本定义

1. 每一个执行上下文(EC)都会关联一个变量对象(VO), 在函数执行上下文(FEC)中, 函数声明的属性, 参数都会被添加到VO对象中. 在全局上下文中 VO指向全局对象GO, 在局部作用域下VO指向其对应AO

##### 2.  VO在最新ECMA的版本定义

1. <font color="red">**将变量对象换称为变量环境(Variable  Environment 简称: VE)**</font>, 在执行的代码中, 变量或者是函数会作为<font color="#f00">**环境记录**</font>添加到**变量环境中**, 对于**函数的参数**也会**作为环境记录添加到变量环境中**





































































































