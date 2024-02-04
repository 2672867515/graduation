import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HeaderState } from '../../redux/action/index.jsx';
import './index.scss'
import img from '../../img/head.jpg'
import { Input, Modal, message } from 'antd';
import { useHistory } from 'react-router-dom';
const Qa=()=> {
  const dispatch = useDispatch();
  dispatch(HeaderState('Question'))
  let   history = useHistory()
  const { id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const alike=[
    {qa:'wwww????',time:'2024-01-01'},
    {qa:'wwww????',time:'2024-01-01'},
    {qa:'wwwwwwwwwwweeeeeewwwwwwwwwwwwwwwwwwww????',time:'2024-01-01'},
    {qa:'wwww????',time:'2024-01-01'},
    {qa:'wwww????',time:'2024-01-01'}
  ]
  const answers=[
    {name:'张大炮',answer:'wwww????',time:'2024-01-01'},
    {name:'张大炮',answer:'wwww????',time:'2024-01-01'},
    {name:'张大炮',answer:'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwweewwwwwwwwwwwwwwwwwwww????',time:'2024-01-01'},
    {name:'张大炮',answer:'wwww????',time:'2024-01-01'},
    {name:'张大炮',answer:'wwww????',time:'2024-01-01'}
  ]
  const { TextArea } = Input;
  const toqa=(id)=>{
    history.push(`/Qa/${id}`)
  }
  const showModal = () => {
    setIsModalOpen(true);
    setInput('')
  };
  const handleTextAreaChange=(e)=>{
    setInput(e.target.value)
  }
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsModalOpen(false);
      console.log(input);
      
      messageApi.open({
        type: 'success',
        content: '回答完成',
      });
      
    }, 1500);
    console.log('Success:');
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='qa'>
       {contextHolder}
        <div className="head">
            <div className="hc">
              <span className="project">基于three.js的3D选房平台</span>
              <span className="pagetype">|  小区问答</span>
            </div>
        </div>
        <div className="qacontent">
          <div className="q">
            <div className="question">ewwwewewewe都是对的所群wwwwwwwwwwwwe</div>
            <div className="bot">
              <div className="auth">嗷嗷嗷</div>
              <div className="qtime">2024-01-01</div>
            </div>

          </div>
          <div className="a">
            <div className="title"><span className='all'>全部4个回答</span> <div className="ican" onClick={showModal}>我来回答</div></div>
            <div className="answers">
              {answers.map((item)=>{
                  return <div className="answeritem">
                    <img className="headimg" src={img} alt='' />
                    <div className="itemr">
                      <div className="name">{item.name}</div>
                      <div className="answer">{item.answer}</div>
                      <div className="time">{item.time}</div>
                    </div>
                
                  </div>
              })}
            </div>
          </div>
          <div className="alike">
                <div className="title">相关问题</div>
                <div className="inbox">
                  {alike.map((item)=>{
                    return  <div className="initem" onClick={()=>toqa(2)}>
                      <div className="alikeqa">{item.qa}</div>
                      <div className="time">{item.time}</div>
                    </div>
                  })}
                </div>
          </div>
        </div>
        <Modal 
        title="回答" 
        okText='提交' 
        cancelText='取消' 
        confirmLoading={loading} 
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel}
        >
          <div style={{minHeight:'30px'}}>问题</div>
        <TextArea rows={3} placeholder="回答问题" maxLength={6}  value={input} onChange={handleTextAreaChange} />
      </Modal>
    </div>
  );
}
export default Qa