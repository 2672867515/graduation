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
import { Button, Form, Modal, Select, Tooltip,message,Input,Image } from 'antd';
import {
  StarFilled,LeftOutlined,RightOutlined
} from '@ant-design/icons';
import { addquestion, getByid, getHousetype, gethouseqa, getrentimg, rentgetByid, usedgetByid } from '../../api/api.ts';
const Detail=(props)=> {
  const { TextArea } = Input;
  const { Option } = Select;
  const eqs=[ds,kt,yg,c,wsj,znms,yt,nq]
  const eqs2=[bx,xyj,rsq,kd,sf,yyj,rqz,kzf]
  const [collect,setCollect]=useState(true)
  let   history = useHistory()
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);
  const queryParams = new URLSearchParams(window.location.search);
  const type = queryParams.get('type');
  console.log(type);

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
  const [qa,setQa]=useState([])
  const [qal,setQal]=useState(0)
  const [qwa,setQwa]=useState([])
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const housearr=[{ts:['近地铁','fg']},
  {ts:['ute','5rt']},
  {ts:['67yh','ewsf','fgh']},
  {ts:['q343dw','e33']},
  {ts:['f','fg'],hot:'超级优惠'},
  {ts:['hjk','6765g']}
  ]

  useEffect(()=>{
    document.documentElement.scrollIntoView({
      behavior: 'smooth'
    });
    let data={houseid:id,housetype:type}
    gethouseqa('question/gethouseqa',data).then(res=>{
      console.log(res.data.data);
      setQal(res.data.data.length)
        setQa( res.data.data.sort((a, b) =>{
          const dateA = new Date(a.time+ 'T00:00:00');
          const dateB = new Date(b.time+ 'T00:00:00');
          return dateB - dateA; // 从近到远排序
        }).slice(0,3))
    })
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
  const getqs=(qatype,qaid)=>{
    switch (qatype){
      case 1 :
      history.push(`/Qa?qa=${qaid}&name=${housedata.name}`)
      dispatch(HeaderState('Question'))
      break;
      case 2 :
      history.push(`/Question?houseid=${id}&housetype=${type}&name=${housedata.name}`)
      dispatch(HeaderState('Question'))
      break;
    }
    
  }
    
  const ask = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields()
  };
  const onFinish = (values: any) => {
    setLoading(true);
    const now = new Date();
    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2); // 月份从0开始，需要加1，并且保证两位数
    const day = ('0' + now.getDate()).slice(-2); // 保证两位数
    const dateString = `${year}-${month}-${day}`;
    const data={
      houseid:id,
      userid:localStorage.getItem('userid'),
      content:'['+housedata.name+']--'+values.question,
      time:dateString,
      housetype:type,
      type:values.select
  }
 
    setTimeout(() => {
      addquestion('question/addquestion',data).then(res=>{
        console.log(res.data);
        setLoading(false);
        setIsModalOpen(false);
        messageApi.open({
          type: 'success',
          content: '提交成功',
        });
        let data={houseid:id,housetype:type}
        gethouseqa('question/gethouseqa',data).then(res=>{
          console.log(res.data.data);
          setQal(res.data.data.length)
            setQa( res.data.data.sort((a, b) =>{
              const dateA = new Date(a.time+ 'T00:00:00');
              const dateB = new Date(b.time+ 'T00:00:00');
              return dateB - dateA; // 从近到远排序
            }))
        })
      })

    }, 1000);
    console.log('Success:', values);
   
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    
  };
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
                    <Image height={200} src={item.url||nodata} />
                    <div className="size">{item.type} {item.size}㎡</div>
                    <div className="floor">{item.location}</div>
                    <div className="price">{item.price}万<span className="per">{item.per}/㎡</span> </div>
                </div>
                })
              } 
            </div>
           
          </div>}

          <div className="comment">
            <div className="title">房源问答 ({qal})</div>
            {qa.map((item)=>{
              return <div className="qs" onClick={()=>getqs(1,item.id)}>
                <div className="question"><span className='icon'>问</span>{item.content}</div>
                <div className="answer"><span className='icon'>答</span>{item.answer[0]?item.answer[0].content:'暂无回答'} <span className='time'>{item.time}</span></div>
                <div className="all">{item.answer.length}个回答</div>
              </div>
            })}
            {qa.length!==0&&<div className="more"onClick={()=>getqs(2,null)}>查看更多房源问答</div>}
            {qa.length===0&&<div className="more"onClick={()=>ask()}>我要提问</div>}
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
        <Modal 
        title="提问" 
        okText='提交' 
        cancelText='取消' 
        confirmLoading={loading} 
        open={isModalOpen} 
        footer={[
          // 注意这里使用的是 Form 组件的 submit 方法
          <Button key="submit" onClick={() => handleCancel()}>
            取消
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={() => form.submit()}>
            提交
          </Button>
        ]}
        >
        <Form
          form={form}
          name="basic"
          labelCol={{span:4}}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 500 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{select:'房价行情'}}
        >
           <Form.Item 
           name="select" 
           label="问题类型"
           rules={[{ required: true, message: '请选择问题类型' }]}>
            <Select >
              <Option value="房价行情">房价行情</Option>
              <Option value="购房建议">购房建议</Option>
              <Option value="买房风险">买房风险</Option>
              <Option value="新房">新房</Option>
              <Option value="二手房">二手房</Option>
              <Option value="房屋估价">房屋估价</Option>
              <Option value="卖房流程">卖房流程</Option>
              <Option value="出售方案">出售方案</Option>
              <Option value="卖房风险">卖房风险</Option>
              <Option value="租房准备">租房准备</Option>
              <Option value="租房注意事项">租房注意事项</Option>
              <Option value="合租">合租</Option>
              <Option value="整租">整租</Option>
              <Option value="装修">装修</Option>
              <Option value="拆迁">拆迁</Option>
              <Option value="房产政策">房产政策</Option>
              <Option value="法律纠纷">法律纠纷</Option>
              <Option value="其他">其他</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="内容"
            name="question"
            rules={[{ required: true, message: '请描述您的问题' }]}
          >
             <TextArea rows={3} placeholder="描述问题" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
export default Detail