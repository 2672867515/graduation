import { Type } from '../constant';
// 构建reducer函数
// 设置初始值
const initState = {
  isLogin:false
};
export default (state = initState, action) => {
  const { type, value } = action;
  // console.log('reducer', state, action);
  switch (type) {
    case Type.ISLOGIN:
      return {...state,isLogin: value};
    case Type.DECREMENT:
      return state - value;
    default:
      return initState;
  }
};
