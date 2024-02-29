import React from 'react';
import './index.scss'
import { useDispatch } from 'react-redux';
import { HeaderState } from '../../redux/action';
import { useHistory } from 'react-router-dom';
import {area,newprice,usedprice,rentprice} from '../constant.ts'
interface detail{
    title:string
    condition:number
    type:String
}
const Search=React.memo((props:detail)=> {
    
    const {title,condition,type}=props
    let   history = useHistory() //将useHistory()钩子赋值给history方便使用
    const dispatch = useDispatch();
   
    const search=(path)=>{
        history.push(`/${type}/${path}?type=${type}`)
        dispatch(HeaderState(type))
    }
  return (
    <div className='searchcondition'>
        {title}
        {condition!==2&&<div className="condition">
           区域：
            <div className="area">
                { area.slice(1,14).map((item,index)=>{
                   return <span onClick={()=>search(item.path)}>{item.name}</span>
                })}
            </div>
        </div>}
        {condition!==2&&condition!==3&&<div className="condition">
            售价:
            <div className="area">
            { newprice.slice(1,20).map((item,index)=>{
                   return <span onClick={()=>search(item.path)}>{item.name}</span>
                })}
            </div>
        </div>}
        {condition===2&&<div className="condition">
            售价:
            <div className="area">
            { usedprice.slice(1,20).map((item,index)=>{
                   return <span onClick={()=>search(item.path)}>{item.name}</span>
                })}
            </div>
        </div>}
        {condition===3&&<div className="condition">
            租金:
            <div className="area">
            { rentprice.slice(1,20).map((item,index)=>{
                   return <span onClick={()=>search(item.path)}>{item.name}</span>
                })}
            </div>
        </div>}
    </div>
  );
})
export default Search