import React, { useEffect, useState } from 'react';
import './index.scss'
import { useDispatch } from 'react-redux';
import { HeaderState } from '../../redux/action/index.jsx';
import { Button, Form, Input, Menu, Row, type MenuProps, Col, Modal,message, Statistic, Upload } from 'antd';
import { QuestionCircleOutlined, UserOutlined, BulbOutlined,StarOutlined,CommentOutlined,UploadOutlined } from '@ant-design/icons';
import img from '../../img/2t.jpg'
import { useHistory } from 'react-router-dom';
import type { UploadProps } from 'antd';
import {updateHead,getuser} from '../../api/api.ts'

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
  getItem('我回答过', '3',<BulbOutlined />),
  getItem('我的收藏', '4',<StarOutlined />),
];


const Personal=()=> {
  const dispatch = useDispatch();
  let   history = useHistory()
  dispatch(HeaderState('Personal'))
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [key,setKey]=useState('1')
  const [edit,setEdit]=useState(false)
  const [messages,setMessages]=useState({username:'',phonenumber:''} )
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const housearr=[{ts:['近地铁','fg']},
  {ts:['ute','5rt']},
  {ts:['67yh','ewsf','fgh']},
  {ts:['q343dw','e33']},
  {ts:['f','fg'],hot:'超级优惠'},
  {ts:['hjk','6765g']}
  ]
  const qas=[
    {qa:'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww????',time:'2024-01-01',responsetotal:20,response:'少时诵所所所所所所所所所所所所所所所所'},
    {qa:'wwww????',time:'2024-01-01',responsetotal:20,response:'去去去去去群群群群群群群群群群群群群群群群群群群群群群群群去去去去去群群群群群群群群群群群群'},
    {qa:'wwww????',time:'2024-01-01',responsetotal:20,response:'sdsd'},
    {qa:'wwww????',time:'2024-01-01',responsetotal:20,response:'sdsd'},
    {qa:'wwww????',time:'2024-01-01',responsetotal:20,response:'sdsd'}
  ]
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
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 上传成功`);
      let data={id:1,head:info.file.response}
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
  getuser('/user/getuser',{id:1}).then(res=>{
    setImgs(res.data.data.head)
    console.log(res.data.data.username);
    form.setFieldsValue(res.data.data);
  })
},[])
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setKey(e.key)
    console.log(key);
  };
  const onFinish = (values: any) => {
    console.log('Success:', values);
    setEdit(false)
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
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsModalOpen(false);
      messageApi.open({
        type: 'success',
        content: '修改成功',
      });
    }, 1000);
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
  const detial=(id)=>{
    history.push(`/detail/${id}?type=Newhome`)
  }
  const toqa=(id)=>{
    history.push(`/Qa/${id}`)
  }

  const cancelcollect=(id,e)=>{
    e.stopPropagation();
    console.log(id);
    
    messageApi.open({
      type: 'success',
      content: '取消成功',
    });
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
              <Col span={8} offset={1} style={{marginTop:'30px'}}>
                <Form.Item
                  label="用户名"
                  name="username"
                  rules={[{ required: true, message: '请输入用户名!' }]}
                >
                  <Input disabled={!edit}/>
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
                <Statistic title={<span style={{color:'rgb(29, 182, 131)',fontWeight:'bold'}}>收藏数</span>} value={112893} />
              </Col>
              <Col span={8}>
                <Statistic title={<span style={{color:'rgb(29, 182, 131)',fontWeight:'bold'}}>提问数</span>} value={112893} />
              </Col>
              <Col span={8}>
                <Statistic title={<span style={{color:'rgb(29, 182, 131)',fontWeight:'bold'}}>回答数</span>} value={112893} />
              </Col>
            </Row>
            </div>
            <div className="suggess">
              <div className="title">好房推荐</div>
              <div className="alike">
              {housearr.map((item)=>{
                return (<div className="houseitem" onClick={()=>detial(2)}>
                  <img className='imgs' src={img} alt="" />
                  <div className="title">汤臣一品</div>
                  <div className="size">100</div>
                  <div className="address">10dss0</div>
                  <div className="newprice">均价：<span className="per">23564</span>/㎡</div>
                  <div className="ts">
                      {item.ts.map((item)=>{
                        return <div className="tsitems">{item}</div>
                      })}
                  </div>
                </div>)
              })}
              </div>
            </div>
          </div>}
          {key==='2'&&<div className="myquestion">
          <div className="qa">
              <div className="title">
                <>共提出<span>100</span>个房产问题</>
              </div>
              {qas.map((item)=>{
                return <div className="qaitem" onClick={()=>toqa(1)}>
                    <div className="q">{item.qa}</div>
                    <div className="a">答：{item.response}</div>
                    <div className="total"><CommentOutlined /> {item.responsetotal}</div>
                    <div className="time">{item.time}</div>
                </div>
              })}
              
            </div>
          </div>}
          {key==='3'&&<div className="myanswer">
          <div className="qa">
              <div className="title">
                <>共回答过<span>100</span>个房产问题</>
              </div>
              {qas.map((item)=>{
                return <div className="qaitem" onClick={()=>toqa(1)}>
                    <div className="q">{item.qa}</div>
                    <div className="a">答：{item.response}</div>
                    <div className="total"><CommentOutlined /> {item.responsetotal}</div>
                    <div className="time">{item.time}</div>
                </div>
              })}
              
            </div>
          </div>}
          {key==='4'&&<div className="mycollect">
          <div className="collect">
              {housearr.map((item)=>{
                return (<div className="houseitem" onClick={()=>detial(2)}>
                  <img className='imgs' src={img} alt="" />
                  <div className="rightpart">
                    <div className="title">汤臣wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww一品</div>
                    <div className="size">10wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww0</div>
                    <div className="address">10dsswwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww0</div>
                    <div className="newprice">均价：<span className="per">23564</span>/㎡</div>
                    <div className="cancel" onClick={(e)=>cancelcollect(1,e)}>取消收藏</div>
                  
                    <div className="ts">
                        {item.ts.map((item)=>{
                          return <div className="tsitems">{item}</div>
                        })}
                    </div>
                  </div>
                </div>)
              })}
              </div>
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
            name="password"
            rules={[{ required: true, message: '请输入原密码' }]}
          >
             <Input  placeholder="请输入原密码" />
          </Form.Item>
          <Form.Item
            label="新密码"
            name="password2"
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