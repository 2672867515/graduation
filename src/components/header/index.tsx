import React from 'react';
import './index.css'
import { useHistory } from 'react-router-dom';
const Header=(props)=> {
  let   history = useHistory() //将useHistory()钩子赋值给history方便使用
  const page=(page:string)=>{
    history.push(`/${page}`)
  }
  return (
    <div className='header'>
      <div className="item" onClick={()=>page("Page1")}>首页</div>
      <div className="item" onClick={()=>page("Page2")}>看房</div>
    </div>
  )
}
export default Header