import React from 'react'
import { connect } from 'react-redux'
import { addGUN, removeGUN, addGunAsync } from './index.redux.js'




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
// App = connect(mapStatetoProps, actionCreate)(App)  //react-redux 会自动的把这些放到props 里面

// babel-plugin-transform-decorators-legacy 插件优化后的写法  效果一样
@connect(mapStatetoProps, actionCreate)



class App extends React.Component{

  render(){
    return (
      <div>
        <h1>现在有机关枪{this.props.num}把</h1>
        <button type="button" onClick={ this.props.addGUN}>申请武器</button>
        <button type="button" onClick={ this.props.removeGUN}>回收武器</button>
        <button type="button" onClick={ this.props.addGunAsync}>拖两天再给</button>
      </div>
    )
  }
}

export default App