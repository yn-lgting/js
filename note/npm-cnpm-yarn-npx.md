# 包管理工具

### 1. npm
* Node包管理工具，官网：npmjs.com
* npm的包是放在registry上面的，安装时会去registry上面下载

#### 1.1npm的配置文件
* npm如何管理多个包
  * 每一个项目都会有对应的配置文件(vue, react, node)等
  * 配置文件会记录着项目的名称，版本号，项目描述，也会记录一些包及其版本号的信息
* **配置文件：package.json**
  * 创建package.json
    1. 手动创建
    2. npm init 配置后创建，npm -y 使用默认配置直接创建
    3. 创建vue react项目时，自动生成的配置文件
  * **配置文件中常见属性：**
    * name： 项目的名称 ｜ 必须属性
    * version： 项目当前版本号 ｜ 必须属性
    * descrption： 项目的基本描述
    * author： 项目作者，发布时会用到
    * license：开源协议
    * **private： [true | false], 记录当前项目时会否是私有的，true为是，反之不是**
      * 值为true是，npm则不能发布该项目，防止私有项目被发布出去
    * **main属性**
      * 设置项目入口
      * 当在引入该模块时，这个包配置了main，则去该配置的文件地址查找导出的模块
    * **scripts属性**
      * 用于配制基本脚本命令，以键值对的形式存在
      * 配置后可以通过npm run 命令key 去执行该命令
      * npm run start 和 npm start的区别
        * 他们是等价的，但是可省略的命令只有 start，test，stop， restart可以直接省略run
    * **dependencies属性**
        * dependencies指在开发环境和生产环境都依赖的包
    * devDependencies
        * 开发环境所依赖的包
    * peerDependencies属性
        * 一种包所依赖的另一个包，它必须是另外一个宿主包为前提
        * 比如说element-puls 依赖于vue3，ant-design依赖于react，react-dom
    * 依赖版本管理
      * npm包遵循semver规范
      * semver版本规范是X.Y.Z
        * X 主版本号
        * Y 次版本号
        * Z 修订号， 向下兼容，比如说没有新功能，修复之前版本的bug
      * 版本号前的 ~ 和 ^
      * ^X.Y.Z 表示x保持不变，yz永远是最新版本
      * ~X.Y.Z 表示x保持不变，z永远都是最新版本