import React from 'react';
import './index.scss'
import {area,newprice,huxing,mianji,tese} from '../constant.ts'
const Pagesearch=()=> {
    const search=(path)=>{
       
    }
  return (
    <div className='pagesearch'>
       <div className="condition">
           <span style={{fontSize:'14px' ,color:'rgba(0,0,0,0.5)'}}>区域：</span>
            <div className="area">
                { area.map((item,index)=>{
                   return <span className='searchitem' onClick={()=>search(item.path)}>{item.name}</span>
                })}
            </div>
        </div>
        <hr className='hr'/>
        <div className="condition">
        <span style={{fontSize:'14px' ,color:'rgba(0,0,0,0.5)'}}>售价:</span>
            <div className="area">
            { newprice.map((item,index)=>{
                   return <span className='searchitem' onClick={()=>search(item.path)}>{item.name}</span>
                })}
            </div>
        </div>
        <hr className='hr'/>
        <div className="condition">
        <span style={{fontSize:'14px' ,color:'rgba(0,0,0,0.5)'}}>户型:</span>
            <div className="area">
            { huxing.map((item,index)=>{
                   return <span className='searchitem' onClick={()=>search(item.path)}>{item.name}</span>
                })}
            </div>
        </div>
        <hr className='hr'/>
        <div className="condition">
        <span style={{fontSize:'14px' ,color:'rgba(0,0,0,0.5)'}}>面积:</span>
            <div className="area">
            { mianji.map((item,index)=>{
                   return <span className='searchitem' onClick={()=>search(item.path)}>{item.name}</span>
                })}
            </div>
        </div>
        <hr className='hr'/>
        <div className="condition">
        <span style={{fontSize:'14px' ,color:'rgba(0,0,0,0.5)'}}>特色:</span>
            <div className="area">
            { tese.map((item,index)=>{
                   return <span className='searchitem' onClick={()=>search(item.path)}>{item.name}</span>
                })}
            </div>
        </div>
    </div>
  );
}
export default  Pagesearch