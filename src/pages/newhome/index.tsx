import { Button, Input } from 'antd';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './index.scss'
import Pagesearch from '../../components/pagesearch//index.tsx'
import img from '../../img/2bo.jpg'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HeaderState } from '../../redux/action/index.jsx';
const Newhome=(props)=> {
  const dispatch = useDispatch();
  let   history = useHistory()
  const { path } = useParams();
  console.log(path);
  const queryParams = new URLSearchParams(window.location.search);
  const kw = queryParams.get('kw');
  const type = queryParams.get('type');
  dispatch(HeaderState(type))
  const [inputValue, setInputValue] = useState('');
  const [choose, setChoose] = useState('all');
  const housearr=[{ts:['近地铁','fg'],hot:'热门好房'},
                {ts:['ute','5rt'],hot:0},
                {ts:['67yh','ewsf','fgh'],hot:0},
                {ts:['q343dw','e33'],hot:0},
                {ts:['f','fg'],hot:'超级优惠'},
                {ts:['hjk','6765g'],hot:0}
              ]
  const hotarr=[
    {img:'',name:'sdssd',describe:'ddfgggggggggggdsfsssssssssssssssssdffffffffffffgggggsds'},
    {img:'',name:'sdssd',describe:'dsds'},
    {img:'',name:'sdssd',describe:'dsds'},
    {img:'',name:'sdssd',describe:'dsds'},
    {img:'',name:'sdssd',describe:'dsdfdgggggggggs'},
  ]
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
            return (<div className="houseitem" onClick={()=>detial(1)}>
              <img className='img' src={img} alt="" />
              {item.hot!==0&&<div className="hot">{item.hot}</div>}
              <div className="title">汤臣一品</div>
              <div className="size">100</div>
              <div className="address">10dss0</div>
              {type!=='Newhome'&&<div className="price">1000w <br /><span className="per">23564/㎡</span></div>}
              {type==='Newhome'&&<div className="newprice">均价：<span className="per">23564</span>/㎡</div>}
              <div className="ts">
                  {item.ts.map((item)=>{
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
         {hotarr.map((item)=>{
          return <div className="hotitem" onClick={()=>detial(1)}>
            <img className='img' src={img} alt="" />
            <div className="name">{item.name}</div>
            <div className="describe">{item.describe}</div>
          </div>
         }) }
        </div>
      </div>

    </div>
  );
}
export default Newhome