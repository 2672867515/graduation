import React from 'react'
import { useHistory } from 'react-router-dom';
import './index.scss'
const Page1=(props)=> {
  let   history = useHistory() //将useHistory()钩子赋值给history方便使用
  const login=(id:number)=>{
    history.push(`/Page2/${id}`)
  }
  return (
    <div className='mainbox'>
     首页
     <div className="a" onClick={()=>login(1)}>11</div>
     <div className="a" onClick={()=>login(2)}>22</div>
    </div>
  )
}
export default Page1