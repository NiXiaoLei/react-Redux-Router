## react 基础
> npm run eject 弹出配置文件, 可自定义配置webpack( 注意,此操作不可逆 )
此操作多处的文件 
> webpack config 文件
> scripts 这里存放的是  npm  命令的实际执行操作
> package.json  会多出许多依赖文件  如: babel, css-loader, eslint 等等
这些文件开始时是被 react 封装的, npm run eject 会将其暴露出来, 让我们随心所欲的配置, 新手一般不需要修改

### 更新react
> $ npm install --save react@next react-dom@next

### JSX 中事件 及 this 
> 绑定事件语法  onClick={ ()=>this.fn }
事件的默认this  是不正确的 this 为 underfind

解决方法

1. 利用箭头函数保留this 指向 并返回 该方法
> ()=> this.fn
2. 直接在jsx语法中绑定this 指向
> onClick = { this.fn.bind(this) }
3. 在函数构造时将事件的this 指向绑定
```
constructor(){
  this.fn = this.fn.bind(this)
}
```
需要注意的地方
> onClick={ this.fn() }
这样的带 ` 括号 ` 写法会在dom渲染时就自动执行该方法


## redux 的安装
> 一个专注于状态管理的库, 和react 解耦,  用vue 和 angular 也可以使用redux
> 单一状态 单项数据流
> 核心概念 : store, state, action, reducer

学习地址
> 阮一峰 redux  教程
> http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html

> npm install redux --save
App.js 中引入  reduex
> import { createStore }  from 'redux'   # 此时只要不报错代表项目已经引入成功




## redux 基本 API
> 4个重要的API  state , getState , dispatch, subscribe
> createStore 相当于一个保险箱， 里面有state ,  dispatch 会根据action 来进行修改 state ， subscribe 相当于监控，监视着state 的变化

reducer 
> 为什么叫reducer  因为这个纯函数 可以通过下方这样使用来达到 Array.reduce 的效果
```
let arr = [
  {type: 'add', payload: 1},
  {type: 'add', payload: 2},
  {type: 'add', payload: 3}
]
arr.reduce(reducer, 0)  //返回结果 6
```
> 因为reduce 的参数是   (回调 , 初始值) ,  回调中的参数为 (之前计算的和 , 当前相的值)
> 每次执行时都将 arr 的其中一个对象 传入 reducer  ，于是reducer 会根据此返回对应的计算结果， 
> 模拟该操作第一次执行情况     0 + reducer( type: 'add', payload: 1 )  <- 该reducer 返回 1 因为state 我定义的默认值是0
> 模拟该操作第二次执行情况     1 + reducer( type: 'add', payload: 2 ) <- 该reducer 返回 2 
> 模拟该操作第三次执行情况     3 + reducer( type: 'add', payload: 3 ) <- 该reducer 返回 3 


自己实现 createStore
```
    const createStore = (reducer) => {
        
        // 得到初始值
        let state;
        // 监听事件的数组
        let listens = []

        // 获取数据快照
        const getState = () => state 
        
        // 负责更新状态
        const dispatch = (action) => {
            state = reducer(state, action)
            listens.forEach((listen)=>{
                listen()
            })
        }
        // 创建监听函数以及,销毁监听函数
        const subscribe = (newListen) => {
            listens.push(newListen)
            // 返回一个销毁监听函数的方法
            return ()=>{
                listens = listens.filter( l => l !== newListen )
            }
        }
        return { getState, dispatch, subscribe }
    }

    //  reducer 必须返回新的状态， 并且是固定状态   ，因为要求是静态函数
    const reducer = function(state = 0, action ){
        switch(action.type){
            case 'add':
                return state += action.payload
            case 'del':
                return state -= action.payload
            default: 
                return state
        }
    }


    const store = createStore(reducer)

    
    let delFn = store.subscribe(()=>{
        console.log('正在监听变化')
    })

    console.log(store.getState())

    store.dispatch({type: 'add', payload: 5})
```

## redux 如何处理异步 更优雅的与react结合
> 需要 redux-thunk 插件  需要applyMiddleware 来开启中间件
> npm install redux-devtools-extension  并且开启
> 使用react-redux 连接react和redux

安装react-redux
> npm install react-redux --save
有了react-redux 就可以忘记 subscribe  了  ,它会自动帮我们做处理
也不需要从属性来传递

提供了两个新接口
> Provider 负责传递 包裹在根组件最外层, 传入store 只用一次 ,子组件直接使用store 
> connect  负责从外部获取组件需要的参数, 需要在需要的子组件中 import

connect 
> 负责将 state 和 action 挂在到当前组件的props上
> 写在导出app之前  调用
> 传入APP 吐出 挂载完成的 APP
```
// 是一个过滤 筛选的功能 , ,不可能把所有数据都返回
// 传入的是一个状态  返回想要的类型
// 就是把 num 附在 props 上  并且值为 state
const mapStatetoProps = (state)=>{
  return { num: state }
}

// 将addGUN ,removeGUN, addGunAsync 都挂载到 props 上
const actionCreate = { addGUN, removeGUN, addGunAsync }

// 装饰器的模式 ?
//  第一个参数 mapStatetoProps  需要返回的格式
//  第二个参数  actionCreate   所有的action
App = connect(mapStatetoProps, actionCreate)(App)  //react-redux 会自动的把这些放到props 里面
export default App

```

## 使用装饰器优化 connect
> 需要弹出黑盒   npm run eject
> npm install babel-plugin-transform-decorators-legacy 
> 在package.json 里加上plugins 配置   +  "transform-decorators-legacy"

优化后的connect 
> @connect(mapStatetoProps, actionCreate)



## 如何使用rudex-devTools  谷歌插件  这是个大坑
> 这个坑阻挡了我了 一个上午,  为什么正常安装插件没法使用 , 
> https://github.com/zalmoxisus/redux-devtools-extension   插件的github 地址

需要在redux 引出compose  中间件的整合器
> import { createStore, applyMiddleware, compose } from 'redux'

根据官方描述将 插件与异步处理中间件 thunk 整合在一起
```
 compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)) 
```

谨记,如果安装了插件 也配置了 compose 都不行, 那就去更新一下 chrome 浏览器, 然后使用github 里 以npm 的方式安装插件, 我就是死在这上面, 差点怀疑人生


## react-Router 4
### router  基本用法
> npm install react-router-dom --save
> 与 rudex 类似 , 需要 用  <BrowserRouter/> 标签将组件包裹

> 在 路由主体区  `<Route path='/' ></Route>` 
路由默认是正则匹配 ,所以 进入 '/two' 时 '/' 的路由也会显示
> 加上 exact 就是完全匹配

在有redux 的情况下 示例代码
> route 必须放在一个根节点中

```
   <Provider  store={store}>
        < BrowserRouter>
          <div>
            <ul>
                <li><Link to="/">一营</Link></li>
                <li><Link to="/two">二营</Link></li> 
                <li><Link to="/three">三营</Link></li>   
            </ul> 
            <Route path="/" exact component={one}></Route>
            <Route path="/two" component={two}></Route>
            <Route path="/three" component={three}></Route>
            {/* <App  /> */}
          </div>
            
        </ BrowserRouter>
    </Provider>
```

### Router 传参 跳转
传参
> 传参  在路径上以 '/:参数key值' 如  '/:name' 的形式传参
> 那跳转时  `<Link to="/nxl" ></Link>`  nxl 就是value  也就是传递的真实参数



js 跳转路由
> this.props.history.push('/')

Redirect 跳转 在没有Switch 的情况下, 页面无论如何都会按Redirect 去跳转
> <Redirect to="/sasdasdasd" />  

Switch  只响应第一个匹配上的 路由Router
> 需要包裹住 所有Router


## antd-mobile UI库
> 这是一个阿里的开箱即用的高质量 React 组件。
手册地址
> https://ant.design/docs/react/introduce-cn#%E7%89%B9%E6%80%A7
安装
> 安装最新版  npm install antd-mobile@next --save

使用方式
> import { Button } from 'antd-mobile'
> import 'antd-mobile/dist/antd-mobile.css'   引入css
> 然后以组件的方式写入jsx


按需加载 
> 只导入需要的 部分ui  此时,我只需要加载 Button 的样式 ,
> import { Button } from 'antd-mobile'
> import 'antd-mobile/lib/button/style/css.js';
> 但是你不觉得这样导入太麻烦了吗

### babel 自动按需加载
> 使用了babel 之后 仍可以 import { Button } from 'antd'; 这样来加载
插件会帮你转换成 antd/lib/xxx 的写法。另外此插件配合 style 属性可以做到模块样式的按需自动加载。

安装
> npm install babel-plugin-import --save-dev 

如果以及 使用 eject 将webpack 暴露出来时, 就不需要安装官方的插件
>  npm install react-app-rewired --save-dev  
> 该插件作用 配合 config-overrides.js ,来实现自定义 webpack 配置
> 手册地址  https://mobile.ant.design/docs/react/use-with-create-react-app-cn

只需这样
> 在 package.json 中下方的babel配置中加上  "plugins": [ "import", { "libraryName": "antd-mobile", "style": "css" }]
> 如下
```
  },
  "babel": {
    "presets": [
      "react-app"
    ],
    "plugins": [
      ["import",
        {
          "libraryName": "antd-mobile",
          "style": "css"
        }
      ]
    ]
  },
```
注意啊, import 外部还得套个数组  ,就因为这个问题我折腾了2个小时
修改皮肤颜色
> <Button type="primary" />  改为primary 蓝色


## express  mongoDB 复习
> npm install mongoose --save
使用 mongoose  
> const mongoose = require('mongoose')
连接 mongoDB
> mongoose.connect( DB_URL )
连接成功事件
> mongoose.connection.on('connected', callback)

### 定义文档模型
> Schema 和 model 新建模型 
