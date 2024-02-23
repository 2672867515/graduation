import { Button, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './index.scss'
import Pagesearch from '../../components/pagesearch//index.tsx'
import img from '../../img/2bo.jpg'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HeaderState } from '../../redux/action/index.jsx';
import {getall, newhomegetHot, updateHead} from '../../api/api.ts'


const Newhome=(props)=> {
  const dispatch = useDispatch();
  let   history = useHistory()
  const { path } = useParams();
  console.log(path);
  const queryParams = new URLSearchParams(window.location.search);
  const kw = queryParams.get('kw');
  const type = queryParams.get('type');
  dispatch(HeaderState('Newhome'))
  const [inputValue, setInputValue] = useState('');
  const [choose, setChoose] = useState('all');
  const [housearr, setHousearr] = useState([]);
  const [hotnewhome, setHotnewhome] = useState([]);
  useEffect(()=>{
    getall('newhome/getall').then(res=>{
      setHousearr(res.data.data.sort((a, b) => a.averageprice - b.averageprice))
    })
    newhomegetHot('newhome/newhomegetHot').then(res=>{
      console.log(res);
      setHotnewhome(res.data.data.slice(0,4))
    })
  },[])
  const onChange=(event)=>{
    setInputValue(event.target.value);
  }
  const search=()=>{
    
    console.log(inputValue);
    
  }
  const choosed=(i)=>{
    setChoose(i)
  }
  const detial=(id)=>{
    history.push(`/detail/${id}?type=Newhome`)
    
  }

  return (
    <div className='Newhome'>
      <div className="head">
        <span className="project">基于three.js的3D选房平台</span>
        <span className="pagetype">|  新房</span>
      <Input placeholder="请输入楼盘名称、地址" className='searchinput' size={'middle'}  allowClear value={inputValue} onChange={onChange}  />
      <Button className='but' size={'middle'} type="primary"  style={{width:'100px', backgroundColor: 'rgb(35,201,147)' }} onClick={()=>search}>
        搜索
      </Button>
      </div>
      <div className="chat">新楼盘开售</div>
      <div className="searchpart">
        <Pagesearch type={1} />
      </div>
      <div className="newcontent">
        <div className="newhead">
          <div className={choose==='all'?'headitm headitmclick':'headitm'} onClick={()=>choosed('all')}>全部</div>
          <div className={choose==='cheap'?'headitm headitmclick':'headitm'} onClick={()=>choosed('cheap')}>优惠楼盘</div>
        </div>
        <div className="newhouse">
          {housearr.map((item)=>{
            return (<div className="houseitem" onClick={()=>detial(item.id)}>
              <img className='img' src={item.cover} alt="" />
              {item.ishot==='true'&&<div className="hot">人气好房</div>}
              <div className="title">{item.name}</div>
              <div className="size">{item.size}m²</div>
              <div className="address">{item.address}</div>
              <div className="newprice">均价：<span className="per">{item.averageprice}</span>/㎡</div>
              <div className="ts">
                  {item.feature.split("，").map((item)=>{
                    return <div className="tsitems">{item}</div>
                  })}
              </div>
            </div>)
          })}
         
        </div>
        <div className="hotnew">
          <div className="title">
            热门好房
          </div> 
         {hotnewhome.map((item)=>{
          return <div className="hotitem" onClick={()=>detial(item.id)}>
            <img className='img' src={item.cover} alt="" />
            <div className="name">{item.name}</div>
            <div className="describe">{item.address}</div>
          </div>
         }) }
        </div>
      </div>

    </div>
  );
}
export default Newhome