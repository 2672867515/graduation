import React, { useEffect, useState } from 'react';
import './index.scss'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LoginState } from '../../redux/action';
import { Button, Divider, Dropdown,Popover,Space  } from 'antd';
import { DownOutlined } from '@ant-design/icons';
const Header=(props)=> {
  const [click,Setclick]=useState('Page1')
  
  const isLogin = useSelector((state) => state.isLogin);
  const dispatch = useDispatch();

  const local=localStorage.getItem('login')
  let   history = useHistory() //将useHistory()钩子赋值给history方便使用

  const page=(page:string)=>{
    Setclick(page)
    history.push(`/${page}`)
  }
  const exit=()=>{
    localStorage.setItem('login','false')
    dispatch(LoginState('false'))
    history.push(`/Login`)
  }
  return (
    <div className='header'>
      <div className="items">
        <div className="item" style={{color:click==='Page1'?'rgb(0, 153, 0)':''}} onClick={()=>page("Page1")}>首页</div>
        {/* <div className="item" style={{color:click==='Page2'?'black':''}} onClick={()=>page("Page2")}>看房</div> */}
        {local==='false'&&<div className="login" style={{color:click==='Login'?'rgb(0, 153, 0)':''}} onClick={()=>page("Login")}>登录</div>}
        {/* {local==='true'&&<div className="login" style={{color:click==='Personal'?'rgb(0, 153, 0)':''}} onClick={()=>page("Personal")}>个人中心</div>} */}
        {/* {local==='true'&&<div className="login" style={{color:click==='Personal'?'rgb(0, 153, 0)':''}} onClick={()=>exit()}>退出</div>} */}
        {
           local==='true'&&  <Popover
           content={
            <div>  
              <span className='option' onClick={()=>page("Personal")}>个人中心</span><br />
              <span className='option' onClick={()=>exit()}>退出登录</span>
            </div>
          }
         >
           <div className="login">我的</div>
         </Popover>
        }
      </div>
    </div>
  )
}
export default Header