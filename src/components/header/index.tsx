import React, { useState } from 'react';
import './index.scss'
import { useHistory } from 'react-router-dom';
const Header=(props)=> {
  const [click,Setclick]=useState('Page1')
  
  let   history = useHistory() //将useHistory()钩子赋值给history方便使用
  const page=(page:string)=>{
    Setclick(page)
    history.push(`/${page}`)
  }
  return (
    <div className='header'>
      <div className="items">
        <div className="item" style={{color:click==='Page1'?'black':''}} onClick={()=>page("Page1")}>首页</div>
        <div className="item" style={{color:click==='Page2'?'black':''}} onClick={()=>page("Page2")}>看房</div>
        <div className="login" style={{color:click==='Login'?'black':''}} onClick={()=>page("Login")}>登录</div>
      </div>
    </div>
  )
}
export default Header