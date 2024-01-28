import { Button, Input } from 'antd';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './index.scss'
import Pagesearch from '../../components/pagesearch//index.tsx'
import img from '../../img/2bo.jpg'
const Newhome=(props)=> {
  const { path } = useParams();
  console.log(path);
  const queryParams = new URLSearchParams(window.location.search);
  const kw = queryParams.get('kw');
  const [inputValue, setInputValue] = useState('');
  const [choose, setChoose] = useState('all');
  const housearr=[1,2,3,4,5,6]
  const onChange=(event)=>{
    setInputValue(event.target.value);
  }
  const search=()=>{
    
    console.log(inputValue);
    
  }
  const choosed=(i)=>{
    setChoose(i)
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
        <Pagesearch />
      </div>
      <div className="newcontent">
        <div className="newhead">
          <div className={choose==='all'?'headitm headitmclick':'headitm'} onClick={()=>choosed('all')}>全部</div>
          <div className={choose==='cheap'?'headitm headitmclick':'headitm'} onClick={()=>choosed('cheap')}>优惠楼盘</div>
        </div>
        <div className="newhouse">
          {housearr.map(()=>{
            return (<div className="houseitem">
              <img className='img' src={img} alt="" />
              <div className="title">汤臣一品</div>
            </div>)
          })}
         
        </div>
        <div className="hotnew">
          112
        </div>
      </div>

    </div>
  );
}
export default Newhome