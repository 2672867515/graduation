import { Button, Input } from 'antd';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './index.scss'
import Pagesearch from '../../components/pagesearch//index.tsx'
import img from '../../img/2bo.jpg'
import { RightOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { LoginState,HeaderState } from '../../redux/action';
const Used=(props)=> {
  const dispatch = useDispatch();
  const { path } = useParams();
  console.log(path);
  const queryParams = new URLSearchParams(window.location.search);
  const kw = queryParams.get('kw');
  const type = queryParams.get('type');
  dispatch(HeaderState(type))
  let   history = useHistory() //将useHistory()钩子赋值给history方便使用
  const [inputValue, setInputValue] = useState('');
  const [choose, setChoose] = useState('all');
  const housearr=[{ts:['近地铁','fg'],hot:'热门好房'},
                {ts:['ute','5rt'],hot:0},
                {ts:['67yh','ewsf','fgh'],hot:0},
                {ts:['q343dw','e33'],hot:0},
                {ts:['f','fg'],hot:'超级优惠'},
                {ts:['hjk','6765g'],hot:0}
              ]
  const questions=[
    {id:1,qs:'sdssdss'},
    {id:2,qs:'sdssdss'},
    {id:3,qs:'sdssdss'},
    {id:4,qs:'sdssdss'},
    {id:5,qs:'sdssdss'},
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
  const more=()=>{
    history.push(`/Question`)
    dispatch(HeaderState('Question'))
  }
  const qs=(id)=>{
    history.push(`/Qa/${id}`)
    dispatch(HeaderState('Question'))
  }
  const detial=(id)=>{
    history.push(`/detail/${id}?type=Used`)
    
  }
  return (
    <div className='Newhome'>
      <div className="head">
        <span className="project">基于three.js的3D选房平台</span>
        <span className="pagetype">|  二手房</span>
      <Input placeholder="请输入楼盘名称、地址" className='searchinput' size={'middle'}  allowClear value={inputValue} onChange={onChange}  />
      <Button className='but' size={'middle'} type="primary"  style={{width:'100px', backgroundColor: 'rgb(35,201,147)' }} onClick={()=>search}>
        搜索
      </Button>
      </div>
      <div className="chat">高品质二手房</div>
      <div className="searchpart">
        <Pagesearch type={2} />
      </div>
      <div className="newcontent">
        <div className="newhead">
          <div className={choose==='all'?'headitm headitmclick':'headitm'} onClick={()=>choosed('all')}>全部</div>
          <div className={choose==='cheap'?'headitm headitmclick':'headitm'} onClick={()=>choosed('cheap')}>房东急售</div>
        </div>
        <div className="newhouse">
          {housearr.map((item)=>{
            return (<div className="houseitem" onClick={()=>detial(1)}>
              <img className='img' src={img} alt="" />
              {item.hot!==0&&<div className="hot">{item.hot}</div>}
              <div className="title">汤臣一品</div>
              <div className="size">100</div>
              <div className="address">10dss0</div>
              <div className="price">1000w <br /><span className="per">23564/㎡</span></div>
              <div className="ts">
                  {item.ts.map((item)=>{
                    return <div className="tsitems">{item}</div>
                  })}
              </div>
            </div>)
          })}
         
        </div>
        <div className="hotnew">
          <div className="title" onClick={more}>
            热门问答 
            <div className="to"> <RightOutlined /> </div>
          </div> 
          <div className="hotqs">
          
          {questions.map((item)=>{
                    return <div className="qsitems" onClick={()=>qs(item.id)}>{item.qs}</div>
                  })}
          </div>
        </div>
      </div>

    </div>
  );
}
export default Used