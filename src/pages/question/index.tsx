import React, { useEffect, useState } from 'react';
import './index.scss'
import { useDispatch } from 'react-redux';
import { HeaderState } from '../../redux/action/index.jsx';
import { Button, Form, Input, Modal, Select, Tooltip, message } from 'antd';
import {
  QuestionOutlined,
  CommentOutlined
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { addquestion, getallhouseqa, gethouseqa, searchQa } from '../../api/api.ts';
const Question=()=> {
  let   history = useHistory()
  const dispatch = useDispatch();
  dispatch(HeaderState('Question'))
  const [messageApi, contextHolder] = message.useMessage();
  const queryParams = new URLSearchParams(window.location.search);
  const qs = queryParams.get('qs')||0;
  const houseid = queryParams.get('houseid');
  const housetype = queryParams.get('housetype');
  const name = queryParams.get('name');
  const { TextArea } = Input;
  const { Option } = Select;
  const [inputValue, setInputValue] = useState('');
  const [about, setAbout] = useState('');
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [issearch, setIssearch] = useState(false);
  const [indeal, setIndeal] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qa, setQa] = useState([]);
  const [qaall, setQaall] = useState([]);
  
  const searchpart=[
    {title:'买房',item:['房价行情','购房建议','买房风险','新房','二手房']},
    {title:'卖房',item:['房屋估价','卖房流程','出售方案','卖房风险']},
    {title:'租房',item:['租房准备','租房注意事项','合租','整租',]},
    {title:'其他',item:['装修','拆迁','房产政策','法律纠纷','其他']}
  ]
  const [bytype,setBytype]=useState('')

  const hotqa=[
    {qa:'wwww????',time:'2024-01-01'},
    {qa:'wwww????',time:'2024-01-01'},
    {qa:'wwwwwwwwwwweeeeeewwwwwwwwwwwwwwwwwwww????',time:'2024-01-01'},
    {qa:'wwww????',time:'2024-01-01'},
    {qa:'wwww????',time:'2024-01-01'}
  ]


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
    let data={houseid:houseid,housetype:housetype}
   
    if(houseid==='all'&&housetype==='all'){
      getallhouseqa('question/getallhouseqa',data).then(res=>{
        console.log(res.data.data);
        
        setQa(res.data.data.sort((a, b) =>{
          const dateA = new Date(a.time+ 'T00:00:00');
          const dateB = new Date(b.time+ 'T00:00:00');
          return dateB - dateA; // 从近到远排序
        }))
        setQaall(res.data.data)
      })
    }else{
      gethouseqa('question/gethouseqa',data).then(res=>{
        console.log(res.data.data);
        setQa(res.data.data.sort((a, b) =>{
          const dateA = new Date(a.time+ 'T00:00:00');
          const dateB = new Date(b.time+ 'T00:00:00');
          return dateB - dateA; // 从近到远排序
        }))
        setQaall(res.data.data)
      })
    }

  },[])
  
  const onChange=(event)=>{
    setInputValue(event.target.value);
  }
  const search=()=>{
    setIssearch(true)
    setIndeal(true)
    setAbout(inputValue)
    console.log(inputValue);
    console.log(bytype);
    console.log(qa);
    if(bytype===''){
      let data=qaall.filter(item=>{
       return item.content.includes(inputValue)
      })
      setQa(data.sort((a, b) =>{
        const dateA = new Date(a.time+ 'T00:00:00');
        const dateB = new Date(b.time+ 'T00:00:00');
        return dateB - dateA; // 从近到远排序
      }))
    }else{
      let data=qaall.filter(item=>{
        return item.content.includes(inputValue)
       })
       let data2=data.filter(item=>{
        return item.type===bytype
       })
       setQa(data2.sort((a, b) =>{
         const dateA = new Date(a.time+ 'T00:00:00');
         const dateB = new Date(b.time+ 'T00:00:00');
         return dateB - dateA; // 从近到远排序
       }))
    }
  }
  const getbytype=(i)=>{
    setBytype(i)
    setAbout(i)
    setIssearch(true)
    setInputValue('')
    let data=qaall.filter(item=>{
      return item.type===i
     })

     setQa(data.sort((a, b) =>{
       const dateA = new Date(a.time+ 'T00:00:00');
       const dateB = new Date(b.time+ 'T00:00:00');
       return dateB - dateA; // 从近到远排序
     }))
    
   
  }
  const checkall=()=>{
     setIssearch(true)
     setIndeal(false)
     setAbout('待解决问题')
  }
  
  const ask = () => {
    setIsModalOpen(true);
    form.resetFields()
  };

  const toqa=(id)=>{
    history.push(`/Qa?qa=${id}&name=${name}`)
  }
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
      houseid:houseid,
      userid:localStorage.getItem('userid'),
      content:houseid==='all'?'[全部]--'+values.question:'['+name+']--'+values.question,
      time:dateString,
      housetype:housetype,
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
        setIssearch(false)
        setBytype('')
        setInputValue('')
        let data={houseid:houseid,housetype:housetype}
   
        if(houseid==='all'&&housetype==='all'){
          getallhouseqa('question/getallhouseqa',data).then(res=>{
            console.log(res.data.data);
            setQaall(res.data.data)
            setQa(res.data.data.sort((a, b) =>{
              const dateA = new Date(a.time+ 'T00:00:00');
              const dateB = new Date(b.time+ 'T00:00:00');
              return dateB - dateA; // 从近到远排序
            }))
          })
        }else{
          gethouseqa('question/gethouseqa',data).then(res=>{
            console.log(res.data.data);
            setQaall(res.data.data)
            setQa(res.data.data.sort((a, b) =>{
              const dateA = new Date(a.time+ 'T00:00:00');
              const dateB = new Date(b.time+ 'T00:00:00');
              return dateB - dateA; // 从近到远排序
            }))
          })
        }
      })

    }, 1000);
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
            <div className="searchmode">
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
            </div>
            <div className="hotqa">
              <div className="title">热门问答</div>
              <div className="inbox">
                {qaall.slice(0,5).map((item)=>{
                  return  <div className="initem" onClick={()=>toqa(item.id)}>
                    <div className="q">{item.content}</div>
                    <div className="time">{item.time}</div>
                  </div>
                })}
               
              </div>
            </div>
            <div className="qa">
              <div className="name">{name}</div>
              <div className="title">
                {issearch&&<>为您找到<span>{qa.length}</span>条<span>{about}</span>{indeal?'相关的问题':''}</>}
                {!issearch&&<>共有<span>{qa.length}</span>个房产问答</>}
              </div>
              {qa.map((item)=>{
                return <div className="qaitem" onClick={()=>toqa(item.id)}>
                    <div className="q">{item.content}</div>
                    <div className="a">答：{item.answer[0]?item.answer[0].content:'暂无回答'}</div>
                    <div className="total"><CommentOutlined /> {item.answer.length}</div>
                    <div className="time">{item.time}</div>
                </div>
              })}
              
            </div>
        </div>
        <Modal 
        title="提问" 
        confirmLoading={loading} 
        open={isModalOpen} 
        onCancel={handleCancel}
        footer={[
          // 注意这里使用的是 Form 组件的 submit 方法
          <Button  onClick={() => handleCancel()}>
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
  );
}
export default Question