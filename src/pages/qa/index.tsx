import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HeaderState } from '../../redux/action/index.jsx';
import './index.scss'
import img from '../../img/head.jpg'
import { Input, Modal, message } from 'antd';
import { useHistory } from 'react-router-dom';
import { addanswer, gethouseqabyid, getuser } from '../../api/api.ts';
const Qa=()=> {
  const dispatch = useDispatch();
  dispatch(HeaderState('Question'))
  let   history = useHistory()
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get('qa');
  const [messageApi, contextHolder] = message.useMessage();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [qa, setQa] = useState({});
  const [answers, setAnswers] = useState([]);
  const alike=[
    {qa:'wwww????',time:'2024-01-01'},
    {qa:'wwww????',time:'2024-01-01'},
    {qa:'wwwwwwwwwwweeeeeewwwwwwwwwwwwwwwwwwww????',time:'2024-01-01'},
    {qa:'wwww????',time:'2024-01-01'},
    {qa:'wwww????',time:'2024-01-01'}
  ]
  const { TextArea } = Input;

  useEffect(() => {
    const unlisten = history.listen(() => {
      // 监听路由变化事件
      window.location.reload(); // 刷新页面
    });

    return () => {
      unlisten(); // 在组件卸载时取消监听
    };
  }, [history]);
  useEffect(()=>{
    window.scrollTo(0, 0);
    gethouseqabyid('question/gethouseqabyid',{id:id}).then(res=>{
        console.log(res.data.data);
        res.data.data.answer?.sort((a, b) =>{
          const dateA = new Date(a.time+ 'T00:00:00');
          const dateB = new Date(b.time+ 'T00:00:00');
          return dateB - dateA; // 从近到远排序
        })
        setQa(res.data.data)
        setAnswers(res.data.data.answer)
        getuser('user/getuser',{id:res.data.data.userid}).then(res=>{
          setUsername(res.data.data.username)
          
        })
    })
  },[])

  const toqa=(id)=>{
    history.push(`/Qa?qa=${id}`)
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
    const now = new Date();
    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2); // 月份从0开始，需要加1，并且保证两位数
    const day = ('0' + now.getDate()).slice(-2); // 保证两位数
    const dateString = `${year}-${month}-${day}`;
    const data={
      questionid:id,
      userid:localStorage.getItem('userid'),
      content:input,
      time:dateString,
  }
    setTimeout(() => {
      addanswer('answer/addanswer',data).then(res=>{
        setLoading(false);
        setIsModalOpen(false);
        console.log(input);
        messageApi.open({
          type: 'success',
          content: '回答成功',
        });
        gethouseqabyid('question/gethouseqabyid',{id:id}).then(res=>{
          console.log(res.data.data);
          res.data.data.answer?.sort((a, b) =>{
            const dateA = new Date(a.time+ 'T00:00:00');
            const dateB = new Date(b.time+ 'T00:00:00');
            return dateB - dateA; // 从近到远排序
          })
          setQa(res.data.data)
          setAnswers(res.data.data.answer)
          getuser('user/getuser',{id:res.data.data.userid}).then(res=>{
            setUsername(res.data.data.username)
          })
      })
      })
      
      
    }, 1000);
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
            <div className="question">{qa.content}</div>
            <div className="bot">
              <div className="auth">{username}</div>
              <div className="qtime">{qa.time}</div>
            </div>

          </div>
          <div className="a">
            <div className="title"><span className='all'>全部{answers.length}个回答</span> <div className="ican" onClick={showModal}>我来回答</div></div>
            <div className="answers">
              {answers.map((item)=>{
                  return <div className="answeritem">
                    <img className="headimg" src={item.user.head} alt='' />
                    <div className="itemr">
                      <div className="name">{item.user.username}</div>
                      <div className="answer">{item.content}</div>
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
          <div style={{minHeight:'30px'}}>问题：{qa.content}</div>
        <TextArea rows={3} placeholder="回答问题"  value={input} onChange={handleTextAreaChange} />
      </Modal>
    </div>
  );
}
export default Qa