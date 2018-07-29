const ADD_GUN = '加机关枪'
const REMOVE_GUN = '减机关枪'

export function counter(state = 0, action){
  switch(action.type){
    case ADD_GUN:
      return state + 1;
    case REMOVE_GUN:
      return state - 1;
    default:
      return state;
  }
}



// action creator
export function addGUN(){
  return {type: ADD_GUN}
}

export function removeGUN(){
  return {type: REMOVE_GUN}
}



// 个人理解, 应该是 applyMiddleware 开启thunk 后, 默认就会往dispatch 的函数参数里传入下面的方法
// dispatch 回调
// dispatch() {
//   return _dispatch.apply(undefined, arguments);
// }

export function addGunAsync(){
  return ( dispatch )=> {
    setTimeout(()=>{
      return dispatch(addGUN())
    }, 2000)
  }
}