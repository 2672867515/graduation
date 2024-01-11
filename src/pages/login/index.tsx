import React from 'react';
import { useHistory } from 'react-router-dom';

const  Login=(props)=> {
  let   history = useHistory() //将useHistory()钩子赋值给history方便使用
  const login=()=>{
    history.push(`/Page1`)
  }
  return (
    <div onClick={()=>login()}>
      login
    </div>
  );
}
export default Login