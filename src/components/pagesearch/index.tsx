import React, { useEffect, useState } from 'react';
import './index.scss'
import { useParams } from 'react-router-dom';
import {area,newprice,huxing,mianji,tese,rentprice,usedprice,rentts} from '../constant.ts'
const Pagesearch=(props)=> {
    const {type}=props
    const { path } = useParams();
    const [areaclick,setAreaclick]=useState('')
    const [priceclick,setPriceclick]=useState('')
    const [typeclick,setTypeclick]=useState('')
    const [sizeclick,setSizeclick]=useState('')
    const [tsclick,setTsclick]=useState('')
    console.log(path);
    useEffect(()=>{
        setAreaclick(path)
        setPriceclick(path)
        setTypeclick(path)
        setSizeclick(path)
        setTsclick(path)
    },[])
    
    const search=(type,path)=>{
        switch (type){
            case 1: setAreaclick(path);
            break;
            case 2: setPriceclick(path);
            break;
            case 3: setTypeclick(path);
            break;
            case 4: setSizeclick(path);
            break;
            case 5: setTsclick(path);
            break;
        }
    }

  return (
    <div className='pagesearch'>
       <div className="condition">
           <span style={{fontSize:'14px' ,color:'rgba(0,0,0,0.5)'}}>区域：</span>
            <div className="area">
                { area.map((item,index)=>{
                   return <span className={areaclick===item.path?'searchitem searchitemclick':'searchitem'} onClick={()=>search(1,item.path)}>{item.name}</span>
                })}
            </div>
        </div>
        <hr className='hr'/>
        {type===1&&<div className="condition">
        <span style={{fontSize:'14px' ,color:'rgba(0,0,0,0.5)'}}>售价:</span>
            <div className="area">
            { newprice.map((item,index)=>{
                   return <span className={priceclick===item.path?'searchitem searchitemclick':'searchitem'} onClick={()=>search(2,item.path)}>{item.name}</span>
                })}
            </div>
        </div>}

        {type===2&&<div className="condition">
        <span style={{fontSize:'14px' ,color:'rgba(0,0,0,0.5)'}}>售价:</span>
            <div className="area">
            { usedprice.map((item,index)=>{
                   return <span className={priceclick===item.path?'searchitem searchitemclick':'searchitem'} onClick={()=>search(2,item.path)}>{item.name}</span>
                })}
            </div>
        </div>}

        {type===3&&<div className="condition">
        <span style={{fontSize:'14px' ,color:'rgba(0,0,0,0.5)'}}>租金:</span>
            <div className="area">
            { rentprice.map((item,index)=>{
                   return <span className={priceclick===item.path?'searchitem searchitemclick':'searchitem'} onClick={()=>search(2,item.path)}>{item.name}</span>
                })}
            </div>
        </div>}
        <hr className='hr'/>
        <div className="condition">
        <span style={{fontSize:'14px' ,color:'rgba(0,0,0,0.5)'}}>户型:</span>
            <div className="area">
            { huxing.map((item,index)=>{
                   return <span className={typeclick===item.path?'searchitem searchitemclick':'searchitem'} onClick={()=>search(3,item.path)}>{item.name}</span>
                })}
            </div>
        </div>
        <hr className='hr'/>
        <div className="condition">
        <span style={{fontSize:'14px' ,color:'rgba(0,0,0,0.5)'}}>面积:</span>
            <div className="area">
            { mianji.map((item,index)=>{
                   return <span className={sizeclick===item.path?'searchitem searchitemclick':'searchitem'} onClick={()=>search(4,item.path)}>{item.name}</span>
                })}
            </div>
        </div>
        <hr className='hr'/>
        {type!==3&& <div className="condition">
        <span style={{fontSize:'14px' ,color:'rgba(0,0,0,0.5)'}}>特色:</span>
            <div className="area">
            { tese.map((item,index)=>{
                   return <span className={tsclick===item.path?'searchitem searchitemclick':'searchitem'} onClick={()=>search(5,item.path)}>{item.name}</span>
                })}
            </div>
        </div>}
        {type===3&& <div className="condition">
        <span style={{fontSize:'14px' ,color:'rgba(0,0,0,0.5)'}}>特色:</span>
            <div className="area">
            { rentts.map((item,index)=>{
                   return <span className={tsclick===item.path?'searchitem searchitemclick':'searchitem'} onClick={()=>search(5,item.path)}>{item.name}</span>
                })}
            </div>
        </div>}
    </div>
  );
}
export default  Pagesearch