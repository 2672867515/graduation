import React, { useEffect, useState } from 'react';
import './index.scss'
import { useParams } from 'react-router-dom';
import {area,newprice,huxing,tese,rentprice,usedprice,rentts,usedts} from '../constant.ts'
import { condition } from '../../api/api.ts';
const Pagesearch=(props)=> {
    const {type,onCallback,iasearch}=props
    const queryParams = new URLSearchParams(window.location.search);
    const ptype = queryParams.get('type');
    const { path } = useParams();
    const [areaclick,setAreaclick]=useState('')
    const [priceclick,setPriceclick]=useState('')
    const [typeclick,setTypeclick]=useState('')
    const [tsclick,setTsclick]=useState('')

    const dosearch= (data)=>{
        if(ptype==='Newhome'){
            condition('newhome/condition',data).then(res=>{
                console.log(res);
                onCallback(res.data.data)
            })
        }
        if(ptype==='Used'){
            condition('used/condition',data).then(res=>{
                console.log(res);
                onCallback(res.data.data)
            })
        }
        if(ptype==='Rent'){
            condition('rent/condition',data).then(res=>{
                console.log(res);
                onCallback(res.data.data)
            })
        }
      

    }

    const search=(ctype,path)=>{
        let data={address:areaclick,price:priceclick,housetype:typeclick,feature:tsclick}

        switch (ctype){
            case 1:
            data.address=path
            setAreaclick(path)
            console.log(data);
            dosearch(data)
           
            break;

            case 2: 
            data.price=path
            setPriceclick(path);
            console.log(data);
            dosearch(data)
            break;

            case 3: 
            data.housetype=path
            setTypeclick(path);
            console.log(data);
            dosearch(data)
            break;

            case 4: 
            data.feature=path
            setTsclick(path);
            console.log(data);
            dosearch(data)
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
        {type===1&& <div className="condition">
        <span style={{fontSize:'14px' ,color:'rgba(0,0,0,0.5)'}}>特色:</span>
            <div className="area">
            { tese.map((item,index)=>{
                   return <span className={tsclick===item.path?'searchitem searchitemclick':'searchitem'} onClick={()=>search(4,item.path)}>{item.name}</span>
                })}
            </div>
        </div>}
        {type===2&& <div className="condition">
        <span style={{fontSize:'14px' ,color:'rgba(0,0,0,0.5)'}}>特色:</span>
            <div className="area">
            { usedts.map((item,index)=>{
                   return <span className={tsclick===item.path?'searchitem searchitemclick':'searchitem'} onClick={()=>search(4,item.path)}>{item.name}</span>
                })}
            </div>
        </div>}
        {type===3&& <div className="condition">
        <span style={{fontSize:'14px' ,color:'rgba(0,0,0,0.5)'}}>特色:</span>
            <div className="area">
            { rentts.map((item,index)=>{
                   return <span className={tsclick===item.path?'searchitem searchitemclick':'searchitem'} onClick={()=>search(4,item.path)}>{item.name}</span>
                })}
            </div>
        </div>}
    </div>
  );
}
export default  Pagesearch