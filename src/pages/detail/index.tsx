import React, { useEffect, useState } from 'react'
import Vr from '../../components/VR/index.tsx'
import { useParams } from 'react-router-dom';
import  './index.scss'
import { useDispatch,useSelector } from 'react-redux';
import { HeaderState } from '../../redux/action/index.jsx';
import ds from '../../img/ds.png'
import kt from '../../img/kt.png'
import yg from '../../img/yg.png'
import c from '../../img/c.png'
import wsj from '../../img/wsj.png'
import znms from '../../img/znms.png'
import yt from '../../img/yt.png'
import nq from '../../img/nq.png'
import bx from '../../img/bx.png'
import xyj from '../../img/xyj.png'
import rsq from '../../img/rsq.png'
import kd from '../../img/kd.png'
import sf from '../../img/sf.png'
import yyj from '../../img/yyj.png'
import rqz from '../../img/rqz.png'
import kzf from '../../img/kzf.png'
import img from '../../img/2t.jpg'
import nodata from '../../img/nodata.jpg'
import { useHistory } from 'react-router-dom';
import { Tooltip,message } from 'antd';
import {
  StarFilled,LeftOutlined,RightOutlined
} from '@ant-design/icons';
import { getByid, getHousetype, getrentimg, rentgetByid, usedgetByid } from '../../api/api.ts';
const Detail=(props)=> {
  const eqs=[ds,kt,yg,c,wsj,znms,yt,nq]
  const eqs2=[bx,xyj,rsq,kd,sf,yyj,rqz,kzf]
  const [collect,setCollect]=useState(true)
  let   history = useHistory()
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);
  const queryParams = new URLSearchParams(window.location.search);
  const type = queryParams.get('type');

  dispatch(HeaderState(type))
  const header = useSelector((state) => state.header);
  const [housedata,setHousedata]=useState({})
  const [tsarr,setTsarr]=useState(['特色'])
  const [messageApi, contextHolder] = message.useMessage();
  const [hxarr,setHxarr]=useState([])
  const [position,setPosition]=useState(0)
  const [imgs,setImgs]=useState([])
  const [bedroomeqs,setBedroomeqs]=useState([])
  const [publiceqs,setPubliceqs]=useState([])
  const housearr=[{ts:['近地铁','fg']},
  {ts:['ute','5rt']},
  {ts:['67yh','ewsf','fgh']},
  {ts:['q343dw','e33']},
  {ts:['f','fg'],hot:'超级优惠'},
  {ts:['hjk','6765g']}
  ]
  
  const qs=[1,2,3]

  useEffect(()=>{
    document.documentElement.scrollIntoView({
      behavior: 'smooth'
    });
    if(type==="Newhome"){
      getByid("newhome/getByid",{id:id}).then(res=>{
        setHousedata(res.data.data[0])
        setTsarr(res.data.data[0].feature.split("，"))
      })
      getHousetype('housetype/getHousetype',{houseid:id}).then(res=>{
        setHxarr(res.data.data)
      })
    }
    if(type==="Used"){
      console.log(2);
      
      usedgetByid("used/getByid",{id:id}).then(res=>{
        
        setHousedata(res.data.data[0])
        setTsarr(res.data.data[0].feature.split("，"))
      })
    }
    if(type==="Rent"){
      console.log(2);
      
     rentgetByid("rent/getByid",{id:id}).then(res=>{
        console.log(res);
        setBedroomeqs(res.data.data[0].bedroomeqs.match(/\d+/g).map(Number))
        setPubliceqs(res.data.data[0].publiceqs.match(/\d+/g).map(Number))
        setHousedata(res.data.data[0])
        setTsarr(res.data.data[0].feature.split("，"))
      })
      getrentimg('image/getrentimg',{houseid:id,type:"Rent"}).then(res=>{
        setImgs(res.data.data)
      })
    }

  },[])
  const prev=()=>{
    if(position===0){

    }else{
      setPosition(position+750)
    }
  }
  const next=()=>{
    if(position===imgs.length*-750+750){

    }else{
      setPosition(position-750)
    }

  }
  const detial=(id)=>{
    history.push(`/detail/${id}?type=${type}`)
  }
  const changecollect=()=>{
    messageApi.open({
      type: 'success',
      content: collect?'已取消':'已收藏',
    });
    setCollect(prevState => !prevState)
   
  }
  const getqs=(type,id)=>{
    switch (type){
      case 1 :
      history.push(`/Qa/${id}`)
      dispatch(HeaderState('Question'))
      break;
      case 2 :
      history.push(`/Question`)
      dispatch(HeaderState('Question'))
      break;
    }
    
  }
  return (
    <div className='detail'>
        {contextHolder}
        <div className="head">
          <span className="project">基于three.js的3D选房平台</span>
          <span className="pagetype">|  详情</span>
        </div>
        <div className="housename">{housedata.name}</div>
        <div className="content">
        {type!=='Rent'&&<Vr />}
        {type==='Rent'&& <div className="rentimg">
          <div className="left" onClick={prev}><LeftOutlined /></div>
          <div className="right" onClick={next}><RightOutlined /></div>
          <div className="imgs" style={{marginLeft:position+'px'}}>
            {imgs.map((item)=>{
                return (
                  <img className='rentroomimg' src={item.url} alt="" />
                )
              })}
          </div>

        </div>}

          <div className="details">
            <div className="tip">
              <div className="ad">
                热门好房
              </div>
              <span className="vr">支持VR</span>
              <Tooltip title={collect?'取消收藏':'收藏'} >
                <span className="collect" style={{color:collect?'orange':''}} onClick={changecollect}> <StarFilled /></span>
              </Tooltip>
            </div>
            {type!=='Rent'&&<div className="message">
              {type!=='Newhome'&&<div className="price">{housedata.price}万 <div className='per'>{housedata.per}元/㎡</div></div>}
              {type==='Newhome'&&<div className="newprice">均价：<span className="per">{housedata.averageprice} </span> /㎡</div>}
                <div className="base">
                  <span style={{fontSize:'18px'}}>{housedata.housetype}</span>
                  <div>
                    <span className='pf'>{housedata.size}㎡</span><br />
                    <span className='zx'>精装修</span>
                  </div>
                  <div>
                  {type==='Newhome'&&<span className='jf'>交房：{housedata.jf} <br /></span>}
                  {type==='Newhome'&&<span className='kp'>开盘：{housedata.kp} </span>}
                  {type==='Used'&&<span className='jg'>竣工：{housedata.jg}年</span>}
                  </div>
                  
                </div>
                <div className="ts">
                  {tsarr.map((item)=>{ return <div className="tsitem">{item}</div>   })}
                </div>
                <div className="address">地址：{housedata.address}</div>
                <div className="phone">联系电话 : {housedata.phone}</div>
            </div>}
            {type==='Rent'&&<div className="message">
              <div className="price">{housedata.price}元/月<div className='per'>{housedata.paytype}</div></div>
                <div className="base" style={{gap:'50'}}>
                    <div>
                      <span className='pf'>{housedata.housetype}</span><br />
                      <span className='zx'>{housedata.floor}</span>
                    </div>
                    <div>
                      <span className='pf'>{housedata.size}㎡</span><br />
                      <span className='zx'>精装修</span>
                    </div>
                    <div>
                      <span className='pf'>朝向：{housedata.direction}</span><br />
                      <span className='zx'>类型：{housedata.type}</span>
                    </div>
                <div>
                </div>
                </div>
                <div className="ts">
                  {tsarr.map((item)=>{ return <div className="tsitem">{item}</div>   })}
                </div>
                <div className="address">地址：{housedata.address}</div>
                <div className="phone">联系电话 : {housedata.phone}</div>
            </div>}
            <div className="map">
              假装有地图
            </div>
          </div>
          <div className="lb">
          {type!=='Newhome'&&<div className="survey">
            <div className="title">房源概况</div>
            <div className="block">
              <div className="item">
              {type==='Used'&&<div className="dot"><div className="line"></div><span>核心卖点</span></div>}
                {type==='Used'&&<div className="survey-detail">{housedata.sp}</div>}
                <div className="dot"><div className="line"></div><span>基本情况</span></div>
                <div className="survey-detail">{housedata.base}</div>
                {type==='Rent'&&<div className="dot"><div className="line"></div><span>房源设施</span></div>}
                {type==='Rent'&&<div className="survey-detail">
                  <div className="eqtitle">卧室设施</div>
                  <div className="bedroom">
                    <div className="items">
                      {bedroomeqs.map(item=>{
                        return (
                          <div className="item">
                            <img src={eqs[item]} alt="" />  
                          </div>
                          )
                      })}
                      
                    </div>
                  </div>
                  <div className="eqtitle">公共设施</div>
                  <div className="public">
                    <div className="items">
                    {publiceqs.map(item=>{
                        return (
                          <div className="item">
                            <img src={eqs2[item]} alt="" />  </div>
                          )
                      })}
                    </div>
                  </div>
                  </div>}
              </div>
            </div>
          </div>}
          {type==='Newhome'&&<div className="householdtype">
            <div className="title">楼盘户型(部分)</div>
            <div className="items">
              {
                hxarr.map((item)=>{
                  return <div className="block">
                    <img className="img" src={item.url||nodata} alt='' />
                    <div className="size">{item.type} {item.size}㎡</div>
                    <div className="floor">{item.location}</div>
                    <div className="price">{item.price}万<span className="per">{item.per}/㎡</span> </div>
                </div>
                })
              } 
            </div>
           
          </div>}

          <div className="comment">
            <div className="title">房源问答 ({100})</div>
            {qs.map(()=>{
              return <div className="qs" onClick={()=>getqs(1,1)}>
                <div className="question"><span className='icon'>问</span> ???老wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww登</div>
                <div className="answer"><span className='icon'>答</span>说的是多所多所wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww多所多所多 <span className='time'>2024-01-01</span></div>
                <div className="all">44个回答</div>
              </div>
            })}
            <div className="more"onClick={()=>getqs(2,3)}>查看更多小区问答</div>
          </div>
          </div>
          <div className="alike">
            <div className="title">相关推荐</div>
          {housearr.map((item)=>{
            return (<div className="houseitem" onClick={()=>detial(2)}>
              <img className='imgs' src={img} alt="" />
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
        </div>
    </div>
  )
}
export default Detail