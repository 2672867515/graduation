import React, { useEffect, useState } from 'react'
import Vr from '../../components/VR/index.tsx'
import { useParams } from 'react-router-dom';
import  './index.scss'
import { useDispatch,useSelector } from 'react-redux';
import { HeaderState } from '../../redux/action/index.jsx';
import img from '../../img/2t.jpg'
import { useHistory } from 'react-router-dom';
import { Tooltip,message } from 'antd';
import {
  StarFilled
} from '@ant-design/icons';
import { getByid, rentgetByid, usedgetByid } from '../../api/api.ts';
const Detail=(props)=> {
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
  console.log(header);
  const [messageApi, contextHolder] = message.useMessage();
  const housearr=[{ts:['近地铁','fg']},
  {ts:['ute','5rt']},
  {ts:['67yh','ewsf','fgh']},
  {ts:['q343dw','e33']},
  {ts:['f','fg'],hot:'超级优惠'},
  {ts:['hjk','6765g']}
  ]
  const hxarr=[1,2,3,4]

  const qs=[1,2,3]

  useEffect(()=>{
    if(type==="Newhome"){
      getByid("newhome/getByid",{id:id}).then(res=>{
        
        setHousedata(res.data.data[0])
        setTsarr(res.data.data[0].feature.split("，"))
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
        
        setHousedata(res.data.data[0])
        setTsarr(res.data.data[0].feature.split("，"))
      })
    }

  },[])
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
          <Vr />
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
                  <span>{housedata.housetype}</span>
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
                <div className="address">{housedata.address}</div>
                <div className="manager">联系电话 : {housedata.phone}</div>
            </div>}
            {type==='Rent'&&<div className="message">
              <div className="price">{100}元/月<div className='per'>押一付一</div></div>
                <div className="base">
                    <div>
                      <span className='pf'>三室两厅</span><br />
                      <span className='zx'>共1层</span>
                    </div>
                    <div>
                      <span className='pf'>{100}㎡</span><br />
                      <span className='zx'>精装修</span>
                    </div>
                    <div>
                      <span className='pf'>朝向：{'南北'}</span><br />
                      <span className='zx'>类型：别墅</span>
                    </div>
                <div>
                </div>
                </div>
                <div className="ts">
                  {tsarr.map((item)=>{ return <div className="tsitem">{item}</div>   })}
                </div>
                <div className="address">地址：{housedata.address}</div>
                <div className="manager">联系电话 : {housedata.phone}</div>
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
                {type==='Rent'&&<div className="survey-detail">111</div>}
              </div>
            </div>
          </div>}
          {type==='Newhome'&&<div className="householdtype">
            <div className="title">楼盘户型</div>
            <div className="items">
              {
                hxarr.map((item)=>{
                  return <div className="block">
                    <img className="img" src={img} alt='' />
                    <div className="size">三室一厅 120㎡</div>
                    <div className="floor">2单元-608</div>
                    <div className="price">400万<span className="per">23564 /㎡</span> </div>
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