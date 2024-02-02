import React, { useState } from 'react';
import './index.scss'
import { useDispatch } from 'react-redux';
import { HeaderState } from '../../redux/action/index.jsx';
import { Button, Input, Tooltip } from 'antd';
import {
  QuestionOutlined
} from '@ant-design/icons';
const Question=()=> {
  const dispatch = useDispatch();
  dispatch(HeaderState('Question'))
  const queryParams = new URLSearchParams(window.location.search);
  const qs = queryParams.get('qs')||0;
  const house = queryParams.get('house')||0;
  console.log(qs);
  console.log(house);

  const [inputValue, setInputValue] = useState('');
  const [isshow, setIsshow] = useState(true);
  const [issearch, setIssearch] = useState(false);
  const searchpart=[
    {title:'买房',item:['房价行情','购房建议','买房风险','新房','二手房']},
    {title:'卖房',item:['房屋估价','卖房流程','出售方案','卖房风险']},
    {title:'租房',item:['租房准备','租房注意事项','合租','整租',]},
    {title:'其他',item:['装修','拆迁','房产政策','法律纠纷']}
  ]

  const onChange=(event)=>{
    setInputValue(event.target.value);
  }
  const search=()=>{
    setIsshow(false)
    console.log(inputValue);
    
  }
  const ask=()=>{
   
  }
  return (
    <div className="mainbody">
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
                        return <div className="type">{item}</div>
                      })}
                    </div>
                  
              </div>
            })}
            </div>}
            <div className="inconcluso">
              <div className="title">待解决问题</div>
            </div>
            <div className="qa">
              <div className="title">
                {issearch&&<>为您找到<span>100</span>条"<span>aasasas</span>"相关的问题</>}
                {!issearch&&<>共有<span>100</span>个房产问答</>}
              </div>
              
              0000
            </div>
        </div>
    </div>
  );
}
export default Question