import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import  thunk  from 'redux-thunk'
import { counter } from './index.redux.js'

// 导入路由
import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom'

// 第三个参数 开启中间件    @(reducer, 初始值, 开启中间件 applyMiddleware )
// compose 是对几个函数进行组合
const store = createStore(counter,  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)) 

function one(){
    return <h1>一营</h1>
}
function two(){
    return <h1>二营</h1>
}

function three(){
    return <h1>三营</h1>
}

class Test extends React.Component {

  render(){
    return <h2>我是测试组件, 参数为 {this.props.match.params.name }</h2>
  }
}


ReactDom.render(
    <Provider  store={store}>
        < BrowserRouter>
          <div>
            <ul>
                <li><Link to="/">一营</Link></li>
                {/* <li><Link to="/two">二营</Link></li>  */}
                <li><Link to="/nxl">三营</Link></li>   
            </ul>
            <Switch>
                <Route path="/" exact component={one}></Route>
                <Route path="/:name" component={Test}></Route>
                {/* <Route path="/three" component={three}></Route> */}
                {/* <App  /> */}
                <Redirect to="/sada/213"></Redirect>
            </Switch>
          </div>
            
        </ BrowserRouter>
    </Provider>, 
    document.getElementById('root')
)
