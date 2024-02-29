import React, { useEffect, useState } from 'react';
import './index.scss'
import { useDispatch } from 'react-redux';
import { HeaderState } from '../../redux/action/index.jsx';
import { Button, Form, Input, Menu, Row, type MenuProps, Col, Modal,message, Statistic, Upload, Tag, Tabs } from 'antd';
import { QuestionCircleOutlined, UserOutlined, UndoOutlined,StarOutlined,CommentOutlined,UploadOutlined } from '@ant-design/icons';
import nodata from '../../img/nodata.jpg'
import { useHistory } from 'react-router-dom';
import type { UploadProps } from 'antd';
import {updateHead,getuser, editphone, editpw, getquestionbyuser, getanswerbyuser, newhomegetHot, getcollect, getByid, decollect, getcollectnum} from '../../api/api.ts'
import TabPane from 'antd/es/tabs/TabPane';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps['items'] = [
  getItem('个人信息', '1',<UserOutlined />),
  getItem('我的提问', '2',<QuestionCircleOutlined />),
  getItem('我的收藏', '3',<StarOutlined />),
];


const Personal=()=> {
  const dispatch = useDispatch();
  let   history = useHistory()
  dispatch(HeaderState('Personal'))
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [key,setKey]=useState('1')
  const [edit,setEdit]=useState(false)
  const [messages,setMessages]=useState({phonenumber:''} )
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [qas,setQas]=useState([])
  const [ans,setAns]=useState([])
  const [collectnum,setCollectNum]=useState([])
  const [hotnewhome,setHotnewhome]=useState([])
  const [newhome,setNewhome]=useState([])
  const [activeKey,setActiveKey]=useState("1")
  const [newhouse,setNewhouse]=useState([])
  const [used,setUsed]=useState([])
  const [rent,setRent]=useState([])

  const [imgs,setImgs]=useState('')

  const file: UploadProps = {
  name: 'file',
  action: 'http://127.0.0.1:8081/upload',
  showUploadList:false,
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 上传成功`);
      let data={id:localStorage.getItem('userid'),head:info.file.response}
      updateHead('/user/updateHead',data).then(res=>{
        console.log(res);
        setImgs(res.data.data.head)
      })
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败`);
    }
  },
};
useEffect(()=>{
  getuser('/user/getuser',{id:localStorage.getItem('userid')}).then(res=>{
    setImgs(res.data.data.head)
    form.setFieldsValue(res.data.data);
  })
  getcollectnum('collect/getcollectnum',{userid:localStorage.getItem('userid')}).then(res=>{
    setCollectNum(res.data.data)
  })
  getquestionbyuser('question/getquestionbyuser',{id:localStorage.getItem('userid')}).then(res=>{
    setQas(res.data.data)
  })
  getanswerbyuser('answer/getanswerbyuser',{userid:localStorage.getItem('userid')}).then(res=>{
    setAns(res.data.data)
  })
  newhomegetHot('newhome/getall').then(res=>{
    // 新数组，用于存放随机取出的四个值
    recommend(res.data.data)
    setNewhome(res.data.data)
  })
  newcollect()
  usedcollect()
  rentcollect()
},[])
const newcollect=()=>{
  getcollect('collect/getcollectbyid',{userid:localStorage.getItem('userid'),type:"Newhome"}).then(res=>{
    let data=[]
    console.log(res.data.data);
    
    res.data.data.forEach(async item=>{
     await getByid('newhome/getByid',{id:item.houseid}).then(res=>{
        data.push(res.data.data[0])
        console.log(data);
        setNewhouse(data)
      })

    })

  })
}
const usedcollect=()=>{
  getcollect('collect/getcollectbyid',{userid:localStorage.getItem('userid'),type:"Used"}).then(res=>{
    let data=[]
    
    res.data.data.map(item=>{
      getByid('used/getByid',{id:item.houseid}).then(res=>{
        
        data.push(res.data.data[0])
        setUsed(data)
      })
    })

  })
}
const rentcollect=()=>{
  getcollect('collect/getcollectbyid',{userid:localStorage.getItem('userid'),type:"Rent"}).then(res=>{
    let data=[]
    
    res.data.data.map(item=>{
      getByid('rent/getByid',{id:item.houseid}).then(res=>{
        
        data.push(res.data.data[0])
        setRent(data)
      })
    })

  })
}

  const recommend=(data)=>{
    let alldata=[...data]
    const newArray = [];
    // 循环取出四个随机值
    for (let i = 0; i < 4; i++) {
      // 生成一个介于 0 到数组长度减 1 的随机索引值
      const randomIndex = Math.floor(Math.random() * alldata.length);
      // 从原始数组中取出对应索引的值，并将其添加到新数组中
      newArray.push(alldata[randomIndex]);
      // 从原始数组中移除已经取出的值
      alldata.splice(randomIndex, 1);
    }
    setHotnewhome(newArray.sort((a, b) => a.averageprice - b.averageprice))
  }

  const change=()=>{
    const alldata=[...newhome]
    const newArray = [];
    // 循环取出四个随机值
    for (let i = 0; i < 4; i++) {
      // 生成一个介于 0 到数组长度减 1 的随机索引值
      const randomIndex = Math.floor(Math.random() * alldata.length);
      // 从原始数组中取出对应索引的值，并将其添加到新数组中
      newArray.push(alldata[randomIndex]);
      // 从原始数组中移除已经取出的值
      alldata.splice(randomIndex, 1);
    }
    setHotnewhome(newArray.sort((a, b) => a.averageprice - b.averageprice))
  }

  const onClick: MenuProps['onClick'] = (e) => {
    setKey(e.key)
  };
  const onFinish = (values: any) => {
    console.log('Success:', values);
    editphone('user/editphone',values).then(res=>{
      setEdit(false)
      message.success('编辑成功')
    })
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('meaasgeFailed:', errorInfo);
  };
  const doedit=()=>{
    setEdit(true)
  }
  const docancle=()=>{
    setEdit(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish2 = (values: any) => {
    console.log(values);
    let data={...values,id:localStorage.getItem('userid')}
    setLoading(true);
    setTimeout(() => {
      editpw('user/editpw',data).then(res=>{
        if(res.data.code===-1){
          setLoading(false);
          message.error('原密码错误')
        }else{
          setLoading(false);
          setIsModalOpen(false);
          message.success('密码修改成功')
        }

      })
     
    }, 500);
    console.log('Success:', values);
   
  };
  
  const onFinishFailed2 = (errorInfo: any) => {
    console.log('passwordFailed:', errorInfo);
    if(errorInfo.value.password&&errorInfo.value.password2){
      messageApi.open({
        type: 'error',
        content: '修改失败',
      });
    }
   
  };
  const editpassword=()=>{
    setIsModalOpen(true);
    form2.resetFields()
  }
  const detial=(item,type)=>{
    history.push(`/detail/${item.id}?type=${type}&address=${item.address}`)
  }
  const toqa=(item)=>{
    const regex = /\[(.*?)\]/; // 使用非贪婪模式匹配方括号内的内容
    const match = item.content.match(regex); // 匹配字符串中的方括号内容
    history.push(`/Qa?qa=${item.id}&name=${match[1]||'未知楼盘'}`)
  }

  const cancelcollect=(item,type,e)=>{
    e.stopPropagation();
    
    decollect('collect/decollect2',{houseid:item.id,userid:localStorage.getItem('userid'),type:type}).then(res=>{
      messageApi.open({
        type: 'success',
        content: '取消成功',
      })
      if(type==='Newhome'){
        newcollect()
        if(newhouse.length===1){
          setNewhouse([])
        }
      }
      if(type==='Used'){
 
        usedcollect()
        if(used.length===1){
          setUsed([])
        }
      }
      if(type==='Rent'){
        rentcollect()
   
        if(rent.length===1){
          setRent([])
        }
      }
    })
    

  }
  const tabshandleChange = (key) => {
    setActiveKey(key);
  }
  return (
    <div className='personal'>
      {contextHolder}
      <div className="head">
            <div className="hc">
              <span className="project">基于three.js的3D选房平台</span>
              <span className="pagetype">|  个人中心</span>
            </div>
      </div>
      <div className="pcontent">
        <div className="menu">
          <Menu
            onClick={onClick}
            defaultSelectedKeys={['1']}
            inlineCollapsed={true}
            mode="inline"
            items={items}
          />
        </div>
        <div className="realcontnet">
          {key==='1'&&<div className="personalmessage">
        
            <div className="message">
            <Form
              form={form}
              name="message"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              initialValues={messages}
            >
            <Row gutter={20}>
              <Col span={2}>
                <img src={imgs} alt="" className='headimg'/>
                <Upload {...file}>
                  <Button size='small' icon={<UploadOutlined />}>上传头像</Button>
                </Upload>
              </Col>
              <Col span={3} offset={1} style={{marginTop:'30px'}}>
                <Form.Item
                  label="用户名"
                  name="username"
                  rules={[{ required: true, message: '请输入用户名!' }]}
                >
                  <Tag color='green'>{form.getFieldValue('username')}</Tag>
                </Form.Item>
              </Col>
              <Col span={8} style={{marginTop:'30px'}}>
                <Form.Item
                  label="手机号"
                  name="phonenumber"
                  rules={[{ required: true, message: '请输入手机号' }]}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </Col>
              {!edit&&<Col span={2} style={{marginTop:'30px'}}>
                  <Button  style={{color:'rgb(82,196,26)',borderColor:'rgb(82,196,26)'}} onClick={doedit}>
                    编辑
                  </Button>
              </Col>}
              {edit&&<Col span={2} style={{marginTop:'30px'}}>
                  <Button type="primary" htmlType="submit">
                    确定
                  </Button>
              </Col> }
              {edit&&<Col span={2} onClick={docancle} style={{marginTop:'30px'}}>
                  <Button >
                    取消
                  </Button>
              </Col> }
             
              {!edit&&<Col span={2} style={{marginTop:'30px'}}>
                  <Button onClick={editpassword}>
                    修改密码
                  </Button>
              </Col>}
            </Row>
            </Form>
            </div>
            <div className="statistic">
            <Row gutter={16}>
              <Col span={8}>
                <Statistic title={<span style={{color:'rgb(29, 182, 131)',fontWeight:'bold'}}>收藏数</span>} value={collectnum.length} />
              </Col>
              <Col span={8}>
                <Statistic title={<span style={{color:'rgb(29, 182, 131)',fontWeight:'bold'}}>提问数</span>} value={qas.length} />
              </Col>
              <Col span={8}>
                <Statistic title={<span style={{color:'rgb(29, 182, 131)',fontWeight:'bold'}}>回答数</span>} value={ans.length} />
              </Col>
            </Row>
            </div>
            <div className="suggess">
              <div className="title">新房推荐<span className='changes' onClick={change}><UndoOutlined />换一批</span></div>
              <div className="alike">

              {hotnewhome.map((item)=>{
                return (<div className="houseitem" onClick={()=>detial(item,'Newhome')}>
                  <img className='imgs' src={item.cover} alt="" />
                  <div className="right">
                    <div className="title">{item.name}</div>
                    <div className="size">{item.size}㎡</div>
                    <div className="address">{item.address}</div>
                    <div className="newprice">均价：<span className="per">{item.averageprice}</span>/㎡</div>
                    <div className="ts">
                        {item.feature.split("，").map((item)=>{
                          return <div className="tsitems">{item}</div>
                        })}
                    </div>
                  </div>
                </div>)
              })}
              </div>
            </div>
          </div>}
          {key==='2'&&<div className="myquestion">
          <div className="qa">
              <div className="title">
                <>共提出<span>{qas.length}</span>个房产问题</>
              </div>
              {qas.map((item)=>{
                return <div className="qaitem" onClick={()=>toqa(item)}>
                    <div className="q">{item.content}</div>
                    <div className="a">答：{item.answer[0]?item.answer[0].content:'暂无回答'}</div>
                    <div className="total"><CommentOutlined /> {item.answer.length}</div>
                    <div className="time">{item.time}</div>
                </div>
              })}
              
            </div>
          </div>}
          {key==='3'&&<div className="mycollect">
          <Tabs defaultActiveKey="1" activeKey={activeKey} onChange={tabshandleChange}>
          <TabPane tab="新房" key="1">
          <div className="collect">
          {newhouse.length===0&&<img className='nodataimg' src={nodata} alt="" />}
              {newhouse.sort((a, b) => a.averageprice - b.averageprice).map((item)=>{
                return (<div className="houseitem" onClick={()=>detial(item,'Newhome')}>
                  <img className='imgs' src={item.cover?item.cover:nodata} alt="" />
                  <div className="rightpart">
                    <div className="title">{item.name}</div>
                    <div className="size">{item.size}㎡</div>
                    <div className="address">{item.address}</div>
                    <div className="newprice">均价：<span className="per">{item.averageprice}</span>/㎡</div>
                    <div className="cancel" onClick={(e)=>cancelcollect(item,'Newhome',e)}>取消收藏</div>
                  
                    <div className="ts">
                        {item.feature.split("，").map((item)=>{
                          return <div className="tsitems">{item}</div>
                        })}
                    </div>
                  </div>
                </div>)
              })}
          </div>
          </TabPane>
          <TabPane tab="二手房" key="2">

          <div className="collect">
          {used.length===0&&<img className='nodataimg' src={nodata} alt="" />}
              {used.sort((a, b) => a.price - b.price).map((item)=>{
                return (<div className="houseitem" onClick={()=>detial(item,'Used')}>
                  <img className='imgs' src={item.cover?item.cover:nodata} alt="" />
                  <div className="rightpart">
                    <div className="title">{item.name}</div>
                    <div className="size">{item.size}㎡</div>
                    <div className="address">{item.address}</div>
                    <div className="newprice">总价：<span className="per">{item.price}w</span> 均价：<span className="per">{item.per}</span>/㎡</div>
                    <div className="cancel" onClick={(e)=>cancelcollect(item,'Used',e)}>取消收藏</div>

                    <div className="ts">
                        {item.feature.split("，").map((item)=>{
                          return <div className="tsitems">{item}</div>
                        })}
                    </div>
                  </div>
                </div>)
              })}
          </div>
          
          </TabPane>
          <TabPane tab="租房" key="3">
          <div className="collect">
          {rent.length===0&&<img className='nodataimg' src={nodata} alt="" />}
              {rent.sort((a, b) => a.price - b.price).map((item)=>{
                return (<div className="houseitem" onClick={()=>detial(item,'Rent')}>
                  <img className='imgs' src={item.cover?item.cover:nodata} alt="" />
                  <div className="rightpart">
                    <div className="title">{item.name}</div>
                    <div className="size">{item.size}㎡</div>
                    <div className="address">{item.address}</div>
                    <div className="newprice"><span className="per">{item.price}</span>/月</div>
                    <div className="cancel" onClick={(e)=>cancelcollect(item,'Rent',e)}>取消收藏</div>
                  
                    <div className="ts">
                        {item.feature.split("，").map((item)=>{
                          return <div className="tsitems">{item}</div>
                        })}
                    </div>
                  </div>
                </div>)
              })}
          </div>
          </TabPane>
        </Tabs>
        
          </div>}
        </div>
      </div>
      <Modal 
        title="修改密码" 
        confirmLoading={loading} 
        open={isModalOpen} 
        footer={[
          // 注意这里使用的是 Form 组件的 submit 方法
          <Button  onClick={() => handleCancel()}>
            取消
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={() => form2.submit()}>
            提交
          </Button>
        ]}
        >
        <Form
          form={form2}
          name="basic"
          labelCol={{span:4}}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 500 }}
          onFinish={onFinish2}
          onFinishFailed={onFinishFailed2}
        >
          
          <Form.Item
            label="原密码"
            name="opassword"
            rules={[{ required: true, message: '请输入原密码' }]}
          >
             <Input  placeholder="请输入原密码" />
          </Form.Item>
          <Form.Item
            label="新密码"
            name="password"
            rules={[{ required: true, message: '请输入新密码' }]}
          >
             <Input  placeholder="请输入新密码" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
export default Personal