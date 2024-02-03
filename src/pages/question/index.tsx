import React, { useState } from 'react';
import './index.scss'
import { useDispatch } from 'react-redux';
import { HeaderState } from '../../redux/action/index.jsx';
import { Button, Form, Input, Modal, Select, Tooltip, message } from 'antd';
import {
  QuestionOutlined,
  CommentOutlined
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
const Question=()=> {
  let   history = useHistory()
  const dispatch = useDispatch();
  dispatch(HeaderState('Question'))
  const [messageApi, contextHolder] = message.useMessage();
  const queryParams = new URLSearchParams(window.location.search);
  const qs = queryParams.get('qs')||0;
  const { TextArea } = Input;
  const { Option } = Select;
  const [inputValue, setInputValue] = useState('');
  const [about, setAbout] = useState('');
  const [loading, setLoading] = useState(false);
  const [isshow, setIsshow] = useState(true);
  const [issearch, setIssearch] = useState(false);
  const [indeal, setIndeal] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const searchpart=[
    {title:'买房',item:['房价行情','购房建议','买房风险','新房','二手房']},
    {title:'卖房',item:['房屋估价','卖房流程','出售方案','卖房风险']},
    {title:'租房',item:['租房准备','租房注意事项','合租','整租',]},
    {title:'其他',item:['装修','拆迁','房产政策','法律纠纷']}
  ]
  const [bytype,setBytype]=useState('')
  const qas=[
    {qa:'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww????',time:'2024-01-01',responsetotal:20,response:'少时诵所所所所所所所所所所所所所所所所'},
    {qa:'wwww????',time:'2024-01-01',responsetotal:20,response:'去去去去去群群群群群群群群群群群群群群群群群群群群群群群群去去去去去群群群群群群群群群群群群'},
    {qa:'wwww????',time:'2024-01-01',responsetotal:20,response:'sdsd'},
    {qa:'wwww????',time:'2024-01-01',responsetotal:20,response:'sdsd'},
    {qa:'wwww????',time:'2024-01-01',responsetotal:20,response:'sdsd'}
  ]
  const inconcluso=[
    {qa:'wwww????',time:'2024-01-01'},
    {qa:'wwww????',time:'2024-01-01'},
    {qa:'wwwwwwwwwwweeeeeewwwwwwwwwwwwwwwwwwww????',time:'2024-01-01'},
    {qa:'wwww????',time:'2024-01-01'},
    {qa:'wwww????',time:'2024-01-01'}
  ]
  const [form] = Form.useForm();
  const onChange=(event)=>{
    setInputValue(event.target.value);
  }
  const search=()=>{
    setIsshow(false)
    setIssearch(true)
    setIndeal(true)
    setAbout(inputValue)
    console.log(inputValue);
    
  }
  const getbytype=(i)=>{
    setBytype(i)
    setAbout(i)
    setIssearch(true)
  }
  const checkall=()=>{
     setIsshow(false)
     setIssearch(true)
     setIndeal(false)
     setAbout('待解决问题')
  }
  
  const ask = () => {
    setIsModalOpen(true);
  };

  const toqa=(id)=>{
    history.push(`/Qa/${id}`)
  }
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields()
  };
  const onFinish = (values: any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsModalOpen(false);
      messageApi.open({
        type: 'success',
        content: '提交成功',
      });
      form.resetFields()
    }, 1500);
    console.log('Success:', values);
   
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    
  };
  return (
    <div className="mainbody">
        {contextHolder}
        <div className="head">
            <div className="hc">
            <span className="project">基于three.js的3D选房平台</span>
            <span className="pagetype">|  小区问答</span>
            <Input placeholder="请输入问题" className='searchinput' size={'middle'}  allowClear value={inputValue} onChange={onChange}  />
            <Button className='but' size={'middle'} type="primary"  style={{width:'100px', backgroundColor: 'rgb(35,201,147)' }} onClick={()=>search()}>
                搜索
            </Button>
            </div>
        </div>
        <div className='question'>
            <Tooltip title="提问">
            <Button className='ask' onClick={ask}  shape="circle" icon={<QuestionOutlined style={{ fontSize: '30px' }} />}></Button>
            </Tooltip>
            {isshow&&<div className="searchmode">
            {searchpart.map((item)=>{
              return <div className="searchitems">
                    <div className="title">{item.title}</div>
                    <div className="searchtype">
                      {item.item.map((item)=>{
                        return <div className={item===bytype?'type typeclick':'type'} onClick={()=>getbytype(item)}>{item}</div>
                      })}
                    </div>
                  
              </div>
            })}
            </div>}
            <div className="inconcluso">
              <div className="title">待解决问题<div className="all" onClick={checkall}>查看全部</div></div>
              <div className="inbox">
                {inconcluso.map((item)=>{
                  return  <div className="initem" onClick={()=>toqa(1)}>
                    <div className="q">{item.qa}</div>
                    <div className="time">{item.time}</div>
                  </div>
                })}
               
              </div>
            </div>
            <div className="qa">
              <div className="title">
                {issearch&&<>为您找到<span>100</span>条"<span>{about}</span>"{indeal?'相关的问题':''}</>}
                {!issearch&&<>共有<span>100</span>个房产问答</>}
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
          initialValues={{select:'Demo'}}
        >
           <Form.Item 
           name="select" 
           label="问题类型"
           rules={[{ required: true, message: '请选择问题类型' }]}>
            <Select >
              <Option value="Demo">Demo</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="内容"
            name="question"
            rules={[{ required: true, message: '请描述您的问题' }]}
          >
             <TextArea rows={3} placeholder="描述问题" maxLength={6} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
export default Question