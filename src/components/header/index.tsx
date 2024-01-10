import React from 'react';
import './index.scss'
import { useHistory } from 'react-router-dom';
const Header=(props)=> {
  let   history = useHistory() //将useHistory()钩子赋值给history方便使用
  const page=(page:string)=>{
    history.push(`/${page}`)
  }
  return (
    <div className='header'>
      <div className="items">
        <div className="item" onClick={()=>page("Page1")}>首页</div>
        <div className="item" onClick={()=>page("Page2")}>看房</div>
        <div className="login" style={{}} onClick={()=>page("Login")}>登录</div>
      </div>
    </div>
  )
}
export default Header