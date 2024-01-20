import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import './index.scss'
import home from '../../img/home.jpg';
const Page1=(props)=> {
  let   history = useHistory() //将useHistory()钩子赋值给history方便使用
  const [url,setUrl]=useState(home)

  const login=(id:number)=>{
    history.push(`/detail/${id}`)
  }
  return (
    <div className='mainbox'>
      <img className="bg" src={url} alt='bg' />
      <div className="text">
      基于three.js的3D选房平台
      </div>
      <div className="content">
      首页
      <div className="a" onClick={()=>login(1)}>11</div>
      <div className="a" onClick={()=>login(2)}>22</div>
      </div>
    
    </div>
  )
}
export default Page1