import { Button, Input } from 'antd';
import React, { useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './index.scss'
import Pagesearch from '../../components/pagesearch//index.tsx'
import img from '../../img/2bo.jpg'
import nodata from '../../img/nodata.jpg'
import { RightOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { LoginState,HeaderState } from '../../redux/action';
import { alikebynra, getall, getallhouseqa, getbyprice, getusedhouseqa } from '../../api/api.ts';
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
  const [qa, setQa] = useState([]);

  const [housearr, setHousearr] = useState([]);
  useEffect(()=>{
    window.scrollTo(0, 0);

    if(path==='all'){
      getall('used/getall').then(res=>{
        setHousearr(res.data.data.sort((a, b) => a.price - b.price))
      })
    }else if(path*1>-1){
      console.log(111);
      
      getbyprice('used/getbyprice',{price:path}).then(res=>{
        setHousearr(res.data.data.sort((a, b) => a.price - b.price))
      })
    }else if(path==='to'){

      alikebynra('used/alike',{address:kw}).then(res=>{
        setHousearr(res.data.data.sort((a, b) => a.price - b.price))
      })
    }

    getusedhouseqa('question/getusedhouseqa',{housetype:'Used'}).then(res=>{
      console.log(res.data.data);
      let data=res.data.data.sort((a, b) =>{
        const dateA = new Date(a.time+ 'T00:00:00');
        const dateB = new Date(b.time+ 'T00:00:00');
        return dateB - dateA; // 从近到远排序
      })
      setQa(data.slice(0,5))
      
    })
  },[])

  const onChange=(event)=>{
    setInputValue(event.target.value);
  }
  const search=()=>{
    alikebynra('used/alike',{address:inputValue}).then(res=>{
      console.log(res.data.data);
      
      setHousearr(res.data.data.sort((a, b) => a.price - b.price))
    })
  }
  const more=()=>{
    history.push(`/Question?houseid=all&housetype=all`)
    dispatch(HeaderState('Question'))
  }
  const qs=(item)=>{
    const regex = /\[(.*?)\]/; // 使用非贪婪模式匹配方括号内的内容
    const match = item.content.match(regex); // 匹配字符串中的方括号内容
    history.push(`/Qa?qa=${item.id}&name=${match[1]||'未知楼盘'}`)
    dispatch(HeaderState('Question'))
  }
  const detial=(item)=>{
    history.push(`/detail/${item.id}?type=Used&address=${item.address}&ishot=${item.ishot}`)
    
  }
  const onCallback=(data)=>{
    setInputValue('')
    setHousearr(data.sort((a, b) => a.price - b.price))
  }
  return (
    <div className='Newhome'>
      <div className="head">
        <span className="project">基于three.js的3D选房平台</span>
        <span className="pagetype">|  二手房</span>
      <Input placeholder="请输入楼盘名称、地址" className='searchinput' size={'middle'}  allowClear value={inputValue} onChange={onChange}  />
      <Button className='but' size={'middle'} type="primary"  style={{width:'100px', backgroundColor: 'rgb(35,201,147)' }} onClick={search}>
        搜索
      </Button>
      </div>
      <div className="chat">高品质二手房</div>
      <div className="searchpart">
        <Pagesearch type={2} onCallback={onCallback} />
      </div>
      <div className="newcontent">
        <div className="newhead">
          <div className='headitm headitmclick'>全部</div>
        </div>
        <div className="newhouse">
        {housearr.length===0&&  <img src={nodata} alt="" />}
          {housearr.map((item)=>{
            return (<div className="houseitem" onClick={()=>detial(item)}>
              <img className='img' src={item.cover} alt="" />
              {item.ishot==='true'&&<div className="hot">热门二手房</div>}
              <div className="title">{item.name}</div>
              <div className="size">{item.size}m²</div>
              <div className="address">{item.address}</div>
              <div className="price">{item.price}w <br /><span className="per">{item.per}/㎡</span></div>
              <div className="ts">
              {item.feature.split("，").map((item)=>{
                    return <div className="tsitems">{item}</div>
                  })}
              </div>
            </div>)
          })}
         
        </div>
        <div className="hotnew">
          <div className="title" onClick={more}>
            最新问答 
            <div className="to"> <RightOutlined /> </div>
          </div> 
          <div className="hotqs">
          
          {qa.map((item)=>{
            return (
              <div className="qsitems">
                <div className="content" onClick={()=>qs(item)}>{item.content}</div>
                <div className="qtime"> {item.time}</div>
              </div>
            )
          })}
          </div>
        </div>
      </div>

    </div>
  );
}
export default Used