import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import './index.scss'
import banner1 from '../../img/banner1.jpg';
import banner2 from '../../img/banner2.png';
import banner3 from '../../img/banner3.png';
const Page1=(props)=> {
  let   history = useHistory() //将useHistory()钩子赋值给history方便使用
  const bannerArr=[banner1,banner2,banner3]
  const [url,setUrl]=useState(bannerArr[0])

  useEffect(()=>{
    let i=0
    setInterval(()=>{
      i++
      setUrl(bannerArr[i])
      if(i===3){
        setUrl(bannerArr[0])
        i=0
      }
    },3000)
  },[])

  const login=(id:number)=>{
    history.push(`/detail/${id}`)
  }
  return (
    <div className='mainbox'>
      <img className="bg" src={url} alt='bg' />
      <div className="bg-text">
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