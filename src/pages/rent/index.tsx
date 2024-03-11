import { Button, Input } from 'antd';
import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './index.scss'
import Pagesearch from '../../components/pagesearch//index.tsx'
import img from '../../img/2bo.jpg'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HeaderState } from '../../redux/action/index.jsx';
import { alikebynra, getall, getbyprice } from '../../api/api.ts';
import nodata from '../../img/nodata.jpg'
const Rent=(props)=> {
  const dispatch = useDispatch();
  let   history = useHistory()
  const { path } = useParams();
  console.log(path);
  const queryParams = new URLSearchParams(window.location.search);
  const kw = queryParams.get('kw');
  
  const type = queryParams.get('type');
  dispatch(HeaderState(type))
  const [inputValue, setInputValue] = useState('');
  const [housearr, setHousearr] = useState([]);
  useEffect(()=>{
    window.scrollTo(0, 0);
    const unlisten = history.listen(() => {
      // 监听路由变化事件
      window.location.reload(); // 刷新页面
    });
    if(path==='all'){
      getall('rent/getall').then(res=>{
        setHousearr(res.data.data.sort((a, b) => a.price - b.price))
      })
    }else if(path*1>-1){
      getbyprice('rent/getbyprice',{price:path}).then(res=>{
        setHousearr(res.data.data.sort((a, b) => a.price - b.price))
      })
    }else if(path==='to'){

      alikebynra('rent/alike',{address:kw}).then(res=>{
        setHousearr(res.data.data.sort((a, b) => a.price - b.price))
      })
    }else{
      alikebynra('rent/alike',{address:path}).then(res=>{
        setHousearr(res.data.data.sort((a, b) => a.price - b.price))
      })
    }
  },[])

  const onChange=(event)=>{
    setInputValue(event.target.value);
  }
  const search=()=>{

    alikebynra('rent/alike',{address:inputValue}).then(res=>{
      setHousearr(res.data.data.sort((a, b) => a.price - b.price))
    })
    
  }
  const detial=(item)=>{

    
    history.push(`/detail/${item.id}?type=Rent&address=${item.address}&ishot=${item.ishot}`)
    
  }
  const onCallback=(data)=>{
    setInputValue('')
    setHousearr(data.sort((a, b) => a.price - b.price))
  }
  return (
    <div className='Newhome'>
      <div className="head">
        <span className="project">基于three.js的3D选房平台</span>
        <span className="pagetype">|  租房</span>
      <Input placeholder="请输入楼盘名称、地址" className='searchinput' size={'middle'}  allowClear value={inputValue} onChange={onChange}  />
      <Button className='but' size={'middle'} type="primary"  style={{width:'100px', backgroundColor: 'rgb(35,201,147)' }} onClick={search}>
        搜索
      </Button>
      </div>
      <div className="chat">安心租好房</div>
      <div className="searchpart">
        <Pagesearch type={3} onCallback={onCallback} />
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
              {item.ishot==='true'&&<div className="hotrent">热租</div>}
              <div className="title">{item.name}</div>
              <div className="size">{item.size}m²</div>
              <div className="address">{item.address}</div>
              <div className="price">{item.price}元/月</div>
              <div className="ts">
              {item.feature.split("，").map((item)=>{
                    return <div className="tsitems">{item}</div>
                  })}
              </div>
            </div>)
          })}
         
        </div>
        <div className="renttip">
          <div className="title">
            租房小贴士
          </div> 
           <div className="hotitem">
            1、定金是您对该房源的租住的担保，从法律上同时约束租赁双方的权利义务，请您确定租住后再缴纳定金。<br /><br />
            2、未实地看房前请勿交定金，以免实地看房后对房源不满意，造成您时间和金钱上的损失。<br /><br />
            3、如您联系的是商家房源，咨询商家或线下看房时，如遇房源承诺支持月付(押一付一)，请您与商家确认是否需要必须绑定金融产品支付。<br /> <br />
            4、请您谨慎处理如遇经纪人以个人名义向您收取佣金的情形，避免不必要的经济损失。<br /> <br />
            5、您知晓并同意，如产生房屋纠纷须由您与房源业主或/和房东或/和经纪人或/和商家协商或依据各方签署的协议约定进行纠纷解决，与平台无关，平台不承担任何赔偿责任。
          </div>
 
        </div>
      </div>

    </div>
  );
}
export default Rent